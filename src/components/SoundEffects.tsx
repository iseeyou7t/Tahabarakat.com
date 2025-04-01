
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const SoundEffects = () => {
  const [muted, setMuted] = useState(true);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const buttonSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements
    bgMusicRef.current = new Audio("/ambient-music.mp3");
    buttonSoundRef.current = new Audio("/click-sound.mp3");
    
    if (bgMusicRef.current) {
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.2;
    }
    
    if (buttonSoundRef.current) {
      buttonSoundRef.current.volume = 0.3;
    }
    
    // Add click sound to all buttons
    const addButtonSounds = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('click', playButtonSound);
      });
    };
    
    const playButtonSound = () => {
      if (!muted && buttonSoundRef.current) {
        buttonSoundRef.current.currentTime = 0;
        buttonSoundRef.current.play().catch(err => console.log("Audio play error:", err));
      }
    };
    
    // Initial setup
    addButtonSounds();
    
    // Set up mutation observer to add sounds to new buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const buttons = node.querySelectorAll('button');
              buttons.forEach(button => {
                button.addEventListener('click', playButtonSound);
              });
            }
          });
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
      observer.disconnect();
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.removeEventListener('click', playButtonSound);
      });
    };
  }, [muted]);
  
  const toggleSound = () => {
    setMuted(!muted);
    if (muted) {
      bgMusicRef.current?.play().catch(err => console.log("Audio play error:", err));
    } else {
      bgMusicRef.current?.pause();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full bg-background/80 backdrop-blur-sm"
        onClick={toggleSound}
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default SoundEffects;
