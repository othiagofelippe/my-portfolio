import { Badge } from "@/components/atoms";
import { Card, CardContent, CardTitle } from "@/components/molecules";
import {
  HiOutlineCog6Tooth,
  HiOutlineDevicePhoneMobile,
  HiOutlineServerStack,
} from "react-icons/hi2";

export function Skills({ dict }: { dict: any }) {
  const skillCategories = [
    {
      title: dict.skills.categories.frontend.title,
      icon: <HiOutlineDevicePhoneMobile className="w-6 h-6" />,
      skills: dict.skills.categories.frontend.skills,
    },
    {
      title: dict.skills.categories.backend.title,
      icon: <HiOutlineServerStack className="w-6 h-6" />,
      skills: dict.skills.categories.backend.skills,
    },
    {
      title: dict.skills.categories.tools.title,
      icon: <HiOutlineCog6Tooth className="w-6 h-6" />,
      skills: dict.skills.categories.tools.skills,
    },
  ];

  return (
    <section
      id="habilidades"
      className="py-20 bg-background-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.skills.title}
          </h2>
          <p className="typography-body text-text-body max-w-2xl mx-auto">
            {dict.skills.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="bg-background-primary border-border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-accent-brand">{category.icon}</div>
                  <CardTitle className="typography-h5 text-text-headline">
                    {category.title}
                  </CardTitle>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill: any, skillIndex: number) => (
                    <Badge
                      key={skillIndex}
                      variant="brand"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
