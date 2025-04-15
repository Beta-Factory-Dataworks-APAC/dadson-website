import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import payload from 'payload'
import { InitOptions } from 'payload/config'

// Cache for the Payload instance
let cachedPayload: any = null

async function initializePayload() {
  if (cachedPayload) return cachedPayload

  // Initialize Payload
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET env variable is required')
  }
  
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    config: path.resolve(process.cwd(), 'payload/dadson-blog/src/payload.config.ts'),
    local: true,
  } as InitOptions)

  cachedPayload = payload
  return payload
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  
  // Ensure slug is an array
  const slugArray = Array.isArray(slug) ? slug : [slug as string]
  
  // Initialize Payload
  const payload = await initializePayload()

  // Handle the admin route - this serves the Payload admin panel
  if (slugArray[0] === 'admin') {
    const adminSlug = slugArray.slice(1).join('/')
    return payload.admin({
      req,
      res,
      path: adminSlug.length > 0 ? `/${adminSlug}` : '/',
    })
  }

  // Handle API requests
  return payload.handle({ req, res })
} 