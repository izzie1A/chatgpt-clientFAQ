// utils/embedding.js
import axios from 'axios';
import { preprocessText } from './preprocess';

export async function getEmbedding(text) {
  const cleaned = preprocessText(text);

  const response = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
      input: cleaned,
      model: 'text-embedding-ada-002',
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.data[0].embedding;
}
