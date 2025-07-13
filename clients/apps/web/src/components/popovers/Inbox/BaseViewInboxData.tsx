import { Textarea } from "@gtd/shared/components/ui/textarea";
import { useViewInbox } from "./useViewInbox";
import { useEffect, useState } from "react";
import { getAudio, getImage } from "./getData";




const BaseViewInboxData = () => {
    const { popoverItem } = useViewInbox();
    const [image, setImage] = useState<string | null>(null);
    const [audio, setAudio] = useState<string | null>(null);

    useEffect(() => {
        if (popoverItem?.image_id) getImage(popoverItem.image_id, setImage);
        if (popoverItem?.audio_id) getAudio(popoverItem.audio_id, setAudio);
    }, [popoverItem]);

    
    return (
        <div className="mb-4 ga-1">
            <div className="font-medium mb-2">Content</div>
            {image && (<img src={image} alt="image" className="w-full h-auto max-h-64 object-contain cursor-pointer" />)}
            {audio && <audio src={audio} controls className="custom-audio-player" />}
            {popoverItem?.content && <Textarea className="w-full border border-secondary rounded-md p-2 text-sm max-h-[400px] min-h-[150px]" value={popoverItem?.content} />}
        </div>
    )
}

export default BaseViewInboxData;