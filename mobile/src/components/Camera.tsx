import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef } from "react";
import { Dimensions, Platform, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Camera, Trash2 } from "lucide-react-native";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./ui/button";

interface CameraComponentProps {
  setCapturedImage: (image: string | null) => void;
  capturedImage: string | null;
}

export default function CameraComponent({ setCapturedImage, capturedImage }: CameraComponentProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View className="p-4">
        <Text className="text-center mb-4">
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    setCapturedImage(photo?.uri || null);
  };

  return (
    <View className="p-4">
    {capturedImage ? 
      <View>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline'>
              <Image
                source={{ uri: capturedImage }}
                className="w-32 h-32 rounded-lg bg-gray-200"
                contentFit="cover"
                placeholder="Loading..."
                transition={200}
                style={{ width: 128, height: 128 }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side={Platform.OS === 'web' ? 'bottom' : 'top'}
            insets={contentInsets}
            className='w-80'
          >
            <View className="p-8">
              <Image
                source={{ uri: capturedImage }}
                contentFit="contain"
                placeholder="Loading..."
                transition={200}
                style={{ 
                  width: Dimensions.get('window').width * 0.70,
                  height: Dimensions.get('window').height * 0.55
                }}
              />
            </View>
          </PopoverContent>
        </Popover>
        <Pressable 
              onPress={() => setCapturedImage(null)}
              className="mt-4 p-2 rounded-full bg-red-500/10"
            >
              <Trash2 size={24} color="#ef4444" />
        </Pressable>
      </View> : 
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost'>
          <Camera size={30} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[100vw] h-[80vh]"
        >
          <View className="w-[100vw] h-[80vh]">
            <CameraView
              ref={cameraRef}
              mode="picture"
              facing="back"
            >
              <View className="w-full h-full">
              </View>
            </CameraView>
            <Pressable 
                  onPress={takePicture}
                  className="absolute bottom-[12vh] left-1/2 bg-gray-800/50 rounded-full p-4 -translate-x-1/2"
                >
                  <Camera size={30} />
                </Pressable>
          </View>
        </PopoverContent>
      </Popover>
    }
    </View>
  );
}