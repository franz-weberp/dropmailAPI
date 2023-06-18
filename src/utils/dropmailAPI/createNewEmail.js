import { gql } from 'graphql-request';
import { endpoint, VITE_PROXY_KEY } from '@utils/dropmailAPI/config.js';
import { createClientRequest } from './client.js'
import { queryCreateEmail } from './querySchema.js'

export async function createNewEmail() {
  const query = gql`${queryCreateEmail}`
  const client = createClientRequest(endpoint, VITE_PROXY_KEY, query)

  try {
    const data = await client.request(query)

    return {
      id: data.introduceSession.id,
      expiresAt: data.introduceSession.expiresAt,
      address: data.introduceSession.addresses[0].address,
    }
  } 
  catch (error) { throw 'Error on CreateNewEmail: ' + error }
}