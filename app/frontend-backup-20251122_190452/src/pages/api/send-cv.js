import { Resend } from 'resend';

const resend = new Resend('re_your_key_here'); // PONÉ TU API KEY DE RESEND

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nombre, telefono, email, cargo, experiencia, cv } = req.body;

  try {
    await resend.emails.send({
      from: 'Trabajo <trabajo@liamyahir.com>',
      to: 'autoserviceliamyahir@gmail.com',
      subject: `SOLICITUD DE TRABAJO - ${cargo.toUpperCase()}`,
      html: `
        <h2>Nueva solicitud de empleo</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Cargo:</strong> ${cargo}</p>
        <p><strong>Experiencia:</strong> ${experiencia || 'No especificada'}</p>
      `,
      attachments: [{ filename: cv.name, content: cv }]
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
