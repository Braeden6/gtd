import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormState {
  text: string | null;
  imageUri: string | null;
  recordingUri: string | null;
  
  // Actions
  setText: (text: string | null) => void;
  setImageUri: (uri: string | null) => void;
  setRecordingUri: (uri: string | null) => void;
  
  // Reset functionality
  resetForm: () => void;
  resetText: () => void;
  resetImage: () => void;
  resetRecording: () => void;

  // helper functions
  isEmpty: () => boolean;
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      text: null,
      imageUri: null,
      recordingUri: null,
      
      setText: (text) => set({ text }),
      setImageUri: (imageUri) => set({ imageUri }),
      setRecordingUri: (recordingUri) => set({ recordingUri }),
      
      resetForm: () => set({ text: null, imageUri: null, recordingUri: null }),
      resetText: () => set({ text: null }),
      resetImage: () => set({ imageUri: null }),
      resetRecording: () => set({ recordingUri: null }),

      isEmpty: () => {
        const { text, imageUri, recordingUri } = get();
        return !text && !imageUri && !recordingUri;
      }
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);