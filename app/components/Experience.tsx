export function Experience() {
  const experiences = [
    {
      period: "Abr 2022 - Mar 2025",
      title: "Desenvolvedor Front-End Pleno",
      company: "Heap Engenharia e Software",
      description: "Desenvolvimento e manutenção de aplicações web e mobile com React.js, Next.js e React Native. Implementei otimizações de performance, SSR, integração de APIs RESTful e introduzi novas bibliotecas que aprimoraram a arquitetura front-end. Participei ativamente em metodologias ágeis (Scrum/Kanban).",
      skills: ["React.js", "Next.js", "React Native", "TypeScript", "SSR", "APIs RESTful", "Scrum", "Kanban"]
    },
    {
      period: "Mar 2025 - Jun 2025",
      title: "Desenvolvedor Front-End Pleno",
      company: "Divam",
      description: "Desenvolvimento de aplicações mobile com React Native para novas funcionalidades e manutenção de produtos em produção. Implementação de soluções críticas, correção de bugs, integração com APIs e criação de interfaces seguindo boas práticas de UX/UI. Contribuição ativa em processos ágeis.",
      skills: ["React Native", "JavaScript", "APIs", "UX/UI", "Metodologias Ágeis", "Debugging"]
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Experiência Profissional
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Minha jornada profissional e as experiências que me moldaram como desenvolvedor
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600 md:left-1/2 md:transform md:-translate-x-px"></div>

            {experiences.map((experience, index) => (
              <div key={index} className="relative flex items-center mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 md:left-1/2 md:transform md:-translate-x-2"></div>

                {/* Content */}
                <div className={`ml-16 md:w-5/12 ${index % 2 === 0 ? 'md:ml-0 md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
                    <div className="mb-2">
                      <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full font-medium">
                        {experience.period}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-1">
                      {experience.title}
                    </h3>
                    
                    <h4 className="text-lg text-cyan-600 dark:text-cyan-400 font-medium mb-3">
                      {experience.company}
                    </h4>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Sempre em busca de novos desafios e oportunidades de crescimento! 📈
          </p>
          <a 
            href="/CV-Thiago-Felippe.pdf" 
            download="CV-Thiago-Felippe.pdf"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Baixar CV completo
          </a>
        </div>
      </div>
    </section>
  );
}