import { Pinecone } from '@pinecone-database/pinecone'
import faqData from '../assets/logistics_faq_raw.json';


const pc = new Pinecone({ apiKey: import.meta.env.PINECONE_API_KEY });
const assistantName = 'example-assistant';
const assistant = pc.Assistant(assistantName);

await assistant.uploadFile({
  path: faqData
});


