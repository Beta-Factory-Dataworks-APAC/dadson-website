import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const adapter = sqliteAdapter({
  client: {
    url: `file:${path.resolve(dirname, '../payload-dadson-blog.db')}`
  }
}) 