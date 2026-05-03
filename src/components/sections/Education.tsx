"use client";

import { Badge } from "@/components/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules";
import { motion } from "motion/react";
import { HiOutlineAcademicCap, HiOutlineDocumentText, HiOutlineGlobeAlt } from "react-icons/hi2";

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
    <section id="formacao" className="py-20 bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.education.title}
          </h2>
          <p className="typography-body text-text-body max-w-3xl mx-auto">
            {dict.education.subtitle}
          </p>
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
              <Card className="bg-background-secondary/20 border-border-primary/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="typography-h5 text-text-headline flex items-center gap-3">
                    <HiOutlineAcademicCap className="w-6 h-6 text-accent-brand" />
                    {dict.education.academic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="typography-body-lg text-text-headline mb-2">
                        {dict.education.academic.course}
                      </h4>
                      <div className="space-y-1 text-text-body">
                        <p className="typography-body font-medium">{dict.education.academic.institution}</p>
                        <p className="typography-body">{dict.education.academic.location}</p>
                        <div className="typography-body flex items-center gap-4">
                          <span>{dict.education.academic.period}</span>
                          <Badge variant="neutral">
                            {dict.education.academic.type}
                          </Badge>
                        </div>
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
              <Card className="bg-background-secondary/20 border-border-primary/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="typography-h5 text-text-headline flex items-center gap-3">
                    <HiOutlineDocumentText className="w-6 h-6 text-accent-brand" />
                    {dict.education.certifications.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="typography-body-lg text-text-headline mb-2">
                        {dict.education.certifications.fullstack.name}
                      </h4>
                      <div className="space-y-1 text-text-body mb-4">
                        <p className="typography-body font-medium">{dict.education.certifications.fullstack.institution}</p>
                        <p className="typography-body">{dict.education.certifications.fullstack.date}</p>
                      </div>
                      <div>
                        <p className="typography-body-sm font-medium text-text-heading mb-3">
                          {dict.education.certifications.fullstack.technologiesLabel}:
                        </p>
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
              <Card className="bg-background-secondary/20 border-border-primary/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="typography-h5 text-text-headline flex items-center gap-3">
                    <HiOutlineGlobeAlt className="w-6 h-6 text-accent-brand" />
                    {dict.education.languages.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="typography-body-lg text-text-headline">
                        {dict.education.languages.portuguese.name}
                      </h4>
                      <p className="typography-body text-text-body">
                        {dict.education.languages.portuguese.level}
                      </p>
                    </div>
                    <div>
                      <h4 className="typography-body-lg text-text-headline">
                        {dict.education.languages.english.name}
                      </h4>
                      <p className="typography-body text-text-body">
                        {dict.education.languages.english.level}
                      </p>
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
