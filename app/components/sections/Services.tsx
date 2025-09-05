import { HiOutlineCodeBracket, HiOutlinePaintBrush } from 'react-icons/hi2';

export function Services({ dict }: { dict: any })  {
  const services = [
    {
      title: dict.services.frontend.title,
      description: dict.services.frontend.description,
      icon: <HiOutlineCodeBracket className="w-8 h-8" />,
    },
    {
      title: dict.services.design.title,
      description: dict.services.design.description,
      icon: <HiOutlinePaintBrush className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 bg-background-primary dark:bg-background-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl text-text-headline dark:text-text-headline-dark mb-4">
            {dict.services.title}
          </h2>
          <p className="font-roboto text-lg text-text-body dark:text-text-body-dark max-w-2xl mx-auto">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background-secondary/50 dark:bg-background-tertiary rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out border border-border-primary/20"
            >
              <div className="text-accent-brand mb-4">
                {service.icon}
              </div>
              <h3 className="font-poppins text-xl text-text-headline dark:text-text-headline-dark mb-3">
                {service.title}
              </h3>
              <p className="font-roboto text-text-body dark:text-text-body-dark leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
