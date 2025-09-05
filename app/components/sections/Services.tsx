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
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {dict.services.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div className="text-cyan-600 dark:text-cyan-400 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
