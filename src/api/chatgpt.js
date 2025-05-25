import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const MAX_RETRIES = 3; // 最大重試次數
const BASE_DELAY = 2000; // 基礎延遲時間（毫秒）

// 獲取帶有退避的延遲時間
const getDelay = (attempt) => Math.min(BASE_DELAY * Math.pow(2, attempt), 30000);

export async function askChatGPT(message) {
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // 如果不是第一次嘗試，等待一段時間
      if (attempt > 0) {
        const delay = getDelay(attempt - 1);
        console.log(`Retry ${attempt}/${MAX_RETRIES} after ${delay}ms delay...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
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
          },
          timeout: 30000 // 設置請求超時時間（毫秒）
        }
      );
      
      return response.data.choices[0].message.content;
      
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      
      // 如果不是 429 錯誤或者是重試的最後一次，直接返回錯誤
      if (error.response?.status !== 429 || attempt === MAX_RETRIES - 1) {
        break;
      }
    }
  }
  
  // 處理最終錯誤
  if (lastError?.response?.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  
  console.error('最終錯誤:', lastError);
  return 'Sorry, an error occurred. Please try again later.';
}

// 在 chatgpt.js 文件底部添加
export async function testAPIKey() {
  try {
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      }
    });
    console.log('API Key 連接成功！可用的模型:', response.data.data.map(m => m.id));
    return true;
  } catch (error) {
    console.error('API Key 連接失敗:', error.response?.data?.error || error.message);
    return false;
  }
}