import { createContext, useContext, useState, ReactNode } from 'react';
import { generateContent, generateAudio } from '@/lib/api';
import type { Voice } from '@/lib/api';

interface AudioContextType {
  content: string;
  audioUrl: string | null;
  isGeneratingContent: boolean;
  isGeneratingAudio: boolean;
  error: string | null;
  generateAudioContent: (topic: string, contentType: string, narrativeStyle: string) => Promise<void>;
  convertTextToAudio: (text: string, voice: Voice) => Promise<void>;
  setContent: (content: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAudioContent = async (topic: string, contentType: string, narrativeStyle: string) => {
    setIsGeneratingContent(true);
    setError(null);
    try {
      const generatedContent = await generateContent(topic, contentType, narrativeStyle);
      setContent(generatedContent);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
      setError(errorMessage);
      throw error;
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const convertTextToAudio = async (text: string, voice: Voice) => {
    setIsGeneratingAudio(true);
    setError(null);
    try {
      const audioData = await generateAudio(text, voice);
      setAudioUrl(audioData.url);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate audio';
      setError(errorMessage);
      throw error;
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        content,
        audioUrl,
        isGeneratingContent,
        isGeneratingAudio,
        error,
        generateAudioContent,
        convertTextToAudio,
        setContent,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}