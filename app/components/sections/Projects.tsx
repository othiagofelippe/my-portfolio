export function Projects() {
  const projects = [
    {
      title: "E-commerce Moderno",
      description: "Plataforma de e-commerce completa com painel administrativo, carrinho de compras e sistema de pagamento integrado.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
      status: "Em breve"
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interativo para visualização de dados com gráficos dinâmicos e relatórios personalizáveis.",
      tags: ["React", "D3.js", "Node.js", "MongoDB"],
      status: "Em breve"
    },
    {
      title: "App Mobile de Produtividade",
      description: "Aplicativo mobile para gerenciamento de tarefas com sincronização em tempo real e notificações push.",
      tags: ["React Native", "Firebase", "Redux", "Push Notifications"],
      status: "Em breve"
    }
  ];

  return (
    <section id="projetos" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Meus Projetos
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi e que mostram minhas habilidades técnicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div className="mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-500 dark:bg-cyan-400 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm px-3 py-1 rounded-full font-medium">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
                {project.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                  Demo
                </button>
                <button className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                  Código
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Mais projetos em desenvolvimento! 🚀
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Ver todos os projetos
          </button>
        </div>
      </div>
    </section>
  );
}