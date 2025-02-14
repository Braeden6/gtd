import { useState } from 'react';
import { Audio } from 'expo-av';

export const useRecord = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    const audioPermission = await Audio.requestPermissionsAsync();

    if (!audioPermission.granted) {
      console.warn("Permissions not granted");
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false, // This is important
      // interruptionModeIOS: Audio,
      shouldDuckAndroid: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
  
    const newRecording = new Audio.Recording();
    try {
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
    setIsRecording(false);
  };

  const handleRecordPress = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playRecording = async () => {
    if (recording) {
      try {
        const uri = recording.getURI();
        if (!uri) return;
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        await newSound.playAsync();
      } catch (error) {
        console.error("Failed to play recording", error);
      }
    }
  };

  return {
    handleRecordPress,
    recording,
    playRecording,
    isRecording,
  };
};
