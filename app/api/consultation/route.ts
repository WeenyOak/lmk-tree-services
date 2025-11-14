// app/api/consultation/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, images, imageNames } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format service name
    const serviceNames: { [key: string]: string } = {
      'tree-removal': 'Tree Removal',
      'tree-lopping': 'Tree Lopping & Pruning',
      'tree-health': 'Tree Health Assessment',
      'emergency': 'Emergency Services',
      'waste-removal': 'Green Waste Removal',
      'land-clearing': 'Land Clearing',
      'other': 'Other Service',
    }

    const serviceName = serviceNames[service] || service

    // Prepare attachments for email if images exist
    const attachments = images && images.length > 0
      ? images.map((base64Image: string, index: number) => ({
          filename: imageNames?.[index] || `tree-photo-${index + 1}.jpg`,
          content: base64Image.split(',')[1], // Remove data URL prefix
        }))
      : []

    // Generate image thumbnails HTML for email
    const imageThumbnailsHtml = images && images.length > 0
      ? `
        <h3 style="color: #333; margin-top: 20px;">Attached Photos (${images.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-top: 10px;">
          ${images.map((img: string, idx: number) => `
            <img src="${img}" alt="Tree photo ${idx + 1}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; border: 2px solid #ddd;" />
          `).join('')}
        </div>
      `
      : '<p style="color: #666; font-style: italic;">No photos attached</p>'

    // Send email notification to business owner
    await resend.emails.send({
      from: 'LMK Tree Services <kyle@lmktreeservices.com>',
      to: process.env.NOTIFICATION_EMAIL || 'kyle@lmktreeservices.com',
      subject: `🌳 New Lead: ${serviceName} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #16a34a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">🌳 New Consultation Request!</h2>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
            <h3 style="color: #333; margin-top: 0;">Client Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 8px; font-weight: bold;">Name:</td>
                <td style="padding: 12px 8px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 8px; font-weight: bold;">Phone:</td>
                <td style="padding: 12px 8px;"><a href="tel:${phone}" style="color: #16a34a; text-decoration: none; font-weight: bold;">${phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 8px; font-weight: bold;">Email:</td>
                <td style="padding: 12px 8px;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 8px; font-weight: bold;">Service:</td>
                <td style="padding: 12px 8px;"><span style="background: #dcfce7; padding: 4px 12px; border-radius: 12px; color: #166534;">${serviceName}</span></td>
              </tr>
            </table>
            
            <h3 style="color: #333; margin-top: 20px;">Project Description</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a;">
              <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
            </div>
            
            ${imageThumbnailsHtml}
            
            <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404;"><strong>⏰ Action Required:</strong> Please respond within 24 hours for best conversion rate.</p>
            </div>
          </div>
        </div>
      `,
      attachments: attachments,
    })

    // Send confirmation email to client
    await resend.emails.send({
      from: 'LMK Tree Services <kyle@lmktreeservices.com>',
      to: email,
      subject: 'We\'ve Received Your Consultation Request - LMK Tree Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #16a34a; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your consultation request has been received</p>
          </div>
          
          <div style="padding: 30px 20px; background: #f9fafb; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              We've received your request for <strong style="color: #16a34a;">${serviceName}</strong> and our team is reviewing it now.
            </p>
            
            ${images && images.length > 0 ? `
              <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
                <p style="margin: 0; color: #166534;">✅ <strong>${images.length} photo(s)</strong> received - this will help us provide an accurate quote!</p>
              </div>
            ` : ''}
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #16a34a;">
              <h3 style="margin: 0 0 15px 0; color: #16a34a; font-size: 18px;">📋 What Happens Next?</h3>
              <ol style="color: #555; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Our expert arborist will review your requirements${images && images.length > 0 ? ' and photos' : ''}</li>
                <li>We'll contact you within <strong>24 hours</strong> via phone or email</li>
                <li>We'll schedule a free site visit if needed</li>
                <li>You'll receive a detailed, no-obligation quote</li>
              </ol>
            </div>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; color: #166534; font-size: 14px; font-weight: 600;">NEED IMMEDIATE ASSISTANCE?</p>
              <a href="tel:0412345678" style="display: inline-block; background: #16a34a; color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 18px;">📞 Call 0412 345 678</a>
            </div>
            
            <p style="font-size: 16px; color: #333; margin-top: 30px;">
              Best regards,<br>
              <strong style="color: #16a34a;">The LMK Tree Services Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p style="margin: 5px 0;">LMK Tree Services | Melbourne, Victoria</p>
            <p style="margin: 5px 0;">Phone: 0412 345 678 | Email: kyle@lmktreeservices.com</p>
            <p style="margin: 15px 0 5px 0; color: #999;">Fully Licensed & Insured | ABN: 12 345 678 901</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Consultation request sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing consultation request:', error)
    return NextResponse.json(
      { error: 'Failed to process consultation request' },
      { status: 500 }
    )
  }
}