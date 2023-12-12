// apiService.js

const API_BASE_URL = 'http://localhost:3000/api';

export const addLanguage = async (language:string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/language/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Failed to add language: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error adding language:', error);
    throw error;
  }
};

export const addTranslation = async (language:string, translationKey:string, value:string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/translation/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language, translationKey, value }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Failed to add translation: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error adding translation:', error);
    throw error;
  }
};

export const getLanguage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/language/get`);
  
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Failed to get languages: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error getting languages:', error);
      throw error;
    }
  };
export const getTranslations = async (language:string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/translation/get?language=${language}`);

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Failed to get translations: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error getting translations:', error);
    throw error;
  }
};

export const updateTranslation = async (language:string, translationKey:string, value:string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/translation/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language, translationKey, value }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Failed to update translation: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating translation:', error);
    throw error;
  }
};
