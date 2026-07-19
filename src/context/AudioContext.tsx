'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { SOUND_MAP, SoundGroup, SoundId } from '@/lib/audio/audioConfig'

const AUDIO_STORAGE_KEY = 'audio-preferences'

type AudioPreferences = {
  soundEnabled: boolean
  masterVolume: number
  muted: boolean
}

export type PlaySoundOptions = {
  volume?: number
  rate?: number
}

type AudioContextValue = AudioPreferences & {
  play: (id: SoundId, options?: PlaySoundOptions) => void
  setSoundEnabled: (value: boolean) => void
  setMasterVolume: (value: number) => void
  toggleMute: () => void
}

const DEFAULT_PREFERENCES: AudioPreferences = {
  soundEnabled: true,
  masterVolume: 0.8,
  muted: false,
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)

const getAudioContextConstructor = (): typeof AudioContext | null => {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    window.AudioContext ||
    (
      window as unknown as {
        webkitAudioContext?: typeof AudioContext
      }
    ).webkitAudioContext ||
    null
  )
}

const AudioContextReact = createContext<AudioContextValue | null>(null)

const readStoredPreferences = (): Partial<AudioPreferences> | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(AUDIO_STORAGE_KEY)
    if (!raw) {
      return null
    }

    return JSON.parse(raw) as Partial<AudioPreferences>
  } catch (error) {
    console.warn('[AudioProvider] Failed to read stored preferences', error)
    return null
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] =
    useState<AudioPreferences>(DEFAULT_PREFERENCES)

  const contextRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const groupGainRefs = useRef<Record<SoundGroup, GainNode | null>>({
    ui: null,
    cta: null,
  })
  const buffersRef = useRef<Map<SoundId, AudioBuffer>>(
    new Map<SoundId, AudioBuffer>()
  )
  const loadingBuffersRef = useRef<Map<SoundId, Promise<AudioBuffer | null>>>(
    new Map<SoundId, Promise<AudioBuffer | null>>()
  )

  const persistPreferences = useCallback((next: AudioPreferences) => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(next))
    } catch (error) {
      console.warn('[AudioProvider] Failed to persist preferences', error)
    }
  }, [])

  const updatePreferences = useCallback(
    (changes: Partial<AudioPreferences>) => {
      setPreferences((prev) => {
        const next = { ...prev, ...changes }
        persistPreferences(next)
        return next
      })
    },
    [persistPreferences]
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const stored = readStoredPreferences()
    if (stored) {
      setPreferences((prev) => ({ ...prev, ...stored }))
    }
  }, [])

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = preferences.muted
        ? 0
        : clamp(preferences.masterVolume)
    }
  }, [preferences.masterVolume, preferences.muted])

  const ensureContext = useCallback(() => {
    if (contextRef.current) {
      return contextRef.current
    }

    const AudioConstructor = getAudioContextConstructor()
    if (!AudioConstructor) {
      console.warn('[AudioProvider] Web Audio API not supported')
      return null
    }

    const ctx = new AudioConstructor()
    const masterGain = ctx.createGain()
    masterGain.gain.value = preferences.muted
      ? 0
      : clamp(preferences.masterVolume)
    masterGain.connect(ctx.destination)

    contextRef.current = ctx
    masterGainRef.current = masterGain
    return ctx
  }, [preferences.masterVolume, preferences.muted])

  const getGroupGain = useCallback(
    (group: SoundGroup) => {
      const existing = groupGainRefs.current[group]
      if (existing) {
        return existing
      }

      const ctx = ensureContext()
      if (!ctx || !masterGainRef.current) {
        return null
      }

      const gainNode = ctx.createGain()
      gainNode.gain.value = 1
      gainNode.connect(masterGainRef.current)
      groupGainRefs.current[group] = gainNode
      return gainNode
    },
    [ensureContext]
  )

  const loadBuffer = useCallback(
    async (id: SoundId): Promise<AudioBuffer | null> => {
      if (buffersRef.current.has(id)) {
        return buffersRef.current.get(id)!
      }

      if (loadingBuffersRef.current.has(id)) {
        return loadingBuffersRef.current.get(id)!
      }

      const ctx = ensureContext()
      if (!ctx) {
        return null
      }

      const { src } = SOUND_MAP[id]
      const promise = fetch(src)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch sound "${id}"`)
          }
          return response.arrayBuffer()
        })
        .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
        .then((buffer) => {
          buffersRef.current.set(id, buffer)
          loadingBuffersRef.current.delete(id)
          return buffer
        })
        .catch((error) => {
          console.error('[AudioProvider] Error loading sound', error)
          loadingBuffersRef.current.delete(id)
          return null
        })

      loadingBuffersRef.current.set(id, promise)
      return promise
    },
    [ensureContext]
  )

  const play = useCallback(
    (id: SoundId, options?: PlaySoundOptions) => {
      if (!preferences.soundEnabled || preferences.muted) {
        return
      }

      const definition = SOUND_MAP[id]

      const ctx = ensureContext()
      const masterGain = masterGainRef.current
      if (!ctx || !masterGain) {
        return
      }

      const startPlayback = (buffer: AudioBuffer) => {
        const source = ctx.createBufferSource()
        source.buffer = buffer
        if (options?.rate) {
          source.playbackRate.value = options.rate
        }

        const gainNode = ctx.createGain()
        const baseVolume = definition.volume ?? 1
        gainNode.gain.value = clamp(options?.volume ?? baseVolume)

        const groupGain = getGroupGain(definition.group)
        if (!groupGain) {
          return
        }

        source.connect(gainNode)
        gainNode.connect(groupGain)
        source.start(0)
      }

      ctx.resume().catch(() => undefined)

      const buffer = buffersRef.current.get(id)
      if (buffer) {
        startPlayback(buffer)
        return
      }

      loadBuffer(id).then((loaded) => {
        if (loaded) {
          startPlayback(loaded)
        }
      })
    },
    [
      ensureContext,
      getGroupGain,
      loadBuffer,
      preferences.muted,
      preferences.soundEnabled,
    ]
  )

  const setSoundEnabled = useCallback(
    (value: boolean) => updatePreferences({ soundEnabled: value }),
    [updatePreferences]
  )

  const setMasterVolume = useCallback(
    (value: number) => updatePreferences({ masterVolume: clamp(value) }),
    [updatePreferences]
  )

  const toggleMute = useCallback(
    () => updatePreferences({ muted: !preferences.muted }),
    [preferences.muted, updatePreferences]
  )

  const value = useMemo(
    () => ({
      ...preferences,
      play,
      setSoundEnabled,
      setMasterVolume,
      toggleMute,
    }),
    [play, preferences, setMasterVolume, setSoundEnabled, toggleMute]
  )

  return (
    <AudioContextReact.Provider value={value}>
      {children}
    </AudioContextReact.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContextReact)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }

  return context
}
