import React from "react";
import {
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import { useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { Image } from "expo-image";
import { Trash2, X, CheckCheck } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/hooks/useLogForm";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { useAlertDialogStore } from "@/hooks/useCustomAlertDialog";

export default function CameraComponent() {
    const [permission, requestPermission] = useCameraPermissions();
    const router = useRouter();
    const { setImageUri, imageUri } = useFormStore();
    const cameraRef = useRef<CameraView>(null);
    const { openDialog, closeDialog } = useAlertDialogStore();

    useEffect(() => {
        if (!permission) return;
        if (permission?.granted) return;
        if (!permission?.canAskAgain) {
            openDialog({
                title: "Camera Access Was Denied",
                body: "If you want to use the camera, please grant access in the settings. Click done once you have granted access.",
                cancelText: "Cancel",
                actionText: "Done",
                onCancel: () => router.back(),
                onAction: () => closeDialog()
            });
            return;
        }
        requestPermission();
    }, [permission]);

    const takePicture = async () => {
        const photo = await cameraRef.current?.takePictureAsync();
        setImageUri(photo?.uri || null);
    };

    const handleClose = () => {
        if (imageUri) {
            openDialog({
                body: "Photo being deleted cannot be recovered!",
                cancelText: "Cancel",
                actionText: "Delete",
                actionTextColor: "destructive",
                onCancel: () => closeDialog(),
                onAction: () => {
                    closeDialog();
                    setImageUri(null);
                    router.back();
                }
            });
            return;
        } else {
            router.back();
        }
    }

    return (
        <>
            <Button onPress={handleClose} className="absolute top-20 left-5 bg-gray-200/60 rounded-full w-16 h-16 z-10">
                <X className="w-10 h-10 color-black" />
            </Button>
        

            {permission?.granted && !imageUri &&
                <CameraView
                    ref={cameraRef}
                    mode="picture"
                    facing="back"
                >
                    <Box className="w-[100vw] h-[110vh]"/>
                </CameraView> 
            }

            {imageUri &&
                <Image
                    source={{ uri: imageUri }}
                    contentFit="contain"
                    placeholder="Loading..."
                    transition={200}
                    style={{ 
                        width: Dimensions.get('window').width + 100,
                        height: Dimensions.get('window').height + 100
                    }}
                    className="w-[100vw] h-[110vh]"
                />
            }

            <Box className="absolute bottom-0 left-0 w-full h-[16vh] bg-gray-500/40 z-10">
                {imageUri ? 
                <Box className="w-full h-full">
                    <Button
                        onPress={() => setImageUri(null)}
                        className="absolute right-0 -translate-x-1/3 translate-y-1/2 rounded-full w-16 h-16"
                    >
                        <Trash2 className="color-black" size={30}/>
                    </Button>
                    <Button
                        onPress={() => router.back()}
                        className="absolute right-1/2 translate-x-1/2 -translate-y-1/3 bg-gray-200/60 rounded-full w-24 h-24"
                    >
                        <CheckCheck className="color-black" size={40}/>
                    </Button>
                </Box> :
                <Button 
                    onPress={takePicture}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/4"
                >
                    <Box className="w-[72px] h-[72px] rounded-full border-4 border-white flex items-center justify-center">
                        <Box className="w-[62px] h-[62px] rounded-full bg-white" />
                    </Box>
                </Button>}
                
            </Box>
        </>
    );
}