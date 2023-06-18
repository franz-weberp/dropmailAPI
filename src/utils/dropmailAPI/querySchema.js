export const queryCheckProxy = `query { domains { id name introducedAt availableVia } }`
export const queryCreateEmail = `mutation { introduceSession { id expiresAt addresses { address } } }`

export function queryRefresh(sessionId) {
  return `query { session(id: "${sessionId}") { mails { 
    rawSize, fromAddr, toAddr, downloadUrl, text, headerSubject 
  } } }`
}