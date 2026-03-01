import fs from 'fs/promises'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

export async function appendLocalRecord(fileName: string, record: unknown) {
  try {
    await fs.mkdir(dataDir, { recursive: true })
    const filePath = path.join(dataDir, fileName)

    let arr: unknown[] = []
    try {
      const existing = await fs.readFile(filePath, 'utf8')
      arr = JSON.parse(existing)
      if (!Array.isArray(arr)) arr = []
    } catch {
      arr = []
    }

    arr.push(record)
    await fs.writeFile(filePath, JSON.stringify(arr, null, 2), 'utf8')
  } catch (err) {
    // keep failure non-fatal for API
    console.error('Local DB write error:', err)
  }
}

export async function readLocalRecords(fileName: string) {
  try {
    const filePath = path.join(dataDir, fileName)
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    return []
  }
}
