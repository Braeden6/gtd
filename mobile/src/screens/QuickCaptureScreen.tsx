import React, { useEffect, useState } from 'react';
import { t } from '../translations';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Mic, Play, StopCircle } from 'lucide-react-native';
import DefaultLayout from '../layouts/default';
import { useRecord } from '../hooks/useRecord';
import Camera from '../components/Camera';
import { API_URL } from '@env';

export default function QuickCaptureScreen() {
  const { handleRecordPress, recording, playRecording, isRecording } = useRecord();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    const formData = new FormData();
    formData.append('note', text);
    
    setIsSubmitting(true);
    try {
      if (recording) {
        const uri = recording.getURI();
        if (!uri) return;
        // @ts-ignore
        formData.append('audio', {
          uri: uri,
          type: 'audio/x-m4a',
          name: 'recording.m4a'
        });
      }

      if (capturedImage) {
        // @ts-ignore
        formData.append('image', {
          uri: capturedImage,
          type: 'image/jpeg',
          name: 'image.jpg'
        });
      }
      
      await fetch(`${API_URL}/api/inbox/quick-capture`, {
        method: 'POST',
        body: formData,
      });
      setText('');
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1 bg-white"
          keyboardShouldPersistTaps="handled"
        >
          <View className="p-6">
            {/* Header */}
            <Text className="text-2xl font-bold text-gray-900 mb-6">
              {t('screens.quickCapture.title', 'Capture Thought')}
            </Text>

            <Camera 
              setCapturedImage={setCapturedImage}
              capturedImage={capturedImage}
            />            

            {/* Voice Recording Section */}
            <View>
              <View className="flex-row justify-center gap-4">
                <TouchableOpacity
                  onPress={handleRecordPress}
                  className="w-16 h-16 rounded-full items-center justify-center bg-red-100"
                >
                  {isRecording ? <StopCircle 
                    size={24} 
                    color="#EF4444"
                  /> : <Mic 
                    size={24} 
                    color="#374151"
                  />}
                </TouchableOpacity>

                {!isRecording && recording && (
                  <TouchableOpacity
                    onPress={playRecording}
                    className="w-16 h-16 rounded-full items-center justify-center bg-green-100"
                  >
                    <Play 
                      size={24} 
                      color="#22C55E"
                    />
                  </TouchableOpacity>
                )}
              </View>

              
              
              {/* Text Area for transcription/notes */}
              <View className="mt-4 border border-gray-300 rounded-lg h-48 p-3">
                <TextInput
                  multiline
                  value={text}
                  onChangeText={setText}
                  className="flex-1 text-gray-600"
                  placeholder={t('screens.quickCapture.placeholder', 'What\'s on your mind?')}
                  textAlignVertical="top"
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting || !text.trim()}
                className={`mt-4 rounded-lg p-4 ${
                  isSubmitting || !text.trim() ? 'bg-gray-300' : 'bg-blue-500'
                }`}
              >
                <Text className={`text-center font-medium ${
                  isSubmitting || !text.trim() ? 'text-gray-500' : 'text-white'
                }`}>
                  {isSubmitting 
                    ? t('common.submitting', 'Submitting...') 
                    : t('common.submit', 'Submit')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      
    </DefaultLayout>
  );
}