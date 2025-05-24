import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function askChatGPT(message) {
  try {
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    if (error.response && error.response.status === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    return 'Sorry, an error occurred. Please try again later.';
  }
}