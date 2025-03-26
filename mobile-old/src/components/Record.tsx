import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Mic, Play, Pause, StopCircle, Trash2 } from 'lucide-react-native';
import { useRecord } from '../hooks/useRecord';

export function Record() {
  const { 
    handleRecordStopStart, 
    recording, 
    handlePressPlayPause, 
    isRecording, 
    deleteRecording,
    isPlaying
  } = useRecord();

  return (
    <View className="flex-row justify-center gap-4">
      <TouchableOpacity
        onPress={handleRecordStopStart}
        className={`w-16 h-16 rounded-full items-center justify-center ${
          isRecording ? 'bg-red-500' : 'bg-red-100'
        }`}
      >
        {isRecording ? (
          <StopCircle size={24} color="#FFFFFF" />
        ) : (
          <Mic size={24} color={recording ? "#EF4444" : "#374151"} />
        )}
      </TouchableOpacity>

      {!isRecording && recording && (
          <>
            <TouchableOpacity
              onPress={handlePressPlayPause}
              className={`w-16 h-16 rounded-full items-center justify-center ${
                isPlaying ? 'bg-green-500' : 'bg-green-100'
              }`}
            >
              {isPlaying ? (
                <Pause size={24} color="#FFFFFF" />
              ) : (
                <Play size={24} color="#22C55E" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={deleteRecording}
              className="w-16 h-16 rounded-full items-center justify-center bg-gray-100"
            >
              <Trash2 size={24} color="#374151" />
            </TouchableOpacity>
          </>
        )}
    </View>
  );
}