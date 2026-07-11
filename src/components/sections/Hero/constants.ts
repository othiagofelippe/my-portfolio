export const ROTATING_WORDS = ["Design Systems", "React & Next.js", "React Native", "TypeScript"];
export const ROTATION_INTERVAL = 2800;

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};
