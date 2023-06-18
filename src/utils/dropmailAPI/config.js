import { enableProxy } from './enableProxy.js';
import {
  VITE_PROXY,
  VITE_PROXY_KEY,
  VITE_DROPMAIL_API_ENDPOINT,
  VITE_DROPMAIL_API_TOKEN
} from '@env/env.js';

const endpoint = `${VITE_PROXY}/${VITE_DROPMAIL_API_ENDPOINT}/${VITE_DROPMAIL_API_TOKEN}`

enableProxy(endpoint, VITE_PROXY, VITE_PROXY_KEY)
  .then(domains => { console.log('Proxy enabled domains ', domains) })
  .catch(error => { console.log('Failed to enable proxy: ', error) })

export { endpoint, VITE_PROXY, VITE_PROXY_KEY };