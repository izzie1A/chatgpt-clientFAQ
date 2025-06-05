import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: '********-****-****-****-************'
});


const indexName = 'developer-quickstart-js';
await pc.createIndexForModel({
  name: indexName,
  cloud: 'aws',
  region: 'us-east-1',
  embed: {
    model: 'llama-text-embed-v2',
    fieldMap: { text: 'chunk_text' },
  },
  waitUntilReady: true,
});