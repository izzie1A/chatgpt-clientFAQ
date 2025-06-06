const docs = [
    {
      id: 'doc-001',
      text: '香港係一個國際金融中心，有好多跨國企業同埋金融機構。',
    },
    {
      id: 'doc-002',
      text: '維多利亞港係香港最著名嘅景點之一，夜景非常壯觀。',
    },
  ];
  
  import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

async function getEmbedding(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return res.data[0].embedding;
}

// Search the dense index and rerank results
const rerankedResults = await index.searchRecords({
    query: {
      topK: 10,
      inputs: { text: query },
    },
    rerank: {
      model: 'bge-reranker-v2-m3',
      topN: 10,
      rankFields: ['chunk_text'],
    },
  });
  
  // Print the reranked results
  rerankedResults.result.hits.forEach(hit => {
    console.log(`id: ${hit.id}, score: ${hit.score.toFixed(2)}, text: ${hit.fields.chunk_text}, category: ${hit.fields.category}`);
  });