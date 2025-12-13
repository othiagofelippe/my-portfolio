import { Badge } from "@/components/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules";
import { HiOutlineAcademicCap, HiOutlineDocumentText, HiOutlineGlobeAlt } from "react-icons/hi2";

export function Education({ dict }: { dict: any }) {
  return (
    <section className="py-20 bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.education.title}
          </h2>
          <p className="typography-body text-text-body max-w-3xl mx-auto">
            {dict.education.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Formação Acadêmica */}
          <Card className="bg-background-secondary/20 border-border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
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
                    <p className="typography-body flex items-center gap-4">
                      <span>{dict.education.academic.period}</span>
                      <Badge variant="neutral">
                        {dict.education.academic.type}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificações */}
          <Card className="bg-background-secondary/20 border-border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
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
                      {dict.education.certifications.fullstack.technologies.map((tech: string, index: number) => (
                        <Badge
                          key={index}
                          variant="success"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Idiomas */}
          <Card className="bg-background-secondary/20 border-border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
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
        </div>
      </div>
    </section>
  );
}
