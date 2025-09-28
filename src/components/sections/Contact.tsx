"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import useSound from 'use-sound';
import { Button } from '@/components/ui/button';

export function Contact({ dict }: { dict: any }) {
  const [playSuccessSound] = useSound('/sounds/email-success.mp3', { volume: 0.6 });
  const [playErrorSound] = useSound('/sounds/email-error.mp3', { volume: 0.6 });
  const [playSocialClick] = useSound('/sounds/button-click.mp3', { volume: 0.5 });
  
  const handleSocialClick = () => {
    playSocialClick();
  };
  
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
      playSuccessSound();
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
      playErrorSound();
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
      color: "hover:text-accent-brand"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/othiagofelippe",
      color: "hover:text-text-headline dark:hover:text-text-headline-dark"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-6 h-6" />,
      href: "https://wa.me/5521973494481",
      color: "hover:text-accent-green"
    },
    {
      name: "Email",
      icon: <HiOutlineEnvelope className="w-6 h-6" />,
      href: "mailto:contact@othiagofelippe.com",
      color: "hover:text-accent-red"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-background-primary dark:bg-background-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl text-text-headline dark:text-text-headline-dark mb-4">
            {dict.contact.title}
          </h2>
          <p className="font-roboto text-lg text-text-body dark:text-text-body-dark max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-background-secondary/20 dark:bg-background-tertiary rounded-xl p-8 border border-border-primary/20">
            <h3 className="font-poppins text-2xl text-text-headline dark:text-text-headline-dark mb-6">
              {dict.contact.formTitle}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="font-roboto block text-sm font-medium text-text-heading dark:text-text-heading-dark mb-2">
                  {dict.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`font-roboto w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-brand focus:border-transparent bg-background-primary dark:bg-background-secondary text-text-headline dark:text-text-headline-dark transition-colors ${
                    errors.name
                      ? 'border-accent-red'
                      : 'border-border-primary'
                  }`}
                  placeholder={dict.contact.form.namePlaceholder}
                />
                {errors.name && (
                  <p className="font-roboto mt-1 text-sm text-accent-red">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="font-roboto block text-sm font-medium text-text-heading dark:text-text-heading-dark mb-2">
                  {dict.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`font-roboto w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-brand focus:border-transparent bg-background-primary dark:bg-background-secondary text-text-headline dark:text-text-headline-dark transition-colors ${
                    errors.email
                      ? 'border-accent-red'
                      : 'border-border-primary'
                  }`}
                  placeholder={dict.contact.form.emailPlaceholder}
                />
                {errors.email && (
                  <p className="font-roboto mt-1 text-sm text-accent-red">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="font-roboto block text-sm font-medium text-text-heading dark:text-text-heading-dark mb-2">
                  {dict.contact.form.message}
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`font-roboto w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-brand focus:border-transparent bg-background-primary dark:bg-background-secondary text-text-headline dark:text-text-headline-dark resize-none transition-colors ${
                    errors.message
                      ? 'border-accent-red'
                      : 'border-border-primary'
                  }`}
                  placeholder={dict.contact.form.messagePlaceholder}
                />
                {errors.message && (
                  <p className="font-roboto mt-1 text-sm text-accent-red">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="font-roboto text-base font-medium w-full bg-accent-brand hover:bg-accent-brand-dark disabled:bg-accent-brand/50 disabled:cursor-not-allowed text-text-label transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Enviando...' : dict.contact.form.send}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="font-poppins text-2xl text-text-headline dark:text-text-headline-dark mb-4">
                {dict.contact.socialSection.title}
              </h3>
              <p className="font-roboto text-text-body dark:text-text-body-dark mb-6">
                {dict.contact.socialSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  size="lg"
                  onClick={handleSocialClick}
                  className={`flex items-center p-4 bg-background-secondary/30 dark:bg-background-secondary rounded-lg transition-colors ${link.color} group border border-border-primary/20 h-auto justify-start cursor-pointer`}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-text-span dark:text-text-span-dark group-hover:text-current mr-3">
                      {link.icon}
                    </div>
                    <span className="font-roboto font-medium text-text-body dark:text-text-body-dark group-hover:text-current">
                      {link.name}
                    </span>
                  </a>
                </Button>
              ))}
            </div>

            <div className="bg-accent-brand/10 rounded-xl p-6 border border-accent-brand/20">
              <h4 className="font-poppins font-medium text-accent-brand mb-2">
                {dict.contact.socialSection.quickResponse.title}
              </h4>
              <p className="font-roboto text-text-body dark:text-text-body-dark text-sm">
                {dict.contact.socialSection.quickResponse.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
