import { GraphQLClient } from 'graphql-request'

export function createClientRequest (endpoint, VITE_PROXY_KEY, query) {
  const clientRequest = new GraphQLClient(endpoint, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-cors-api-key': VITE_PROXY_KEY,
    },
    body: JSON.stringify({ query }),
  })

  return clientRequest
}

export async function createProxyClientRequest(endpoint, VITE_PROXY_KEY, query) {
  const chunkSize = 200
  const chunks = query.match(new RegExp(`.{1,${chunkSize}}`, 'g'))

  let data = []
  let currentIndex = 0

  const fetchDataChunk = async () => {
    const currentChunk = chunks[currentIndex]

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cors-api-key': VITE_PROXY_KEY,
      },
      body: JSON.stringify({ query: currentChunk }),
    })

    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json()
      data.push(responseData)
    } 
    else { throw new Error('Invalid JSON response') }
  }

  const processChunks = async () => {
    if (currentIndex < chunks.length) {
      await fetchDataChunk()
      currentIndex++
      await processChunks()
    }
  }

  try {
    await processChunks()
    return data.flatMap((response) => response.data.domains)
  } 
  catch (error) { throw error }
}
