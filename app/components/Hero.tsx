import Image from 'next/image';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100">
                Fala aí! 👋
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-600 dark:text-slate-400">
                Prazer, eu sou o{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Thiago Felippe
                </span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Desenvolvedor Front-End com 3+ anos de experiência em React,
              Next.js e React Native. Foco em criar aplicações web e mobile
              funcionais, com código organizado e boa performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Ver meus projetos
              </button>
              <button className="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-lg font-medium transition-colors">
                Baixar CV
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white dark:border-slate-700 shadow-xl">
                <Image
                  src="https://github.com/othiagofelippe.png"
                  alt="Thiago Felippe"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-30 animate-pulse delay-75"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
