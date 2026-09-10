import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@3.2.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  try {
    // Parse the payload sent by the Supabase Database Webhook
    const payload = await req.json();

    // Ensure this is an INSERT event from our waitlist table
    if (payload.type !== 'INSERT' || !payload.record?.email) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    const { name, email } = payload.record;

    // Send the email
    const data = await resend.emails.send({
      from: 'Latent Space <latentspace@growthcoliving.com>',
      to: email, // Note: Must be your verified Resend email while in free tier
      subject: 'Application Received: Latent Space Founding Cohort',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; padding: 20px;">
          <p>Hi ${name}, 👋</p>
          <p>Thank you for applying to the <strong>Founding Cohort</strong> of Latent Space. 🌌</p>
          <p>We have received your application and are currently reviewing it. Because we are strictly limiting this cohort to 10 attendees, the selection process is highly curated. ⏳</p>
          <p>If selected, we will reach out shortly to schedule a brief interview. 🗓️</p>
          <br/>
          <p>Best, ✌️<br/>The Latent Space Team</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
