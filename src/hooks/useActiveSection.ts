import { useEffect, useRef, useState } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>('')
  const visibleSections = useRef<Set<string>>(new Set())
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idsKey = sectionIds.join(',')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const updateActive = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        const first = sectionIds.find((id) => visibleSections.current.has(id))
        setActiveSection(first ?? '')
      }, 100)
    }

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.current.add(id)
            } else {
              visibleSections.current.delete(id)
            }
          })
          updateActive()
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  return activeSection
}
