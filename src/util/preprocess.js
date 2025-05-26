export function preprocessText(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, '') 
      .replace(/\s+/g, ' ') 
      .trim();
  }
  