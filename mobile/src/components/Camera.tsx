import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Camera, Trash2, ArrowLeft, Maximize2 } from "lucide-react-native";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { t } from '../translations';
// import { Button } from "./ui/button";

interface CameraComponentProps {
  setCapturedImage: (image: string | null) => void;
  capturedImage: string | null;
}

export default function CameraComponent({ setCapturedImage, capturedImage }: CameraComponentProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const triggerRef = useRef<any>(null);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View className="p-4">
        <Text className="text-center mb-4">
          {t('components.camera.permission', 'We need your permission to use the camera')}
        </Text>
        {/* <Button onPress={requestPermission} /> */}
      </View>
    );
  }

  const handleBackPress = () => {
    triggerRef.current?.close();
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    setCapturedImage(photo?.uri || null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild ref={triggerRef}> 
        {capturedImage ? 
        <Pressable className="flex-row justify-center items-center">
          <Image
            source={{ uri: capturedImage }}
            className="w-32 h-32 rounded-lg bg-gray-200"
            contentFit="cover"
            placeholder="Loading..."
            transition={200}
            style={{ 
              width: Dimensions.get('window').width * 0.3,
              height: Dimensions.get('window').height * 0.2
            }}
          />
          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Maximize2 size={30} color="#1E1C1CB0"/>
          </View>
        </Pressable> :
        <View></View>
          // <Button className="flex-row justify-center items-center gap-4 bg-blue-400 w-1/2 mx-auto">
          //   <Camera size={35} strokeWidth={2} color="#000" />
          //   <Text className="text-2xl font-bold">{t('components.camera.photo', 'Photo')}</Text>
          // </Button>
        }
      </PopoverTrigger>
      <PopoverContent
        className="p-0 m-0 border-0"
      >
          {capturedImage ? 
            <Image
              source={{ uri: capturedImage }}
              contentFit="contain"
              placeholder="Loading..."
              transition={200}
              style={{ 
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }}
            />:
            <CameraView
              ref={cameraRef}
              mode="picture"
              facing="back"
            >
              <View className="w-[100vw] h-[100vh]"/>
            </CameraView>
          }

          <Pressable 
            onPress={handleBackPress}
            className="absolute top-20 left-5 bg-gray-200/20 rounded-full p-2"
          >
            <ArrowLeft size={50} color="#000" strokeWidth={2} />
          </Pressable>

          <View className="absolute bottom-0 left-0 w-full h-[16vh] bg-gray-600/40 ">
            {capturedImage ? 
              <Pressable
                onPress={() => setCapturedImage(null)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Trash2 size={50} color="#000" />
              </Pressable>:
              <Pressable 
                onPress={takePicture}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/4"
              >
              <View className="w-[72px] h-[72px] rounded-full border-4 border-white flex items-center justify-center">
                <View className="w-[62px] h-[62px] rounded-full bg-white" />
              </View>
            </Pressable>}
            
          </View>
      </PopoverContent>
    </Popover>
  );
}