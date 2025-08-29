import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

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

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a 
                href="/CV-Thiago-Felippe.pdf" 
                download="CV-Thiago-Felippe.pdf"
                className="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-lg font-medium transition-colors inline-block text-center"
              >
                Baixar CV
              </a>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com/in/thiagofelippe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  title="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a 
                  href="https://github.com/othiagofelippe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all"
                  title="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 rounded-3xl overflow-hidden border-8 border-white dark:border-slate-700 shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer">
              <Image
                src="https://github.com/othiagofelippe.png"
                alt="Thiago Felippe"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
