import { Code2, Paintbrush } from '@tfds/icons';
import { Typography } from '@tfds/components';
import { Card, CardContent } from '@/components/molecules';

export function Services({ dict }: { dict: any })  {
  const services = [
    {
      title: dict.services.frontend.title,
      description: dict.services.frontend.description,
      icon: <Code2 className="w-8 h-8" />,
    },
    {
      title: dict.services.design.title,
      description: dict.services.design.description,
      icon: <Paintbrush className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 bg-bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Typography as="h2" variant="display-sm" color="primary" className="mb-4">
            {dict.services.title}
          </Typography>
          <Typography color="secondary" className="max-w-2xl mx-auto">
            {dict.services.subtitle}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-bg-default/50 border-border-default/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-action-primary">
                    {service.icon}
                  </div>
                  <Typography as="h3" variant="heading-md" color="primary">
                    {service.title}
                  </Typography>
                </div>
                <Typography color="secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
