// File: src/api/rag.js

import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });
const pinecone = new Pinecone({
  apiKey: import.meta.env.VITE_PINECONE_API_KEY,
  environment: import.meta.env.VITE_PINECONE_ENV,
});

const index = pinecone.Index(import.meta.env.VITE_PINECONE_INDEX);

export async function getEmbedding(query) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query,
  });
  return res.data[0].embedding;
}

export async function retrieveContext(query) {
  const embedding = await getEmbedding(query);
  const results = await index.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });
  return results.matches.map(match => match.metadata.text).join("\n");
}

export async function generateAnswer(query) {
  const context = await retrieveContext(query);
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `Based on this context:\n${context}\n\nQuestion: ${query}` },
    ],
  });
  return res.choices[0].message.content;
}
