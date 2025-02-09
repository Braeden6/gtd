import { AudioService } from '@/api/generated';
import { useState, useRef } from 'react';

export default function QuickCapture() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      // const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      // if (isIOS && window.location.protocol !== 'https:') {
      //   alert('Audio recording requires HTTPS on iOS devices. Please access this page through a secure connection.');
      //   return;
      // }

      
      // if (!navigator.mediaDevices?.getUserMedia) {
      //   throw new Error('Media Devices API not supported. Please ensure you are using a modern browser with HTTPS.');
      // }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create download link
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'recording.mp3';
        a.click();
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      let errorMessage = 'Could not access microphone. ';
      
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          errorMessage += 'Please grant microphone permission in your browser settings.';
        } else if (err.name === 'NotFoundError') {
          errorMessage += 'No microphone detected.';
        } else if (err.name === 'NotSupportedError') {
          errorMessage += 'Audio recording is not supported in this browser.';
        }
      }
      
      alert(errorMessage);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Wait for the ondataavailable and onstop events to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Create a blob from the recorded chunks
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/mp3' });

      try {
        const response = await AudioService.postAudioUpload(audioBlob);
        console.log('Upload successful:', response);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload recording');
      }

      setIsRecording(false);
    }
  };

  return (
    <div>
      <h1>Quick Capture 1</h1>
      <button 
        onClick={isRecording ? stopRecording : startRecording}
        style={{ padding: '12px', margin: '10px' }}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}