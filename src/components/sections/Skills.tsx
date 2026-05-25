"use client";

import { Badge } from "@/components/atoms";
import { Typography } from "@tfds/components";
import { Card, CardContent } from "@/components/molecules";
import { motion } from "motion/react";
import { Settings2, Smartphone, Server } from "@tfds/icons";

interface SkillsDict {
  skills: {
    title: string;
    subtitle: string;
    categories: {
      frontend: { title: string; skills: string[] };
      backend: { title: string; skills: string[] };
      tools: { title: string; skills: string[] };
    };
  };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const badgeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

export function Skills({ dict }: { dict: SkillsDict }) {
  const skillCategories = [
    {
      title: dict.skills.categories.frontend.title,
      icon: <Smartphone className="w-6 h-6" />,
      skills: dict.skills.categories.frontend.skills,
    },
    {
      title: dict.skills.categories.backend.title,
      icon: <Server className="w-6 h-6" />,
      skills: dict.skills.categories.backend.skills,
    },
    {
      title: dict.skills.categories.tools.title,
      icon: <Settings2 className="w-6 h-6" />,
      skills: dict.skills.categories.tools.skills,
    },
  ];

  return (
    <section id="habilidades" className="py-20 bg-bg-default/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography as="h2" variant="display-sm" color="primary" className="mb-4">
            {dict.skills.title}
          </Typography>
          <Typography color="secondary" className="max-w-2xl mx-auto">
            {dict.skills.subtitle}
          </Typography>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <Card className="bg-bg-page border-border-default/10 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-action-primary">{category.icon}</div>
                    <Typography as="h3" variant="heading-md" color="primary">
                      {category.title}
                    </Typography>
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-3"
                    variants={badgeContainerVariants}
                  >
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        variants={badgeVariants}
                        whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                      >
                        <Badge variant="brand">{skill}</Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
