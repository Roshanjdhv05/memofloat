import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DOWNLOAD_FILE_NAME, DOWNLOAD_URL } from '../config'
import { supabase } from '../lib/supabase'

interface DownloadContextType {
  downloadCount: number
  isModalOpen: boolean
  hasDownloaded: boolean
  openModal: () => void
  closeModal: () => void
  triggerDownload: () => void
}

const STORAGE_KEY = 'memofloat_download_count'
const DEFAULT_COUNT = 332

const DownloadContext = createContext<DownloadContextType | undefined>(undefined)

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [downloadCount, setDownloadCount] = useState<number>(DEFAULT_COUNT)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasDownloaded, setHasDownloaded] = useState(false)

  useEffect(() => {
    // 1. Initial quick load from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = parseInt(stored, 10)
        if (!isNaN(parsed) && parsed >= DEFAULT_COUNT) {
          setDownloadCount(parsed)
        }
      } else {
        localStorage.setItem(STORAGE_KEY, String(DEFAULT_COUNT))
      }
    } catch {
      // Ignore localStorage errors (e.g., privacy mode)
    }

    // 2. Fetch live count from Supabase if configured
    if (!supabase) return

    let isMounted = true

    async function fetchServerCount() {
      try {
        const { data, error } = await supabase!
          .from('app_stats')
          .select('value')
          .eq('id', 'downloads')
          .single()

        if (!error && data && typeof data.value === 'number') {
          if (isMounted) {
            setDownloadCount(data.value)
            try {
              localStorage.setItem(STORAGE_KEY, String(data.value))
            } catch {
              // Ignore localStorage errors
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch download count from Supabase:', err)
      }
    }

    fetchServerCount()

    return () => {
      isMounted = false
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
    setHasDownloaded(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const triggerDownload = () => {
    // Optimistic local update
    setDownloadCount((prev) => {
      const next = prev + 1
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // Ignore localStorage errors
      }
      return next
    })
    setHasDownloaded(true)

    // Trigger file download
    const link = document.createElement('a')
    link.href = DOWNLOAD_URL
    link.download = DOWNLOAD_FILE_NAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Sync count increment to Supabase atomically
    if (supabase) {
      void (async () => {
        try {
          const { data, error } = await supabase.rpc('increment_download_count')
          if (!error && typeof data === 'number') {
            setDownloadCount(data)
            try {
              localStorage.setItem(STORAGE_KEY, String(data))
            } catch {
              // Ignore
            }
          } else if (error) {
            console.warn('Error incrementing download count in Supabase:', error)
          }
        } catch (err) {
          console.warn('Failed to call increment_download_count:', err)
        }
      })()
    }
  }

  return (
    <DownloadContext.Provider
      value={{
        downloadCount,
        isModalOpen,
        hasDownloaded,
        openModal,
        closeModal,
        triggerDownload,
      }}
    >
      {children}
    </DownloadContext.Provider>
  )
}

export function useDownload() {
  const context = useContext(DownloadContext)
  if (!context) {
    throw new Error('useDownload must be used within a DownloadProvider')
  }
  return context
}
