import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
const nodemailer = require('nodemailer');

const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados do formulário
    const validatedData = contactFormSchema.parse(body);
    const { name, email, message } = validatedData;

    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: 'Configuração de email não encontrada' },
        { status: 500 }
      );
    }

    // Configurar transporte SMTP seguindo a documentação oficial
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email de destino (usa CONTACT_EMAIL se definido, senão usa EMAIL_USER)
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER;

    // Configurar o email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `Nova mensagem do portfolio - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            Nova mensagem do seu portfolio
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Mensagem:</h3>
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>Esta mensagem foi enviada através do formulário de contato do seu portfolio.</p>
            <p>Responda diretamente para o email: <a href="mailto:${email}">${email}</a></p>
          </div>
        </div>
      `,
      // Email de resposta será o email do remetente
      replyTo: email,
    };

    // Enviar o email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email enviado com sucesso!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao enviar email:', error);

    // Se for erro de validação do Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    // Outros erros
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}