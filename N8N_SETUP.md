# N8N Chatbot Integration Setup

This guide explains how to set up the n8n integration for the GCH Services chatbot.

## Overview

The chatbot is designed to work with n8n workflows to provide intelligent responses and handle file uploads (images and videos). The integration uses webhooks to communicate between the website and n8n.

## Environment Variables

Add these environment variables to your `.env.local` file:

```env
# N8N Configuration
N8N_WEBHOOK_URL=https://twinxai.app.n8n.cloud/webhook/c7753a7d-0885-4de5-b1a6-57bba7cc40c0
N8N_API_KEY=your_n8n_api_key_here
```

**Note**: The webhook URL is already configured as the default fallback, so you only need to set `N8N_API_KEY` if your n8n instance requires authentication.

## N8N Workflow Setup

### 1. Create a Webhook Trigger

1. In your n8n instance, create a new workflow
2. Add a **Webhook** trigger node
3. Configure the webhook:
   - **HTTP Method**: POST
   - **Path**: `/webhook/chatbot`
   - **Response Mode**: Respond to Webhook

### 2. Expected Payload Structure

The webhook will receive the following JSON payload:

```json
{
  "message": "User message content",
  "attachments": [
    {
      "type": "image|video|file",
      "url": "file_url",
      "name": "filename.ext"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "projects": [
    {
      "id": "project_id",
      "title": "Project Title",
      "description": "Project Description",
      "mainCategory": "Residencial|Comercial",
      "subCategory": "Muebles de Melamina|Puertas de Ducha|Decoración|Remodelación",
      "images": ["image_urls"],
      "tags": ["tag1", "tag2"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "source": "gch-website",
  "userAgent": "browser_user_agent",
  "ip": "user_ip_address"
}
```

### 3. Processing Nodes

Add these nodes to your workflow:

#### AI/LLM Node (Optional)
- Use OpenAI, Claude, or any AI service to generate responses
- Input: `{{ $json.message }}`
- Context: Include projects data for informed responses

#### File Processing (For Attachments)
- **Image Processing**: Use n8n's image nodes to analyze uploaded images
- **Video Processing**: Use video processing nodes for video files
- **File Storage**: Store files in cloud storage (AWS S3, Google Cloud, etc.)

#### Response Generation
- Create a response based on:
  - User message content
  - Available projects data
  - File analysis results
  - Business rules and FAQs

### 4. Response Format

The workflow should return a response in this format:

```json
{
  "response": "Bot response message",
  "suggestions": ["suggestion1", "suggestion2"],
  "showProjects": true,
  "data": {
    "relevantProjects": ["project_id1", "project_id2"]
  }
}
```

## Example Workflow

```
Webhook Trigger
    ↓
Parse Message
    ↓
Check for Attachments
    ↓
Process Files (if any)
    ↓
AI Response Generation
    ↓
Format Response
    ↓
Return Response
```

## Security Considerations

1. **API Key**: Use environment variables for sensitive data
2. **Rate Limiting**: Implement rate limiting in n8n
3. **Input Validation**: Validate all incoming data
4. **File Upload Limits**: Set appropriate file size limits
5. **CORS**: Configure CORS properly for webhook endpoints

## Testing

1. **Local Testing**: Use ngrok to expose local n8n instance
2. **Webhook Testing**: Test webhook endpoints with tools like Postman
3. **File Upload Testing**: Test with various file types and sizes
4. **Response Testing**: Verify response format and content

## Deployment

1. **N8N Instance**: Deploy n8n to your preferred platform
2. **Environment Variables**: Set production environment variables
3. **SSL Certificate**: Ensure HTTPS for production webhooks
4. **Monitoring**: Set up monitoring and logging

## Troubleshooting

### Common Issues

1. **Webhook Not Receiving Data**
   - Check webhook URL configuration
   - Verify network connectivity
   - Check n8n instance status

2. **File Upload Failures**
   - Check file size limits
   - Verify file type restrictions
   - Check storage permissions

3. **Response Errors**
   - Validate response format
   - Check AI service configuration
   - Verify API keys and credentials

### Debug Steps

1. Enable n8n debug logging
2. Check browser developer tools for network errors
3. Monitor n8n execution logs
4. Test webhook endpoints independently

## Support

For issues with:
- **Website Integration**: Check the chatbot component code
- **N8N Workflows**: Refer to n8n documentation
- **API Configuration**: Verify environment variables and endpoints 