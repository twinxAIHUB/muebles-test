import { NextRequest, NextResponse } from 'next/server'
import { projectsService } from '@/lib/database'
import { uploadService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, attachments, timestamp } = body

    console.log('Chatbot API received request:', { message, attachments: attachments?.length, timestamp })

    // Handle file uploads if any
    let uploadedFiles: Array<{ type: string; url: string; name: string }> = []
    
    if (attachments && attachments.length > 0) {
      console.log('Processing attachments:', attachments.length)
      
      for (const attachment of attachments) {
        try {
          // If it's a base64 image, convert and upload
          if (attachment.url.startsWith('data:image/')) {
            const base64Data = attachment.url.split(',')[1]
            const buffer = Buffer.from(base64Data, 'base64')
            const file = new File([buffer], attachment.name, { type: attachment.type })
            
            const uploadedUrl = await uploadService.uploadImage(file, `chatbot/${Date.now()}_${attachment.name}`)
            uploadedFiles.push({
              type: attachment.type,
              url: uploadedUrl,
              name: attachment.name
            })
          } else {
            // If it's already a URL, use it directly
            uploadedFiles.push(attachment)
          }
        } catch (error) {
          console.error('Error processing attachment:', error)
        }
      }
    }

    // Get projects data
    const projects = await projectsService.getAll()
    console.log('Loaded projects:', projects.length)

    // Send to n8n webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://twinxai.app.n8n.cloud/webhook/c7753a7d-0885-4de5-b1a6-57bba7cc40c0'

    // Prepare payload for n8n
    const n8nPayload = {
      message,
      attachments: uploadedFiles,
      timestamp,
      projects,
      source: 'gch-website',
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    console.log('Sending to n8n webhook:', n8nWebhookUrl)
    console.log('N8N payload size:', JSON.stringify(n8nPayload).length, 'bytes')
    
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY || ''}`
      },
      body: JSON.stringify(n8nPayload)
    })

    console.log('N8N response status:', n8nResponse.status)
    console.log('N8N response headers:', Object.fromEntries(n8nResponse.headers.entries()))

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text()
      console.error('N8N webhook failed:', n8nResponse.status, errorText)
      
      // Return a fallback response if n8n is not available
      return NextResponse.json({
        success: true,
        message: 'Gracias por tu mensaje. Nuestro equipo revisará tu consulta y te responderá pronto.',
        structuredContent: {
          lists: [
            {
              title: "Mientras tanto, puedes:",
              items: [
                "Explorar nuestros proyectos en la base de datos",
                "Ver nuestros servicios disponibles",
                "Contactarnos directamente por teléfono"
              ],
              type: 'bullet'
            }
          ],
          highlights: [
            "Tu mensaje ha sido recibido correctamente",
            "Incluimos información de nuestros proyectos para tu consulta"
          ]
        }
      })
    }

    const n8nData = await n8nResponse.json()
    console.log('N8N response data:', n8nData)

    // Handle different response formats from n8n
    let responseMessage = 'Gracias por tu mensaje. Te responderé pronto.'
    let structuredContent = undefined
    
    // Handle array response format (like the test showed)
    if (Array.isArray(n8nData) && n8nData.length > 0) {
      if (n8nData[0].output) {
        responseMessage = n8nData[0].output
      } else if (typeof n8nData[0] === 'string') {
        responseMessage = n8nData[0]
      }
    } else if (n8nData.response) {
      responseMessage = n8nData.response
    } else if (n8nData.message) {
      responseMessage = n8nData.message
    } else if (typeof n8nData === 'string') {
      responseMessage = n8nData
    } else if (n8nData.data?.response) {
      responseMessage = n8nData.data.response
    } else if (n8nData.output) {
      responseMessage = n8nData.output
    }

    // Extract structured content if available
    if (n8nData.structuredContent) {
      structuredContent = n8nData.structuredContent
    } else if (n8nData.data?.structuredContent) {
      structuredContent = n8nData.data.structuredContent
    }

    console.log('Sending response to client:', responseMessage)

    return NextResponse.json({
      success: true,
      message: responseMessage,
      structuredContent,
      data: n8nData
    })

  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chatbot API is running',
    status: 'ok'
  })
} 