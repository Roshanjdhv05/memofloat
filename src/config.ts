/**
 * Central place for links and asset helpers.
 */
export const DOWNLOAD_FILE_NAME = 'MemoFloat-Setup-1.0.0-x64.exe'
export const DOWNLOAD_URL = `${import.meta.env.BASE_URL}product/${DOWNLOAD_FILE_NAME}`
export const SUPPORT_URL = '#'
export const PRIVACY_URL = '#'
export const TERMS_URL = '#'

/** Section id used by the in-page "Get MemoFloat" buttons (final CTA). */
export const CTA_ID = 'get-memofloat'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
