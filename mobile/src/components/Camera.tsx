import {
    CameraMode,
    CameraType,
    CameraView,
    useCameraPermissions,
  } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
  
  export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [mode, setMode] = useState<CameraMode>("picture");
    const [facing, setFacing] = useState<CameraType>("back");
    const [recording, setRecording] = useState(false);
  
    if (!permission) {
      return null;
    }
  
    if (!permission.granted) {
      return (
        <View>
          <Text style={{ textAlign: "center" }}>
            We need your permission to use the camera
          </Text>
          <Button onPress={requestPermission} title="Grant permission" />
        </View>
      );
    }
  
    const takePicture = async () => {
      const photo = await ref.current?.takePictureAsync();
      setUri(photo?.uri || null);
    };
  
    const recordVideo = async () => {
      if (recording) {
        setRecording(false);
        ref.current?.stopRecording();
        return;
      }
      setRecording(true);
      const video = await ref.current?.recordAsync();
      console.log({ video });
    };
  
    const toggleMode = () => {
      setMode((prev) => (prev === "picture" ? "video" : "picture"));
    };
  
    const toggleFacing = () => {
      setFacing((prev) => (prev === "back" ? "front" : "back"));
    };
  
    const renderPicture = () => {
      return (
        <View>
          <Image
            source={{ uri }}
            contentFit="contain"
            style={{ width: 300, aspectRatio: 1 }}
          />
          <Button onPress={() => setUri(null)} title="Take another picture" />
        </View>
      );
    };
  
    const renderCamera = () => {
      return (
        <CameraView
          ref={ref}
          mode={mode}
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        >
          <View>
            <Pressable onPress={toggleMode}>
              {mode === "picture" ? (
                <AntDesign name="picture" size={32} color="white" />
              ) : (
                <Feather name="video" size={32} color="white" />
              )}
            </Pressable>
            <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
              {({ pressed }) => (
                <View
                >
                  <View
                  />
                </View>
              )}
            </Pressable>
            <Pressable onPress={toggleFacing}>
              <FontAwesome6 name="rotate-left" size={32} color="white" />
            </Pressable>
          </View>
        </CameraView>
      );
    };
  
    return (
      <View >
        {uri ? renderPicture() : renderCamera()}
      </View>
    );
  }
