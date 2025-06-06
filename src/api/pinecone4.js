import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

// Dummy query
const query = '香港有啲咩景點？';

// Get embedding from OpenAI
async function getEmbedding(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return res.data[0].embedding;
}

// Search and rerank (assuming you have a vector index set up)
async function searchAndRerank(queryText) {
  const queryEmbedding = await getEmbedding(queryText);

  const rerankedResults = await index.searchRecords({
    query: {
      topK: 10,
      vector: queryEmbedding,
    },
    rerank: {
      model: 'bge-reranker-v2-m3',
      topN: 10,
      rankFields: ['chunk_text'],
    },
  });

  rerankedResults.result.hits.forEach(hit => {
    console.log(`id: ${hit.id}, score: ${hit.score.toFixed(2)}, text: ${hit.fields.chunk_text}, category: ${hit.fields.category}`);
  });
}

searchAndRerank(query);
