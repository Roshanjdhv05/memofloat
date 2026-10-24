/**
 * Central place for links and asset helpers.
 *
 * DOWNLOAD_URL / SUPPORT_URL are placeholders: no real destinations were
 * provided, so they point at "#". Replace them with your real download page,
 * support email (e.g. "mailto:support@yourdomain.com") and legal pages.
 */
export const DOWNLOAD_URL = '#'
export const SUPPORT_URL = '#'
export const PRIVACY_URL = '#'
export const TERMS_URL = '#'

/** Section id used by the in-page "Get MemoFloat" buttons (final CTA). */
export const CTA_ID = 'get-memofloat'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
