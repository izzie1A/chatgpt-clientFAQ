import { OpenAI } from 'openai';
import { Flowe } from '@floweai/node';

// Initialize clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const flowe = new Flowe({
  apiKey: process.env.FLOWE_API_KEY
});

// Knowledge base configuration
const KNOWLEDGE_BASE = 'chatgpt-faq'; // Your Flowe knowledge base name

/**
 * Initialize the RAG system with Flowe
 * @param {Array<{content: string, metadata: object}>} documents - Array of documents to process
 * @returns {Promise<void>}
 */
export async function initializeRAG(documents) {
  try {
    // Process each document
    for (const doc of documents) {
      // Split document into chunks
      const chunks = chunkDocument(doc.content);
      
      // Add chunks to Flowe
      for (const chunk of chunks) {
        await flowe.addDocument(KNOWLEDGE_BASE, {
          content: chunk,
          metadata: doc.metadata
        });
      }
    }
    
    console.log('RAG system initialized successfully');
  } catch (error) {
    console.error('Error initializing RAG:', error);
    throw error;
  }
}

/**
 * Chunk a document into smaller pieces
 * @param {string} content - Document content
 * @returns {string[]} - Array of chunks
 */
function chunkDocument(content) {
  const maxChunkSize = 1000; // Maximum tokens per chunk
  const chunks = [];
  
  // Split by paragraphs
  const paragraphs = content.split('\n\n');
  let currentChunk = '';
  
  paragraphs.forEach(paragraph => {
    if ((currentChunk + paragraph).length <= maxChunkSize) {
      currentChunk += paragraph + '\n\n';
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = paragraph + '\n\n';
    }
  });
  
  // Add the last chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

/**
 * Retrieve relevant context using Flowe's semantic search
 * @param {string} query - User's query
 * @param {number} k - Number of chunks to retrieve
 * @returns {Promise<string[]>}
 */
export async function retrieveContext(query, k = 3) {
  try {
    // Use Flowe's semantic search
    const results = await flowe.search(KNOWLEDGE_BASE, {
      query,
      limit: k
    });

    return results.map(result => result.content);
  } catch (error) {
    console.error('Error retrieving context:', error);
    throw error;
  }
}

/**
 * Generate a response using RAG with Flowe
 * @param {string} query - User's query
 * @returns {Promise<string>}
 */
export async function generateResponse(query) {
  try {
    // Get relevant context
    const context = await retrieveContext(query);
    
    // Format the prompt with context
    const prompt = `You are a helpful assistant. Use the following context to answer the question:

Context:
${context.join('\n\n')}

Question: ${query}

Answer:`;

    // Generate response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that uses provided context to answer questions.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

/**
 * Update existing knowledge base with new documents
 * @param {Array<{content: string, metadata: object}>} documents - New documents to add
 * @returns {Promise<void>}
 */
export async function updateKnowledgeBase(documents) {
  try {
    // First remove existing documents
    await flowe.deleteAllDocuments(KNOWLEDGE_BASE);
    
    // Then add new documents
    await initializeRAG(documents);
    console.log('Knowledge base updated successfully');
  } catch (error) {
    console.error('Error updating knowledge base:', error);
    throw error;
  }
}

// Example usage:
// const documents = [
//   { 
//     content: "Your document content here...",
//     metadata: { source: "faq" }
//   }
// ];
// 
// // Initialize RAG system
// await initializeRAG(documents);
// 
// // Generate response
// const response = await generateResponse("What is your question?");
