import React, { useState } from 'react';
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
import DefaultLayout from '../layouts/default';
import { useRecord } from '../hooks/useRecord';
import Camera from '../components/Camera';
import { API_URL } from '@env';
import { Record } from '../components/Record';
import { useAuth } from '../context/AuthContext';
import { Button, ButtonText } from '../components/ui/button';
import { Box } from '../components/ui/box';
import { useTheme } from '../context/ThemeContext';

export default function QuickCaptureScreen() {
  const { deleteRecording, recordingUri } = useRecord();
  const { toggleTheme, isDarkMode } = useTheme();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userInfo, logout } = useAuth();

  const isDisabled = () => {
    return isSubmitting || (!text.trim() && !recordingUri && !capturedImage);
  }

  const handleSubmit = async () => {
    if (isDisabled()) return;
    const formData = new FormData();
    formData.append('note', text);
    
    setIsSubmitting(true);
    try {
      if (recordingUri) {
        // @ts-ignore
        formData.append('audio', {
          uri: recordingUri,
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
      setCapturedImage(null);
      await deleteRecording();
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
        className="flex-1 pt-20"
      >
        <ScrollView 
          className="flex-1 bg-test-0"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 gap-10">

          <TouchableOpacity
            onPress={logout}
          >
            <Text >
            logout
            </Text>
          </TouchableOpacity>

            {/* Header */}
            <Text className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {t('screens.quickCapture.title', 'Log your thoughts')}
            </Text>

            {/* <Camera 
              setCapturedImage={setCapturedImage}
              capturedImage={capturedImage}
            />    */}



            {/* <Record/> */}
              <View className="mt-4 border border-gray-300 rounded-lg h-48 p-4 mx-4">
                <TextInput
                  multiline
                  value={text}
                  onChangeText={setText}
                  // className="flex-1 text-gray-600"
                  placeholder={t('screens.quickCapture.placeholder', 'Type here...')}
                  textAlignVertical="top"
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isDisabled()}
                className={`mt-4 rounded-lg p-4 w-1/2 mx-auto ${
                  isDisabled() ? 'bg-gray-300' : 'bg-blue-500'
                }`}
              >
                <Text className={`text-center font-medium ${
                  isDisabled() ? 'text-gray-500' : 'text-white'
                }`}>
                  {isSubmitting 
                    ? t('common.submitting', 'Submitting...') 
                    : t('common.submit', 'Submit')}
                </Text>
              </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      
    </DefaultLayout>
  );
}