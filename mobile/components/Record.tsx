import React, { useEffect, useState } from 'react';
import { Mic, Play, Pause, StopCircle, Trash2 } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { useFormStore } from '@/hooks/useLogForm';
import useAudioRecorder, { RecordingState } from '@/hooks/useAudioRecorder';
import useAudioPlayer from '@/hooks/useAudioPlayer';
import { useAlertDialogStore } from '@/hooks/useCustomAlertDialog';

export function Record() {
  const [state, setState] = useState<RecordingState>("empty");
  const { recordingUri, setRecordingUri } = useFormStore();
  const { permission, startRecording, stopRecording } = useAudioRecorder();
  const { playSound, pauseSound } = useAudioPlayer();
  const { openDialog, closeDialog } = useAlertDialogStore();
  
  useEffect(() => {
    if (recordingUri) {
      setState("paused");
    }
  }, [recordingUri]);

  const handleStartRecording = async () => {
    if (!permission?.granted && !permission?.canAskAgain) {
      openDialog({
        title: "Microphone Access Was Denied",
        body: "If you want to use the microphone, please grant access in the settings. Click done once you have granted access.",
        actionText: "Done",
        onAction: () => closeDialog()
      });
      return;
    }
    
    const success = await startRecording();
    if (success) {
      setState("recording");
    }
  };

  const handleStopRecording = async () => {
    await stopRecording();
    setState("paused");
  };

  const handlePlayRecording = async () => {
    if (!recordingUri) return;
    
    const success = await playSound(recordingUri);
    if (success) {
      setState("playing");
    }
  };

  const handlePauseRecording = async () => {
    await pauseSound();
    setState("paused");
  };

  const deleteRecording = () => {
    setRecordingUri(null);
    setState("empty");
  };


  const renderRecordingControls = () => {
    switch (state) {
      case "empty":
        return (
          <Button 
            onPress={handleStartRecording} 
            className="bg-secondary rounded-full w-16 h-16"
            accessibilityLabel="Start recording"
          >
            <Mic />
          </Button>
        );
      case "recording":
        return (
          <Button 
            onPress={handleStopRecording} 
            className="bg-secondary rounded-full w-16 h-16"
            accessibilityLabel="Stop recording"
          >
            <StopCircle />
          </Button>
        );
      case "playing":
      case "paused":
        return (
          <Box className="relative w-[200px] items-center justify-center">
            <Button 
              onPress={state === "playing" ? handlePauseRecording : handlePlayRecording} 
              className="bg-secondary rounded-full w-16 h-16"
              accessibilityLabel={state === "playing" ? "Pause playback" : "Play recording"}
            >
              {state === "playing" ? <Pause /> : <Play />}
            </Button>
            <Button 
              onPress={deleteRecording}
              className="absolute right-0 bottom-0 bg-transparent rounded-full p-0"
              accessibilityLabel="Delete recording"
            >
              <Trash2 className="w-5 h-5 text-secondary" />
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="flex-row justify-center gap-4">
      {renderRecordingControls()}
    </Box>
  );
}