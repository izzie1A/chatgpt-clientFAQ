import { Pinecone } from '@pinecone-database/pinecone'
import faqData from '../assets/logistics_faq_raw.json';


const pc = new Pinecone({ apiKey: import.meta.env.PINECONE_API_KEY });
const assistantName = 'example-assistant';
const assistant = pc.Assistant(assistantName);

await assistant.uploadFile({
  path: faqData
});


console.log('Uploaded file to the assistant at Pinecone');

const chatResp = await assistant.chat({
  messages: [{ role: 'user', content: 'Who is the CFO of Netflix?' }],
});
console.log(chatResp);