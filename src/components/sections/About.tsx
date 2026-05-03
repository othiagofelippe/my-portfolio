"use client";

import { Card, CardContent } from "@/components/molecules";
import { Clapperboard, Dumbbell, MapPin, Music } from "lucide-react";
import { motion } from "motion/react";

interface AboutInterestItem {
  label: string;
  description: string;
}

interface AboutDict {
  about: {
    title: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    quote: string;
    interests: {
      title: string;
      items: AboutInterestItem[];
    };
  };
}

const INTEREST_ICONS = [Clapperboard, Music, Dumbbell, MapPin];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function About({ dict }: { dict: AboutDict }): React.JSX.Element {
  return (
    <section id="sobre" className="py-20 bg-background-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="typography-h2 text-text-headline mb-4">{dict.about.title}</h2>
          <p className="typography-body text-text-body max-w-2xl mx-auto">{dict.about.subtitle}</p>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-background-primary border-border-primary/10 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <p className="typography-body-lg text-text-body leading-relaxed">{dict.about.bio1}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-background-primary border-border-primary/10 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <p className="typography-body-lg text-text-body leading-relaxed">{dict.about.bio2}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <h3 className="typography-h5 text-text-headline mb-6 text-center">
              {dict.about.interests.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {dict.about.interests.items.map((item, index) => {
                const Icon = INTEREST_ICONS[index];
                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <Card className="bg-background-primary border-border-primary/10 shadow-sm h-full">
                      <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-brand/10 flex items-center justify-center">
                          <Icon size={20} className="text-accent-brand" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="typography-body-sm font-semibold text-text-headline">{item.label}</p>
                          <p className="typography-body-sm text-text-body mt-0.5">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 text-center">
            <p className="typography-h5 text-text-headline font-semibold italic">
              &ldquo;{dict.about.quote}&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
