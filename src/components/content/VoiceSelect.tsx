import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { getVoices, type Voice } from '@/lib/api';

interface VoiceSelectProps {
  selectedVoice: Voice | null;
  onVoiceSelect: (voice: Voice | null) => void;
  disabled?: boolean;
}

export function VoiceSelect({ selectedVoice, onVoiceSelect, disabled }: VoiceSelectProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadVoices() {
      try {
        setIsLoading(true);
        setError(null);
        const voiceList = await getVoices();
        
        if (mounted) {
          setVoices(voiceList);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load voices');
          setIsLoading(false);
        }
      }
    }

    loadVoices();

    return () => {
      mounted = false;
    };
  }, []);

  const handleVoiceChange = (value: string) => {
    const voice = voices.find(v => v.id === value) || null;
    onVoiceSelect(voice);
  };

  return (
    <Select
      value={selectedVoice?.id || ''}
      onValueChange={handleVoiceChange}
      disabled={disabled || isLoading}
    >
      <SelectTrigger 
        className="flex-1 bg-[#1a2836]/30 text-[#c1e8e6] border-[#c1e8e6]/20 hover:bg-[#1a2836]/50 hover:border-[#c1e8e6]/30 rounded-2xl"
      >
        <SelectValue placeholder="Voice avatar">
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading voices...
            </div>
          ) : selectedVoice?.name || 'Select voice'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-[#1a2836] border-[#c1e8e6]/20">
        {error ? (
          <SelectItem value="error" disabled className="text-red-400">
            {error}
          </SelectItem>
        ) : voices.map((voice) => (
          <SelectItem
            key={voice.id}
            value={voice.id}
            className="text-[#c1e8e6] hover:bg-[#c1e8e6]/10"
          >
            {voice.name} ({voice.language.includes('en-US') ? 'US' : 'UK'})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}