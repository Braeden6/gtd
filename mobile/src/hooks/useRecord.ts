import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const RECORDING_QUERY_KEY = ['recording'];

export const useRecord = () => {
  const queryClient = useQueryClient();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { data: recordingUri } = useQuery({
    queryKey: RECORDING_QUERY_KEY,
    enabled: true, 
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    if (recordingUri && !recording) {
      setIsRecording(false); 
    }
  }, [recordingUri, recording]);

  const startRecording = async () => {
    const audioPermission = await Audio.requestPermissionsAsync();

    if (!audioPermission.granted) {
      console.warn("Permissions not granted");
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
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
        const uri = recording.getURI();
        if (uri) {
          queryClient.setQueryData(RECORDING_QUERY_KEY, uri);
        }
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
    setIsRecording(false);
  };

  const handleRecordStopStart = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playRecording = async () => {
    const uri = recordingUri || recording?.getURI();
    if (!uri) return;
    
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: uri as string });
      setSound(newSound);
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            setIsPlaying(false);
          } else {
            setIsPlaying(status.isPlaying);
          }
        }
      });
      
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play recording", error);
    }
  };

  const stopPlaying = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      } catch (error) {
        console.error("Failed to stop playing", error);
      }
    }
  };

  const handlePressPlayPause = async () => {
    if (isRecording) {
      await stopRecording();
    }
    
    if (sound) {
      await stopPlaying();
    } else {
      await playRecording();
    }
  };

  const deleteRecording = async () => {
    try {
      if (sound) {
        await stopPlaying();
      }
      
      if (recording) {
        const status = await recording.getStatusAsync();
        if (status?.canRecord) { 
          await recording.stopAndUnloadAsync();
        }
      }
      setRecording(null);
      setSound(null);
      queryClient.setQueryData(RECORDING_QUERY_KEY, null);
    } catch (error) {
      console.error("Failed to delete recording", error);
    }
  };

  return {
    isRecording,
    handleRecordStopStart,
    handlePressPlayPause,
    recording,
    recordingUri,
    deleteRecording,
    isPlaying
  };
};