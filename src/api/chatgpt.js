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


 function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // 移除標點
    .replace(/\s+/g, ' ')     // 簡化多空格
    .trim();
}
export async function embeddSearchChatGPT(mssage) {
  
  let lastError;
  // const cleaned = preprocessText(message);
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // 如果不是第一次嘗試，等待一段時間
      if (attempt > 0) {
        const delay = getDelay(attempt - 1);
        console.log(`Retry ${attempt}/${MAX_RETRIES} after ${delay}ms delay...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      const response = await axios.post(
        'https://api.openai.com/v1/embeddings',
        {
          input: message,
          model: 'text-embedding-ada-002',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
        }
      );
    
      return response.data.data[0].embedding;
      
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


export async function getTagFromChatGPT(message) {
  let lastError;
  let getTagPrompt = `Extract important keywords from the following question. Focus on keywords that represent customer intent, concerns, or specific topics relevant to a logistics company. Return the result as a string array. \n Question: ${message}`;
  
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
          messages: [{ role: 'user', content: getTagPrompt }],
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

/**
 * Process a file and ask questions about its content using ChatGPT
 * @param {File} file - The file to process
 * @param {string} question - The question to ask about the file content
 * @returns {Promise<string>} - The AI's response
 */
export async function fullSearchData(file, question) {
  let lastError;
  
  // Validate input
  if (!file) {
    throw new Error('No file provided');
  }
  if (!question?.trim()) {
    throw new Error('No question provided');
  }

  // Read the file content
  let fileContent;
  try {
    fileContent = await readFileAsText(file);
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Failed to read file. Please try another file.');
  }

  // Prepare the prompt for ChatGPT
  const prompt = `I have a file named "${file.name}" with the following content:\n\n${fileContent}\n\nQuestion: ${question}\n\nPlease provide a detailed answer based on the file content.`;
  
  // Make the API call with retry logic
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // Add delay for retries
      if (attempt > 0) {
        const delay = getDelay(attempt - 1);
        console.log(`Retry ${attempt}/${MAX_RETRIES} after ${delay}ms delay...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-4', // Using GPT-4 for better file understanding
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that analyzes file contents and answers questions about them.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3, // Lower temperature for more focused responses
          max_tokens: 2000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          timeout: 45000 // Increased timeout for file processing
        }
      );
      
      return response.data.choices[0].message.content;
      
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      
      // If it's not a rate limit error or it's the last attempt, break
      if (error.response?.status !== 429 || attempt === MAX_RETRIES - 1) {
        break;
      }
    }
  }
  
  // Handle final error
  throw lastError || new Error('Failed to process file with ChatGPT');
}

/**
 * Helper function to read file as text
 * @param {File} file - The file to read
 * @returns {Promise<string>} - The file content as text
 */
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        resolve(event.target.result);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    // Read the file as text
    reader.readAsText(file);
  });
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