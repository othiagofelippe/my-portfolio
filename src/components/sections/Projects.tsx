import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <section id="projetos" className="py-20 bg-background-secondary/30 dark:bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl text-text-headline dark:text-text-headline-dark mb-4">
            Meus Projetos
          </h2>
          <p className="font-roboto text-lg text-text-body dark:text-text-body-dark max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi e que mostram minhas habilidades técnicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-background-primary dark:bg-background-tertiary rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out border border-border-primary/20"
            >
              <div className="mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-background-secondary/30 to-background-secondary/50 dark:from-background-secondary dark:to-background-tertiary rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-brand rounded-full flex items-center justify-center mb-2 mx-auto">
                      <svg className="w-8 h-8 text-text-label" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <Badge
                      variant="outline"
                      className="font-roboto bg-background-secondary/50 dark:bg-background-secondary text-text-span dark:text-text-span-dark text-sm border-border-primary/20"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <h3 className="font-poppins text-xl text-text-headline dark:text-text-headline-dark mb-3">
                {project.title}
              </h3>
              
              <p className="font-roboto text-text-body dark:text-text-body-dark mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className="font-roboto bg-accent-brand/10 text-accent-brand text-sm border border-accent-brand/20 hover:bg-accent-brand/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="font-roboto flex-1 bg-background-secondary/50 dark:bg-background-secondary text-text-span dark:text-text-span-dark border-border-primary/20 cursor-not-allowed"
                >
                  Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="font-roboto flex-1 bg-background-secondary/50 dark:bg-background-secondary text-text-span dark:text-text-span-dark border-border-primary/20 cursor-not-allowed"
                >
                  Código
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-roboto text-text-body dark:text-text-body-dark mb-6">
            Mais projetos em desenvolvimento! 🚀
          </p>
          <Button
            size="lg"
            className="font-roboto text-base font-medium bg-accent-brand hover:bg-accent-brand-dark text-text-label transition-colors cursor-pointer"
          >
            Ver todos os projetos
          </Button>
        </div>
      </div>
    </section>
  );
}