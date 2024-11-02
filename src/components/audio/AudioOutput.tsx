import { useAudio } from '@/contexts/AudioContext';
import { AudioPlayer } from './AudioPlayer';

export function AudioOutput() {
  const { audioUrl } = useAudio();

  if (!audioUrl) {
    return (
      <div className="mt-8 p-6 bg-[#1a2836]/30 rounded-2xl border border-[#c1e8e6]/20">
        <p className="text-gray-400 text-center">No audio generated yet</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-[#1a2836]/30 rounded-2xl border border-[#c1e8e6]/20">
      <h2 className="text-2xl font-semibold mb-6 text-[#c1e8e6]">Generated Audio Output</h2>
      <AudioPlayer />
    </div>
  );
}