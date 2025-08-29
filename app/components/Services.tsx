import { HiOutlineCodeBracket, HiOutlinePaintBrush } from 'react-icons/hi2';

export function Services() {
  const services = [
    {
      title: "Desenvolvimento Frontend",
      description:
        "Criação de interfaces modernas e responsivas com React, Next.js e TypeScript",
      icon: <HiOutlineCodeBracket className="w-8 h-8" />,
    },
    {
      title: "Design UI/UX",
      description:
        "Design de experiências de usuário intuitivas e interfaces visuais atrativas",
      icon: <HiOutlinePaintBrush className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meus Serviços
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transformo ideias em soluções digitais completas, do design à implementação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
