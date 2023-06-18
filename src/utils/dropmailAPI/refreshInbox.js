import { gql } from 'graphql-request'
import { endpoint, VITE_PROXY_KEY } from '@utils/dropmailAPI/config.js'
import { retry } from './retry.js'
import { createClientRequest } from './client.js'
import { queryRefresh } from './querySchema.js'

export async function refreshInbox(sessionId) {
  const query = gql`${queryRefresh(sessionId)}`
  const client = createClientRequest(endpoint, VITE_PROXY_KEY, query)

  const requestEndopoint = async () => {
    const data = await client.request(endpoint, query, { id: sessionId })
    return data.session
  }

  try { return await retry(requestEndopoint) } 
  catch (error) {
    if (error.response && error.response.status === 431) { window.location.reload() }
    if (error.response && error.response.status === 502) { throw new Error('Bad Gateway: The server encountered an issue.') }
    if (error.response && error.response.errors) {
      const sessionNotFound = error.response.errors.find((e) => e.extensions && e.extensions.code === 'resolver_error')
      if (sessionNotFound) {
        window.location.reload()
        throw new Error('session_not_found')
      }
    }

    throw new Error('An error occurred while refreshing the inbox session.')
  }
}