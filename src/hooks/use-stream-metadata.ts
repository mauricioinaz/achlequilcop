import { useEffect, useState } from 'react'

const POLL_INTERVAL_MS = 15000
const REQUEST_TIMEOUT_MS = 8000

/**
 * SHOUTcast v1 exposes the current song at `/7.html` as a CSV line:
 * currentListeners,streamStatus,peakListeners,maxListeners,uniqueListeners,bitrate,songTitle
 * The song title is everything after the 6th comma (it may contain commas itself).
 */
function parseShoutcastV1(body: string): string | null {
  const text = body.replace(/<[^>]*>/g, '').trim()
  const parts = text.split(',')
  if (parts.length < 7) return null
  const title = parts.slice(6).join(',').trim()
  return title || null
}

async function fetchNowPlaying(radioUrl: string): Promise<string | null> {
  const match = radioUrl.match(/^(https?:\/\/[^/?#]+)/i)
  if (!match) return null
  const origin = match[1]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(`${origin}/7.html`, {
      // SHOUTcast v1 serves the audio stream instead of the status page
      // unless the client looks like a browser.
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal,
    })
    if (!response.ok) return null
    return parseShoutcastV1(await response.text())
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Polls the streaming server for the current song title while `enabled` is true.
 * Returns null when the server doesn't expose metadata or it can't be fetched.
 */
export function useStreamMetadata(radioUrl: string, enabled: boolean): string | null {
  const [title, setTitle] = useState<string | null>(null)

  useEffect(() => {
    setTitle(null)
  }, [radioUrl])

  useEffect(() => {
    if (!enabled) return

    let cancelled = false

    const poll = () => {
      fetchNowPlaying(radioUrl)
        .then((next) => {
          if (!cancelled) setTitle(next)
        })
        .catch((err) => {
          console.log('[StreamMetadata] Failed to fetch now playing:', err?.message ?? err)
        })
    }

    poll()
    const interval = setInterval(poll, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [radioUrl, enabled])

  return title
}
