import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Mic, Upload } from 'lucide-react';
import { VoiceSelect } from './VoiceSelect';
import { AudioOutput } from '../audio/AudioOutput';
import { useAudio } from '@/contexts/AudioContext';
import { CONTENT_TYPES, NARRATIVE_STYLES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Voice } from '@/lib/api';

export function ContentCreator() {
  const {
    content,
    setContent,
    generateAudioContent,
    convertTextToAudio,
    isGeneratingContent,
    isGeneratingAudio,
    error: contextError
  } = useAudio();
  
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('');
  const [narrativeStyle, setNarrativeStyle] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showAudioOutput, setShowAudioOutput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!topic || !contentType || !narrativeStyle) return;
    
    setError(null);
    try {
      await generateAudioContent(topic, contentType, narrativeStyle);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate content');
    }
  };

  const handleConvertToAudio = async () => {
    if (!content || !selectedVoice) return;
    
    setError(null);
    try {
      await convertTextToAudio(content, selectedVoice);
      setShowAudioOutput(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to convert to audio');
    }
  };

  const handleVoiceSelect = (voice: Voice | null) => {
    setSelectedVoice(voice);
    setIsRecording(false);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4 text-[#c1e8e6]">Transform Your Ideas into Audio</h1>
        <p className="text-lg text-gray-300 mb-8">
          Simply provide your content, choose the desired tone and style, and let AUDIOMAX do the rest. Whether it's a TED Talk,
          story, or guided meditation, you can create engaging audio content in just a few clicks.
        </p>

        {(error || contextError) && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error || contextError}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="flex-1 bg-[#1a2836]/30 text-[#c1e8e6] border-[#c1e8e6]/20 hover:bg-[#1a2836]/50"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload your content
              </Button>
              <span className="text-gray-400">or</span>
            </div>

            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Tell us about your idea..."
              className="min-h-[200px] bg-[#1a2836]/30 text-[#c1e8e6] border-[#c1e8e6]/20 resize-none"
            />

            <div className="flex gap-4">
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="bg-[#1a2836]/30 text-[#c1e8e6] border-[#c1e8e6]/20">
                  <SelectValue placeholder="Select Content Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2836] border-[#c1e8e6]/20">
                  {CONTENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="text-[#c1e8e6]">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={narrativeStyle} onValueChange={setNarrativeStyle}>
                <SelectTrigger className="bg-[#1a2836]/30 text-[#c1e8e6] border-[#c1e8e6]/20">
                  <SelectValue placeholder="Narrative Style" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2836] border-[#c1e8e6]/20">
                  {NARRATIVE_STYLES.map((style) => (
                    <SelectItem key={style} value={style} className="text-[#c1e8e6]">
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <VoiceSelect
                selectedVoice={selectedVoice}
                onVoiceSelect={handleVoiceSelect}
                disabled={isRecording}
              />
              <span className="text-gray-400">or</span>
              <Button
                variant="outline"
                className={cn(
                  "flex-1 bg-[#1a2836]/30 text-[#c1e8e6] border-[#c1e8e6]/20",
                  isRecording && "border-red-500 animate-pulse"
                )}
                onClick={() => setIsRecording(!isRecording)}
                disabled={selectedVoice !== null}
              >
                <Mic className="mr-2 h-5 w-5" />
                Record or Upload Your Voice for Cloning
              </Button>
            </div>

            <Button
              onClick={handleCreate}
              disabled={!topic || !contentType || !narrativeStyle || isGeneratingContent}
              className="w-full bg-[#c1e8e6] text-[#082627] hover:bg-[#a5d8d6]"
            >
              {isGeneratingContent ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                'Create Content'
              )}
            </Button>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {content ? (
              <>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] bg-[#1a2836]/30 text-[#c1e8e6] border-[#c1e8e6]/20 resize-none"
                />
                <Button
                  onClick={handleConvertToAudio}
                  disabled={!selectedVoice || isGeneratingAudio}
                  className="w-full bg-[#c1e8e6] text-[#082627] hover:bg-[#a5d8d6]"
                >
                  {isGeneratingAudio ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    'Convert Text to Audio'
                  )}
                </Button>
              </>
            ) : (
              <div className="min-h-[200px] flex items-center justify-center text-gray-400 bg-[#1a2836]/30 border border-[#c1e8e6]/20">
                Preview will appear here
              </div>
            )}
          </div>
        </div>

        {showAudioOutput && <AudioOutput />}
      </div>
    </div>
  );
}