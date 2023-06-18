import { createProxyClientRequest } from './client.js'
import { queryCheckProxy } from './querySchema.js'

export async function enableProxy(endpoint, VITE_PROXY, VITE_PROXY_KEY) {
  const query = queryCheckProxy
  createProxyClientRequest(endpoint, VITE_PROXY_KEY, query)
}