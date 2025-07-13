import axios from "axios";


export const getImage = async (image_id: string, setImage?: (image: string) => void) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/image/${image_id}/file`, { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    if (setImage) setImage(imageUrl);
    return imageUrl;
}


export const getAudio = async (audio_id: string, setAudio?: (audio: string) => void) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/audio/${audio_id}/file`, { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(blob);
    if (setAudio) setAudio(audioUrl);
    return audioUrl;
}