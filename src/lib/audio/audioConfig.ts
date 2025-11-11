export type SoundGroup = "ui" | "cta";

export interface SoundDefinition {
  src: string;
  group: SoundGroup;
  volume?: number;
}

export const SOUND_MAP = {
  uiExpand: { src: "/sounds/ui-expand.mp3", group: "ui", volume: 0.4 },
  buttonClick: { src: "/sounds/button-click.mp3", group: "ui", volume: 0.5 },
  themeToggle: { src: "/sounds/theme-toggle.mp3", group: "ui", volume: 0.5 },
  pageTransition: {
    src: "/sounds/page-transition.mp3",
    group: "ui",
    volume: 0.5,
  },
  downloadCv: { src: "/sounds/download-cv.mp3", group: "cta", volume: 0.5 },
} as const;

export type SoundId = keyof typeof SOUND_MAP;
