import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

export default function useAudioPlayer() {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    useEffect(() => {
      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [sound]);
  
    const playSound = async (uri: string): Promise<boolean> => {
      try {
        if (sound) {
          await sound.unloadAsync();
        }
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true },
          (status) => {
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying);
            }
          }
        );
        
        setSound(newSound);
        setIsPlaying(true);
        return true;
      } catch (error) {
        console.error("Failed to play recording", error);
        return false;
      }
    };
  
    const pauseSound = async (): Promise<boolean> => {
      if (!sound) return false;
      
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
        return true;
      } catch (error) {
        console.error("Failed to pause sound", error);
        return false;
      }
    };
  
    const stopSound = async (): Promise<boolean> => {
      if (!sound) return false;
      
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        return true;
      } catch (error) {
        console.error("Failed to stop sound", error);
        return false;
      }
    };
  
    return {
      sound,
      isPlaying,
      playSound,
      pauseSound,
      stopSound,
    };
  }