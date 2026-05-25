"use client";

import { Badge } from "@/components/atoms";
import { Typography } from "@tfds/components";
import { Card, CardContent, CardHeader } from "@/components/molecules";
import { motion } from "motion/react";
import { GraduationCap, FileText, Globe } from "@tfds/icons";

interface EducationDict {
  education: {
    title: string;
    subtitle: string;
    academic: {
      title: string;
      course: string;
      institution: string;
      location: string;
      period: string;
      type: string;
    };
    certifications: {
      title: string;
      fullstack: {
        name: string;
        institution: string;
        date: string;
        technologiesLabel: string;
        technologies: string[];
      };
    };
    languages: {
      title: string;
      portuguese: { name: string; level: string };
      english: { name: string; level: string };
    };
  };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Education({ dict }: { dict: EducationDict }) {
  return (
    <section id="formacao" className="py-20 bg-bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography as="h2" variant="display-sm" color="primary" className="mb-4">
            {dict.education.title}
          </Typography>
          <Typography color="secondary" className="max-w-3xl mx-auto">
            {dict.education.subtitle}
          </Typography>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Formação Acadêmica */}
          <motion.div variants={cardVariants}>
            <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="bg-bg-default/20 border-border-default/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <Typography as="h3" variant="heading-md" color="primary" className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-action-primary" />
                    {dict.education.academic.title}
                  </Typography>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Typography as="h4" variant="body-lg" color="primary" className="mb-2">
                        {dict.education.academic.course}
                      </Typography>
                      <div className="space-y-1 text-text-secondary">
                        <Typography as="p" color="secondary" className="font-medium">{dict.education.academic.institution}</Typography>
                        <Typography as="p" color="secondary">{dict.education.academic.location}</Typography>
                        <Typography as="p" color="secondary" className="flex items-center gap-4">
                          <span>{dict.education.academic.period}</span>
                          <Badge variant="neutral">
                            {dict.education.academic.type}
                          </Badge>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Certificações */}
          <motion.div variants={cardVariants}>
            <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="bg-bg-default/20 border-border-default/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <Typography as="h3" variant="heading-md" color="primary" className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-action-primary" />
                    {dict.education.certifications.title}
                  </Typography>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Typography as="h4" variant="body-lg" color="primary" className="mb-2">
                        {dict.education.certifications.fullstack.name}
                      </Typography>
                      <div className="space-y-1 text-text-secondary mb-4">
                        <Typography as="p" color="secondary" className="font-medium">{dict.education.certifications.fullstack.institution}</Typography>
                        <Typography as="p" color="secondary">{dict.education.certifications.fullstack.date}</Typography>
                      </div>
                      <div>
                        <Typography as="p" variant="body-sm" color="primary" className="font-medium mb-3">
                          {dict.education.certifications.fullstack.technologiesLabel}:
                        </Typography>
                        <div className="flex flex-wrap gap-2">
                          {dict.education.certifications.fullstack.technologies.map((tech: string) => (
                            <Badge key={tech} variant="success">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Idiomas */}
          <motion.div variants={cardVariants}>
            <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="bg-bg-default/20 border-border-default/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <Typography as="h3" variant="heading-md" color="primary" className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-action-primary" />
                    {dict.education.languages.title}
                  </Typography>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Typography as="h4" variant="body-lg" color="primary">
                        {dict.education.languages.portuguese.name}
                      </Typography>
                      <Typography color="secondary">
                        {dict.education.languages.portuguese.level}
                      </Typography>
                    </div>
                    <div>
                      <Typography as="h4" variant="body-lg" color="primary">
                        {dict.education.languages.english.name}
                      </Typography>
                      <Typography color="secondary">
                        {dict.education.languages.english.level}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
