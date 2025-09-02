export function Education({ dict }: { dict: any }) {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {dict.education.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {dict.education.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Formação Acadêmica */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              🎓 {dict.education.academic.title}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {dict.education.academic.course}
                </h4>
                <div className="space-y-1 text-slate-600 dark:text-slate-400">
                  <p className="font-medium">{dict.education.academic.institution}</p>
                  <p>{dict.education.academic.location}</p>
                  <p className="flex items-center gap-4">
                    <span>{dict.education.academic.period}</span>
                    <span className="text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                      {dict.education.academic.type}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificações */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              📜 {dict.education.certifications.title}
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {dict.education.certifications.fullstack.name}
                </h4>
                <div className="space-y-1 text-slate-600 dark:text-slate-400 mb-4">
                  <p className="font-medium">{dict.education.certifications.fullstack.institution}</p>
                  <p>{dict.education.certifications.fullstack.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    {dict.education.certifications.fullstack.technologiesLabel}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dict.education.certifications.fullstack.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-200 dark:border-green-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Idiomas */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              🌐 {dict.education.languages.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {dict.education.languages.portuguese.name}
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  {dict.education.languages.portuguese.level}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {dict.education.languages.english.name}
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  {dict.education.languages.english.level}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}