import { Audio } from 'expo-av';
import { useState } from 'react';
import { useFormStore } from './useLogForm';

export type RecordingState = "empty" | "recording" | "playing" | "paused";

export default function useAudioRecorder() {
  const [permission, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const { setRecordingUri } = useFormStore();

  const startRecording = async (): Promise<boolean> => {
    if (!permission) return false;
    
    if (!permission?.canAskAgain) {
      return false;
    }
    
    if (!permission?.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) return false;
    }
    
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
    
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      return true;
    } catch (error) {
      console.error("Failed to start recording", error);
      return false;
    }
  };

  const stopRecording = async (): Promise<string | null> => {
    if (!recording) return null;
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) setRecordingUri(uri);
      return uri;
    } catch (error) {
      console.error("Failed to stop recording", error);
      return null;
    } finally {
      setRecording(null);
    }
  };

  return {
    permission,
    recording,
    startRecording,
    stopRecording,
  };
}