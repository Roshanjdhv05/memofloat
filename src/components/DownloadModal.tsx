import { useEffect, useState } from 'react'
import { DOWNLOAD_FILE_NAME } from '../config'
import { useDownload } from '../context/DownloadContext'
import { Logo } from './ui'

export function DownloadModal() {
  const { isModalOpen, closeModal, triggerDownload, hasDownloaded, downloadCount } = useDownload()
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  // Close on Escape key
  useEffect(() => {
    if (!isModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setShowMoreInfo(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  if (!isModalOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/70 backdrop-blur-md transition-opacity duration-300"
        onClick={closeModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-espresso/15 bg-white p-4 shadow-2xl transition-all duration-300 sm:p-7">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3.5 top-3.5 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-cream hover:bg-butter/50 text-espresso/70 hover:text-espresso transition"
          aria-label="Close dialog"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 pr-10 sm:gap-3">
          <Logo size={38} />
          <div>
            <h2 id="download-modal-title" className="text-lg sm:text-2xl font-semibold tracking-tight text-espresso leading-snug">
              Download MemoFloat
            </h2>
            <p className="text-xs sm:text-sm font-medium text-espresso/60">
              Windows 10 / 11 (64-bit) • Safe & Virus-Free
            </p>
          </div>
        </div>

        {/* Windows Defender SmartScreen Alert Box (Visual Guide) */}
        <div className="mt-4 rounded-2xl border border-blue-900/20 bg-[#0c4a85] p-3.5 sm:p-5 text-white shadow-lg">
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-sky shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              <span className="font-semibold text-sm sm:text-lg tracking-wide text-white">
                Windows protected your PC
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-white/60 px-1.5 py-0.5 rounded bg-white/10 font-mono">
              Notice Preview
            </span>
          </div>

          <div className="mt-2.5 text-xs sm:text-sm leading-relaxed text-blue-100/90">
            <p>
              Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk.
            </p>
          </div>

          {/* Interactive simulator inside the box */}
          <div className="mt-3 rounded-xl bg-black/25 p-2.5 sm:p-3 border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
              <span className="text-[11px] sm:text-xs font-semibold text-butter flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-butter animate-ping" />
                How to run installer:
              </span>
              <button
                type="button"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="text-[11px] sm:text-xs font-bold underline decoration-sky hover:text-sky transition cursor-pointer text-white"
              >
                {showMoreInfo ? '▾ Hide details' : '👉 Step 1: Click "More info"'}
              </button>
            </div>

            {showMoreInfo && (
              <div className="mt-2 pt-2 border-t border-white/10 text-[11px] sm:text-xs space-y-1 text-blue-100">
                <p className="truncate">
                  <strong className="text-white">App:</strong> {DOWNLOAD_FILE_NAME}
                </p>
                <p>
                  <strong className="text-white">Publisher:</strong> MemoFloat Developer (Independent)
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-end gap-1.5 sm:gap-2 pt-1.5">
                  <span className="text-[11px] sm:text-xs text-mint font-bold">
                    Step 2: Click &ldquo;Run anyway&rdquo; ➔
                  </span>
                  <div className="rounded bg-white/20 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white border border-white/30">
                    Run anyway
                  </div>
                  <div className="rounded bg-white/10 px-2.5 py-1 text-[11px] sm:text-xs text-white/60">
                    Don&apos;t run
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Explanation Banner */}
        <div className="mt-3.5 rounded-2xl border border-espresso/10 bg-cream/70 p-3 sm:p-4">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full bg-mint/40 text-espresso font-bold text-sm">
              🛡️
            </div>
            <div className="text-xs sm:text-sm text-espresso/85 space-y-1">
              <p className="font-extrabold text-espresso">
                This is NOT a virus. MemoFloat is 100% safe.
              </p>
              <p className="leading-relaxed text-espresso/70 text-[11px] sm:text-xs">
                This prompt appears solely because MemoFloat is a newly released independent desktop app not yet published in the Microsoft Store. When Windows displays this prompt, simply click <strong className="text-espresso underline">More info</strong> and then <strong className="text-espresso underline">Run anyway</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Download Action Section */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={triggerDownload}
            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 rounded-full bg-espresso px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-lg font-extrabold text-cream shadow-pill transition-all duration-300 hover:scale-105 hover:shadow-lift active:scale-95"
          >
            <svg
              className="h-5 w-5 text-butter transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download MemoFloat (x64)</span>
          </button>

          <p className="mt-2 text-[11px] sm:text-xs font-semibold text-espresso/60 truncate">
            {DOWNLOAD_FILE_NAME} • ~118 MB • Verified Installer
          </p>

          {/* Download Started feedback */}
          {hasDownloaded && (
            <div className="mt-3.5 rounded-xl border border-mint bg-mint/20 p-3 text-center">
              <p className="text-xs sm:text-sm font-extrabold text-espresso flex items-center justify-center gap-1.5">
                <span>✅</span> Download started! Thank you for downloading.
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-espresso/75">
                Once the file completes downloading, run it and click <strong>&ldquo;More info&rdquo; &gt; &ldquo;Run anyway&rdquo;</strong> to start floating your notes!
              </p>
              <div className="mt-1.5 text-[11px] sm:text-xs font-semibold text-espresso/60">
                Total community downloads: <span className="font-extrabold text-espresso">{downloadCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
