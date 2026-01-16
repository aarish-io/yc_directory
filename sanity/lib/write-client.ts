"server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
})

if(!writeClient.config().token){
    console.warn('Sanity client is missing a token - write operations will not work')
}