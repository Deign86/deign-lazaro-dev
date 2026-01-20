import { NextRequest, NextResponse } from 'next/server';

// You'll need to install and configure Resend: npm install resend
// Get your API key from https://resend.com
// Add RESEND_API_KEY to your environment variables

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain later
        to: ['deign86@gmail.com'], // Your email address
        reply_to: email, // So you can reply directly to the sender
        subject: `Portfolio Contact from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a1a1a; margin-bottom: 24px;">New Contact Form Submission</h2>
            
            <div style="background-color: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px;">
              <h3 style="color: #333; margin: 0 0 12px 0;">Message:</h3>
              <p style="color: #555; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            
            <p style="color: #888; font-size: 12px; margin-top: 24px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
        text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', JSON.stringify(errorData, null, 2));
      
      // Provide more specific error messages
      const errorMessage = errorData?.message || errorData?.error?.message || 'Failed to send email';
      return NextResponse.json(
        { error: `Email service error: ${errorMessage}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(
      { success: true, messageId: data.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
