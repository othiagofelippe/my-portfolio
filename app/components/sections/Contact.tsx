"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { toast } from 'react-toastify';

export function Contact({ dict }: { dict: any }) {
  const contactFormSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar mensagem');
      }

      // Reset form on success
      reset();
      toast.success(dict.contact.form.successMessage || 'Mensagem enviada com sucesso! 🎉', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error(dict.contact.form.errorMessage || 'Erro ao enviar mensagem. Tente novamente. 😞', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="w-6 h-6" />,
      href: "https://linkedin.com/in/othiagofelippe",
      color: "hover:text-blue-600"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/othiagofelippe",
      color: "hover:text-slate-800 dark:hover:text-slate-100"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-6 h-6" />,
      href: "https://wa.me/5521973494481",
      color: "hover:text-green-600"
    },
    {
      name: "Email",
      icon: <HiOutlineEnvelope className="w-6 h-6" />,
      href: "mailto:contact@othiagofelippe.com",
      color: "hover:text-red-600"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {dict.contact.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              {dict.contact.formTitle}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {dict.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors ${
                    errors.name
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  placeholder={dict.contact.form.namePlaceholder}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {dict.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors ${
                    errors.email
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  placeholder={dict.contact.form.emailPlaceholder}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {dict.contact.form.message}
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors ${
                    errors.message
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                  placeholder={dict.contact.form.messagePlaceholder}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
{isSubmitting ? 'Enviando...' : dict.contact.form.send}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {dict.contact.socialSection.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {dict.contact.socialSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors ${link.color} group`}
                >
                  <div className="text-gray-600 dark:text-gray-400 group-hover:text-current mr-3">
                    {link.icon}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-current">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                {dict.contact.socialSection.quickResponse.title}
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {dict.contact.socialSection.quickResponse.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
