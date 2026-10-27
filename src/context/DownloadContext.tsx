import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DOWNLOAD_FILE_NAME, DOWNLOAD_URL } from '../config'

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
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = parseInt(stored, 10)
        if (!isNaN(parsed) && parsed >= DEFAULT_COUNT) {
          setDownloadCount(parsed)
          return
        }
      }
      localStorage.setItem(STORAGE_KEY, String(DEFAULT_COUNT))
    } catch {
      // Ignore localStorage errors (e.g., privacy mode)
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
