"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Image, Video, FileText, X, Loader2, Bot, User, Maximize2, Minimize2, MessageCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { projectsService, type Project } from "@/lib/database"
import { AnimatedSection } from "@/components/animated-section"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  attachments?: Array<{
    type: 'image' | 'video' | 'file'
    url: string
    name: string
  }>
  structuredContent?: {
    lists?: Array<{
      title?: string
      items: string[]
      type?: 'bullet' | 'numbered' | 'checklist'
    }>
    highlights?: string[]
    actions?: Array<{
      text: string
      action: string
    }>
  }
  projects?: any[] // <-- add this field
}

function StructuredContent({ content }: { content: Message['structuredContent'] }) {
  if (!content) return null

  return (
    <div className="space-y-4 mt-3">
      {content.lists?.map((list, index) => (
        <div key={index} className="bg-gray-50/50 rounded-lg p-3 border border-gray-200/30">
          {list.title && (
            <h4 className="font-medium text-gray-900 mb-2 text-sm">{list.title}</h4>
          )}
          <div className="space-y-1">
            {list.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-start gap-2">
                {list.type === 'checklist' ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                ) : list.type === 'numbered' ? (
                  <span className="text-xs text-gray-500 font-medium min-w-[16px]">{itemIndex + 1}.</span>
                ) : (
                  <div className="w-1.5 h-1.5 bg-gch-blue rounded-full mt-2 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {content.highlights && content.highlights.length > 0 && (
        <div className="bg-yellow-50/50 rounded-lg p-3 border border-yellow-200/30">
          <h4 className="font-medium text-yellow-800 mb-2 text-sm">Destacados:</h4>
          <div className="space-y-1">
            {content.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3 text-yellow-600" />
                <span className="text-sm text-yellow-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.actions && content.actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {content.actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs bg-white/80 hover:bg-gch-blue hover:text-white border-gray-200 hover:border-gch-blue"
            >
              {action.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

// Improved project list parser for bot Markdown/text output (robust to dashes and spacing)
function parseProjectsFromMarkdown(text: string) {
  const projects: any[] = [];
  // Split on any 'Description:' (with or without dashes/spaces)
  const blocks = text.split(/(^|\n)(-\s*)?Description:/i).filter(Boolean);
  for (let i = 1; i < blocks.length; i++) { // skip the first block (text before first project)
    let block = blocks[i].trim();
    // Description is up to first 'Category:' or 'Images:' or end
    let descMatch = block.match(/^([\s\S]*?)(Category:|Images?:|$)/i);
    let description = descMatch ? descMatch[1].replace(/\n/g, ' ').trim() : '';
    // Category is up to first 'Images:' or end
    let catMatch = block.match(/Category:\s*([\s\S]*?)(Images?:|$)/i);
    let category = catMatch ? catMatch[1].replace(/\n/g, ' ').trim() : '';
    // Images: collect all valid image URLs in this block
    const images: string[] = [];
    const imgRegex = /!\[.*?\]\((.*?)\)/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(block))) {
      if (imgMatch[1] && imgMatch[1].trim() !== '') images.push(imgMatch[1]);
    }
    projects.push({ description, category, images });
  }
  // Only require description, not category
  return projects.filter(p => p.description);
}

// New parser for '![Image]()' + 'Title:' numbered list format
function parseProjectsFromTitleListMarkdown(text: string) {
  // Find all blocks that start with ![Image ...]() followed by a numbered list with 'Title:'
  const lines = text.split(/\n/);
  const projects: any[] = [];
  let current: any = null;
  for (let i = 0; i < lines.length; i++) {
    const imgMatch = lines[i].match(/^!\[.*?\]\((.*?)\)/);
    if (imgMatch) {
      if (current) projects.push(current);
      current = { images: [imgMatch[1]], description: '', category: '' };
      continue;
    }
    const titleMatch = lines[i].match(/^\d+\.\s*Title:\s*(.*)$/i);
    if (titleMatch && current) {
      current.description = titleMatch[1].trim();
      continue;
    }
    // If another image line is found, push current and start new
    if (/^!\[.*?\]\((.*?)\)/.test(lines[i]) && current) {
      projects.push(current);
      current = null;
    }
  }
  if (current) projects.push(current);
  // Filter out empty
  return projects.filter(p => p.description);
}

function ProjectCardsMarkdown({ projects }: { projects: any[] }) {
  if (!projects.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2">
      {projects.map((project, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden transition hover:shadow-xl min-h-[260px]">
          {/* Show image if available, otherwise show a beautiful placeholder */}
          {project.images && project.images.length > 0 && project.images[0] ? (
            <img src={project.images[0]} alt={project.description} className="w-full h-36 object-cover bg-gray-100" />
          ) : (
            <div className="w-full h-36 flex items-center justify-center bg-gradient-to-br from-blue-100 to-yellow-100 text-gray-400 text-4xl">
              <span role="img" aria-label="placeholder">🖼️</span>
            </div>
          )}
          <div className="p-5 flex-1 flex flex-col gap-2">
            <h3 className="font-semibold text-gch-blue text-lg truncate mb-1">{project.description || 'Sin título'}</h3>
            {project.category && (
              <div className="flex gap-2 flex-wrap mt-1">
                <span className="text-xs bg-gch-blue/10 text-gch-blue border-gch-blue/20 px-2 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// In MessageContent, always prefer card UI for project lists or available projects
function MessageContent({ content, structuredContent, isBot, hideProjectList, showAllProjects, setShowAllProjects, projectsFromApi }: { content: string; structuredContent?: Message['structuredContent']; isBot?: boolean; hideProjectList?: boolean; showAllProjects?: boolean; setShowAllProjects?: (v: boolean) => void; projectsFromApi?: any[] }) {
  let cleanContent = content;

  // ROBUST FALLBACK: Try both parsers for 'proyectos' and render cards if either returns projects
  if (isBot && content.toLowerCase().includes('proyectos')) {
    const projectsA = parseProjectsFromMarkdown(content);
    const projectsB = parseProjectsFromTitleListMarkdown(content);
    const projects = projectsA.length > 0 ? projectsA : projectsB;
    if (projects.length > 0) {
      // Only render cards, do not render anything else
      return <ProjectCardsMarkdown projects={projects} />;
    }
  }

  // Force card rendering if the message is about projects and projectsFromApi is available
  if (isBot && projectsFromApi && projectsFromApi.length > 0 && content.toLowerCase().includes('proyectos')) {
    return <ProjectCardsMarkdown projects={projectsFromApi} />;
  }

  // More permissive detection: treat any bot message with at least two 'Description:' or 'Category:' or 'Images:' as a project list
  const projectPattern = /(-\s*)?Description:/gi;
  const categoryPattern = /Category:/gi;
  const imagesPattern = /Images?:/gi;
  const titlePattern = /^!\[.*?\]\s*$/m;
  const numberedTitlePattern = /^\d+\.\s*Title:/m;
  const projectCount = (content.match(projectPattern) || []).length;
  const categoryCount = (content.match(categoryPattern) || []).length;
  const imagesCount = (content.match(imagesPattern) || []).length;
  // Detect both formats
  const isProjectMarkdownList = isBot && ((projectCount >= 1 && categoryCount >= 1) || imagesCount >= 2);
  const isTitleList = isBot && titlePattern.test(content) && numberedTitlePattern.test(content);
  if (isProjectMarkdownList) {
    const projects = parseProjectsFromMarkdown(content);
    if (projects.length > 0) return <ProjectCardsMarkdown projects={projects} />;
  }
  if (isTitleList) {
    const projects = parseProjectsFromTitleListMarkdown(content);
    if (projects.length > 0) return <ProjectCardsMarkdown projects={projects} />;
  }

  // NEW: Prefer structured projects if present
  if (projectsFromApi && projectsFromApi.length > 0) {
    return <ProjectCardsMarkdown projects={projectsFromApi} />;
  }

  // Fallback: if this is the first bot message and projects are available in state, render them as cards
  // (Assume projects are passed as a prop or available via context/hook if needed)
  // Example usage: <MessageContent ... projects={projects} />
  // Uncomment and adapt if you want to always show cards on first load:
  // if (isBot && projects && projects.length && content.toLowerCase().includes('proyectos')) {
  //   return <ProjectCardsMarkdown projects={projects} />;
  // }

  if (isBot) {
    // Remove asterisks
    cleanContent = cleanContent.replace(/\*/g, '');
    // Remove unwanted details
    cleanContent = cleanContent
      .replace(/^.*Created At.*$/gim, '')
      .replace(/^.*Updated At.*$/gim, '')
      .replace(/^.*Sub Category.*$/gim, '')
      .replace(/^.*Main Category.*$/gim, '')
      .replace(/^.*Tags.*$/gim, '');
    // Remove extra blank lines
    cleanContent = cleanContent.replace(/\n{2,}/g, '\n').trim();
    // Remove lines like '1. ![Image 1]()' or '2. ![Image 2]()' (empty Markdown image links only)
    cleanContent = cleanContent.replace(/^\d+\.\s*!\[.*?\]\(\s*\)\s*$/gim, '').replace(/\n{2,}/g, '\n').trim();
    // If hideProjectList is true, remove project list blocks (titles, images, and lists)
    if (hideProjectList) {
      // Remove lines like 'Title: ...', 'Images:', '- ![Image]()', and numbered/bullet lists
      cleanContent = cleanContent.replace(/(^Title:.*$|^Images?:.*$|^-\s*!\[.*?\]\(.*?\)$|^\d+\.\s*!\[.*?\]\(.*?\)$|^\d+\.\s.*$|^-\s.*$)/gim, '');
      // Remove extra blank lines again
      cleanContent = cleanContent.replace(/\n{2,}/g, '\n').trim();
    }
  }

  // Extract all valid image URLs (not just Markdown)
  const urlRegex = /(https?:\/\/[\w\-._~:/?#\[\]@!$&'()*+,;=%]+\.(?:jpeg|jpg|png|webp|gif|svg))/gi;
  const images: { url: string }[] = [];
  let textWithoutImages = cleanContent;
  if (isBot) {
    textWithoutImages = cleanContent.replace(urlRegex, (match) => {
      images.push({ url: match });
      return '';
    });
    textWithoutImages = textWithoutImages.replace(/^\d+\.\s*!\[.*?\]\(\s*\)\s*$/gim, '').replace(/\n{2,}/g, '\n').trim();
  }

  const hasLists = textWithoutImages.includes('•') || textWithoutImages.includes('-') || textWithoutImages.includes('1.') || textWithoutImages.includes('*')
  
  const parseSimpleLists = (text: string) => {
    const lines = text.split('\n')
    const lists: Array<{ title?: string; items: string[]; type: 'bullet' | 'numbered' }> = []
    
    let currentItems: string[] = []
    let currentType: 'bullet' | 'numbered' | null = null
    let currentTitle: string | undefined

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed.match(/^[•\-\*]\s/)) {
        if (currentType !== 'bullet') {
          if (currentItems.length > 0) {
            lists.push({ title: currentTitle, items: currentItems, type: currentType! })
          }
          currentItems = []
          currentType = 'bullet'
        }
        currentItems.push(trimmed.replace(/^[•\-\*]\s/, ''))
      } else if (trimmed.match(/^\d+\.\s/)) {
        if (currentType !== 'numbered') {
          if (currentItems.length > 0) {
            lists.push({ title: currentTitle, items: currentItems, type: currentType! })
          }
          currentItems = []
          currentType = 'numbered'
        }
        currentItems.push(trimmed.replace(/^\d+\.\s/, ''))
      } else if (trimmed && !currentType) {
        currentTitle = trimmed
      } else if (trimmed && currentType && currentItems.length > 0) {
        // End of list
        lists.push({ title: currentTitle, items: currentItems, type: currentType })
        currentItems = []
        currentType = null
        currentTitle = undefined
      }
    }

    // Add remaining list
    if (currentItems.length > 0 && currentType) {
      lists.push({ title: currentTitle, items: currentItems, type: currentType })
    }

    return lists
  }

  const simpleLists = hasLists ? parseSimpleLists(textWithoutImages) : []
  const textWithoutLists = textWithoutImages.replace(/^[•\-\*]\s.*$/gm, '').replace(/^\d+\.\s.*$/gm, '').trim()

  return (
    <div className="space-y-3">
      {textWithoutLists && (
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{textWithoutLists}</p>
      )}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={`Imagen ${idx + 1}`}
              className="max-w-xs max-h-48 rounded-lg border border-gray-200 shadow"
              loading="lazy"
            />
          ))}
        </div>
      )}
      {structuredContent && <StructuredContent content={structuredContent} />}
      {simpleLists.length > 0 && !structuredContent && (
        <div className="space-y-3">
          {simpleLists.map((list, index) => (
            <div key={index} className="bg-gray-50/50 rounded-lg p-3 border border-gray-200/30">
              {list.title && (
                <h4 className="font-medium text-gray-900 mb-2 text-sm">{list.title}</h4>
              )}
              <div className="space-y-1">
                {list.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    {list.type === 'numbered' ? (
                      <span className="text-xs text-gray-500 font-medium min-w-[16px]">{itemIndex + 1}.</span>
                    ) : (
                      <div className="w-1.5 h-1.5 bg-gch-blue rounded-full mt-2 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Update the webhook function to use the new URL
async function triggerGoHighLevelWebhook(payload: any) {
  try {
    // Log the payload right before sending
    console.log('Webhook payload:', payload);
    const response = await fetch(
      "https://services.leadconnectorhq.com/hooks/25b51W5t3pdeLhP4hzEs/webhook-trigger/c8457ab7-1663-412b-a8a8-72d83e844b5a",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    return await response.json();
  } catch (err) {
    console.error("Failed to trigger GoHighLevel webhook", err);
  }
}

// Helper to extract user info from chat history
function extractUserInfo(messages: Message[]) {
  let name = '';
  let email = '';
  let phone = '';
  // Go through messages in reverse to get the latest values
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.type === 'user') {
      // Email regex
      if (!email && /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(msg.content)) {
        email = msg.content.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)?.[0] || '';
      }
      // Phone regex (simple, can be improved)
      if (!phone && /(?:\+?\d{1,3}[ -]?)?(?:\(?\d{2,3}\)?[ -]?)?\d{3,4}[ -]?\d{4}/.test(msg.content)) {
        phone = msg.content.match(/(?:\+?\d{1,3}[ -]?)?(?:\(?\d{2,3}\)?[ -]?)?\d{3,4}[ -]?\d{4}/)?.[0] || '';
      }
      // Name: look for 'my name is', 'I am', 'this is', or just a single word if the bot just asked for name
      if (!name) {
        if (/my name is/i.test(msg.content)) {
          name = msg.content.split(/my name is/i)[1]?.trim().split(' ')[0] || '';
        } else if (/i am/i.test(msg.content)) {
          name = msg.content.split(/i am/i)[1]?.trim().split(' ')[0] || '';
        } else if (/this is/i.test(msg.content)) {
          name = msg.content.split(/this is/i)[1]?.trim().split(' ')[0] || '';
        } else if (msg.content.split(' ').length === 1 && !email && !phone) {
          // If the message is a single word and not an email/phone, treat as name
          name = msg.content.trim();
        }
      }
    }
    if (name && email && phone) break;
  }
  return { name, email, phone };
}

// Helper to get or create a unique session ID (client-only, per tab)
function getOrCreateSessionId() {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('chatbot_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('chatbot_session_id', sessionId);
  }
  return sessionId;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [showProjectsTable, setShowProjectsTable] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [sessionId, setSessionId] = useState(''); // Always '' on first render (hydration-safe)
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: '¡Hola! Soy el asistente virtual de GCH Servicios. Puedo ayudarte con información sobre nuestros proyectos, servicios y responder tus consultas. También puedo mostrar nuestra base de datos de proyectos. ¿En qué puedo ayudarte?',
        timestamp: new Date(),
        structuredContent: {
          lists: [
            {
              title: "Servicios que ofrecemos:",
              items: [
                "Muebles de Melamina a medida",
                "Puertas de Ducha personalizadas", 
                "Servicios de Decoración",
                "Remodelación completa de espacios"
              ],
              type: 'bullet'
            }
          ],
          actions: [
            { text: "Ver proyectos", action: "show_projects" },
            { text: "Solicitar cotización", action: "quote" },
            { text: "Enviar imagen", action: "upload_image" }
          ]
        }
      }
    ])
    
    loadProjects()
    
    setTimeout(() => {
      setShowWelcome(false)
      inputRef.current?.focus()
    }, 3000)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Only runs on client
    const id = getOrCreateSessionId();
    setSessionId(id);
    setSessionReady(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadProjects = async () => {
    try {
      console.log('Loading projects...')
      const fetchedProjects = await projectsService.getAll()
      console.log('Projects loaded:', fetchedProjects.length, 'projects')
      console.log('Sample project:', fetchedProjects[0])
      setProjects(fetchedProjects)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return

    // Convert file to base64 if present
    let attachments = undefined
    if (selectedFile) {
      try {
        const base64 = await fileToBase64(selectedFile)
        attachments = [{
          type: selectedFile.type.startsWith('image/') ? 'image' : 
                selectedFile.type.startsWith('video/') ? 'video' : 'file',
          url: base64,
          name: selectedFile.name
        }]
      } catch (error) {
        console.error('Error converting file to base64:', error)
        toast.error('Error al procesar el archivo')
        return
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: selectedFile ? [{
        type: selectedFile.type.startsWith('image/') ? 'image' : 
              selectedFile.type.startsWith('video/') ? 'video' : 'file',
        url: URL.createObjectURL(selectedFile),
        name: selectedFile.name
      }] : undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setSelectedFile(null)
    setIsLoading(true)

    try {
      const response = await sendToN8n(userMessage, attachments)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.message || 'Gracias por tu mensaje. Te responderé pronto.',
        timestamp: new Date(),
        structuredContent: response.structuredContent,
        projects: response.projects // <-- add this
      }
      setMessages(prev => [...prev, botMessage])

      if (inputMessage.toLowerCase().includes('proyectos') || 
          inputMessage.toLowerCase().includes('proyecto') ||
          inputMessage.toLowerCase().includes('base de datos') ||
          inputMessage.toLowerCase().includes('database')) {
        setShowProjectsTable(true)
        console.log('Showing projects table. Projects count:', projects.length)
      }

      // Always trigger webhook for every user message if sessionId is set
      if (sessionId) {
        const { name, email, phone } = extractUserInfo([...messages, userMessage]);
        if (name && email) {
          const payload = {
            sessionId,
            name,
            email,
            phone,
            message: userMessage.content,
          };
          console.log('Webhook payload:', payload);
          await triggerGoHighLevelWebhook(payload);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const sendToN8n = async (message: Message, attachments?: Array<{ type: string; url: string; name: string }>) => {
    const payload = {
      message: message.content,
      attachments,
      timestamp: message.timestamp
    }

    console.log('Sending payload to chatbot API:', payload)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      console.log('API Response status:', response.status)
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error response:', errorText)
        throw new Error(`Failed to send message to chatbot service: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('API Response data:', data)

      let message = 'Gracias por tu mensaje. Te responderé pronto.'
      let structuredContent = undefined
      let projects: any[] = [] // Initialize projects
      
      if (data.message) {
        message = data.message
        console.log('Using data.message:', message)
      } else if (data.response) {
        message = data.response
        console.log('Using data.response:', message)
      } else if (typeof data === 'string') {
        message = data
        console.log('Using data as string:', message)
      } else if (data.data?.message) {
        message = data.data.message
        console.log('Using data.data.message:', message)
      } else if (data.data?.response) {
        message = data.data.response
        console.log('Using data.data.response:', message)
      } else {
        console.warn('Unexpected response format:', data)
        console.log('Available keys in data:', Object.keys(data))
        message = 'Gracias por tu mensaje. Te responderé pronto.'
      }

      if (data.structuredContent) {
        structuredContent = data.structuredContent
      } else if (data.data?.structuredContent) {
        structuredContent = data.data.structuredContent
      }

      if (data.projects) { // <-- add this
        projects = data.projects
        console.log('Using data.projects:', projects.length)
      }

      return { message, structuredContent, projects }
    } catch (error) {
      console.error('Error in sendToN8n:', error)
      throw error
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const removeSelectedFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const quickReplies = [
    "¿Qué servicios ofrecen?",
    "Muéstrame proyectos residenciales",
    "¿Cuál es el proceso de cotización?",
    "Necesito información sobre muebles de melamina",
    "Mostrar base de datos de proyectos"
  ]

  if (!sessionReady || !sessionId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Cargando chat...</div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 transition-all duration-500",
      isFullscreen ? "fixed inset-0 z-50" : "relative"
    )}>
      <div className="container mx-auto py-8 px-4">
        <AnimatedSection animation="slide-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gch-blue to-gch-yellow rounded-full mb-6 shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-gch-gray mb-4">
              Asistente Virtual GCH
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Conecta con nuestro asistente virtual para obtener información sobre proyectos, 
              servicios y consultas. También puedes enviar imágenes y videos.
            </p>
          </div>
        </AnimatedSection>

        <div className={cn(
          "grid gap-8 transition-all duration-500",
          isFullscreen ? "h-[calc(100vh-200px)]" : "",
          showProjectsTable ? "lg:grid-cols-3" : "lg:grid-cols-1"
        )}>
          <div className={cn(
            "transition-all duration-500",
            showProjectsTable ? "lg:col-span-2" : "lg:col-span-1"
          )}>
            <Card className={cn(
              "flex flex-col shadow-2xl border-0 bg-white/80 backdrop-blur-xl",
              isFullscreen ? "h-full" : "h-[80vh] max-h-[800px] min-h-[600px]"
            )}>
              <CardHeader className="border-b border-gray-200/50 bg-gradient-to-r from-gch-blue/10 to-gch-yellow/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <CardTitle className="text-lg font-semibold text-gch-gray">
                      Chat en vivo
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                      En línea
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-gray-500 hover:text-gch-blue"
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 chat-scrollbar" style={{ maxHeight: 'calc(80vh - 200px)', minHeight: '300px' }}>
                  {showWelcome && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gch-blue to-gch-yellow rounded-full mb-4">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gch-gray mb-2">¡Bienvenido!</h3>
                      <p className="text-muted-foreground">Estoy aquí para ayudarte con cualquier consulta</p>
                    </div>
                  )}

                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {message.type === 'bot' && (
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gch-blue to-gch-yellow rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl p-4 shadow-sm transition-all duration-200",
                          message.type === 'user'
                            ? "bg-gradient-to-br from-gch-blue to-gch-blue/90 text-white ml-auto"
                            : "bg-white border border-gray-200/50 text-gray-900"
                        )}
                      >
                        {/* Always use MessageContent for bot messages, so project lists are rendered as cards */}
                        <MessageContent content={message.content} structuredContent={message.structuredContent} isBot={message.type === 'bot'} hideProjectList={showProjectsTable && message.type === 'bot'} showAllProjects={showAllProjects} setShowAllProjects={setShowAllProjects} projectsFromApi={message.projects} />
                        
                        {message.attachments && message.attachments.map((attachment, index) => (
                          <div key={index} className="mt-3">
                            {attachment.type === 'image' && (
                              <div className="rounded-lg overflow-hidden border border-gray-200/50 bg-gray-50/30">
                                <img
                                  src={attachment.url}
                                  alt={attachment.name}
                                  className="max-w-full h-auto max-h-64 object-cover"
                                />
                                <div className="p-2 bg-white/80">
                                  <p className="text-xs text-gray-600">{attachment.name}</p>
                                </div>
                              </div>
                            )}
                            {attachment.type === 'video' && (
                              <div className="rounded-lg overflow-hidden border border-gray-200/50 bg-gray-50/30">
                                <video
                                  src={attachment.url}
                                  controls
                                  className="max-w-full h-auto max-h-64 object-cover"
                                />
                                <div className="p-2 bg-white/80">
                                  <p className="text-xs text-gray-600">{attachment.name}</p>
                                </div>
                              </div>
                            )}
                            {attachment.type === 'file' && (
                              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200/50">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-xs text-gray-600">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>

                      {message.type === 'user' && (
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gch-blue to-gch-yellow rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200/50 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-gch-blue" />
                          <span className="text-sm text-gray-600">Escribiendo...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {messages.length === 1 && (
                  <div className="p-4 border-t border-gray-200/50 bg-gray-50/30">
                    <p className="text-xs text-gray-500 mb-3">Respuestas rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setInputMessage(reply)
                            inputRef.current?.focus()
                          }}
                          className="text-xs bg-white/80 hover:bg-gch-blue hover:text-white border-gray-200 hover:border-gch-blue"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200/50 p-4 bg-white/80 backdrop-blur-sm">
                  {selectedFile && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-xl border border-blue-200/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {selectedFile.type.startsWith('image/') ? (
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Image className="h-5 w-5 text-blue-600" />
                          </div>
                        ) : selectedFile.type.startsWith('video/') ? (
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Video className="h-5 w-5 text-purple-600" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeSelectedFile}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0 h-12 w-12 p-0 border-gray-300 hover:border-gch-blue hover:bg-gch-blue/5"
                    >
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 h-12 border-gray-300 focus:border-gch-blue focus:ring-gch-blue/20 rounded-xl"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
                      className="shrink-0 h-12 w-12 p-0 bg-gradient-to-br from-gch-blue to-gch-blue/90 hover:from-gch-blue/90 hover:to-gch-blue text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {showProjectsTable && (
            <div className="lg:col-span-1">
              <Card className="h-[80vh] max-h-[800px] min-h-[600px] flex flex-col shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
                <CardHeader className="border-b border-gray-200/50 bg-gradient-to-r from-gch-yellow/10 to-gch-blue/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gch-gray">
                      Base de Datos de Proyectos
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowProjectsTable(false)}
                      className="text-xs border-gray-300 hover:border-gch-blue hover:bg-gch-blue/5"
                    >
                      Ocultar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-0 chat-scrollbar" style={{ maxHeight: 'calc(80vh - 200px)', minHeight: '300px' }}>
                  <div className="p-4">
                    {projects.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">No hay proyectos</h3>
                        <p className="text-xs text-gray-500">No se encontraron proyectos en la base de datos</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={loadProjects}
                          className="mt-4 text-xs"
                        >
                          Recargar proyectos
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-700">
                            <strong>Debug:</strong> {projects.length} proyectos cargados
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {(showAllProjects ? projects : projects.slice(0, 3)).map((project) => (
                            <div key={project.id} className="bg-white rounded-xl shadow border border-gray-100 flex flex-col overflow-hidden">
                              {project.images && project.images.length > 0 && project.images[0] && (
                                <img
                                  src={project.images[0]}
                                  alt={project.title || 'Imagen de proyecto'}
                                  className="w-full h-32 object-cover"
                                />
                              )}
                              <div className="p-4 flex-1 flex flex-col gap-2">
                                <h3 className="font-semibold text-gch-blue text-base truncate">{project.title || 'Sin título'}</h3>
                                <div className="flex gap-2 flex-wrap">
                                  <Badge variant="secondary" className="text-xs bg-gch-blue/10 text-gch-blue border-gch-blue/20">
                                    {project.main_category || 'N/A'}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs bg-gch-yellow/10 text-gch-yellow border-gch-yellow/20">
                                    {project.sub_category || 'N/A'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {projects.length > 3 && (
                          <div className="flex justify-center mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowAllProjects((prev) => !prev)}
                              className="text-xs border-gray-300 hover:border-gch-blue hover:bg-gch-blue/5"
                            >
                              {showAllProjects ? 'Ver menos' : `Ver más (${projects.length - 3})`}
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 