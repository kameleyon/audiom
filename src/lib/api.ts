import axios from 'axios';

const API_KEYS = {
  playHt: {
    userId: '3I0uk4sKefXqOKsu6Yb9DDIfGrg1',
    apiKey: '2e59efb31687482a99b33bfaa210e886',
  },
  openRouter: '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',
};

export interface Voice {
  id: string;
  name: string;
  language: string;
  gender: string;
}

const mockVoices: Voice[] = [
  { id: 'us-michael', name: 'Michael', language: 'en-US', gender: 'male' },
  { id: 'us-axel', name: 'Axel', language: 'en-US', gender: 'male' },
  { id: 'us-aaliyah', name: 'Aaliyah', language: 'en-US', gender: 'female' },
  { id: 'us-eileen', name: 'Eileen', language: 'en-US', gender: 'female' },
  { id: 'uk-earle', name: 'Earle', language: 'en-GB', gender: 'male' },
  { id: 'uk-mark', name: 'Mark', language: 'en-GB', gender: 'male' },
  { id: 'uk-eleanor', name: 'Eleanor', language: 'en-GB', gender: 'female' },
  { id: 'uk-micah', name: 'Micah', language: 'en-GB', gender: 'female' },
];

export async function getVoices(): Promise<Voice[]> {
  // For development, return mock voices
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockVoices), 1000);
  });
}

export async function generateContent(topic: string, contentType: string, style: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are an expert content creator specializing in ${contentType} with a ${style} style.`,
          },
          {
            role: 'user',
            content: `Create a ${contentType} about ${topic} in a ${style} style. Include natural pauses and speech patterns.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEYS.openRouter}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Content generation error:', error);
    throw new Error('Failed to generate content');
  }
}

export interface AudioResponse {
  url: string;
}

export async function generateAudio(text: string, voice: Voice): Promise<AudioResponse> {
  try {
    // For development, return a sample audio URL
    // In production, this would call the Play.ht API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav' // Sample audio for testing
        });
      }, 2000);
    });
  } catch (error) {
    console.error('Audio generation error:', error);
    throw new Error('Failed to generate audio');
  }
}