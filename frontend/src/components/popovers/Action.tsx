import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverType, useAction } from "@/hooks/popover/useAction";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/datepicker";
import { X } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useViewInbox } from "@/hooks/popover/useViewInbox";
import { useState, useEffect } from "react";
import axios from "axios";
import { ActionStatus, Priority } from "@/api/generated";
import { useInboxItems } from "@/hooks/useInboxItems";
import { useActionItems } from "@/hooks/useActionItems";
import { LabeledInput } from "../LabelField";


export default function ActionPopover() {
    const { popoverItem: inboxPopoverItem } = useViewInbox();
    const { popover, setPopover } = useAction();
    const { updateItem } = useInboxItems();
    const { addAction, updateAction } = useActionItems();
    const [image, setImage] = useState<string | null>(null);
    const [audio, setAudio] = useState<string | null>(null);

    useEffect(() => {
        const getAudio = async () => {
          if (!inboxPopoverItem?.audio_id) {
            setAudio(null);
            return;
          };
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/audio/${inboxPopoverItem.audio_id}/file`, { responseType: 'arraybuffer' });
          const blob = new Blob([response.data], { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(blob);
          setAudio(audioUrl);
        }

        const getImage = async () => {
          if (!inboxPopoverItem?.image_id) {
            setImage(null);
            return;
          };
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/image/${inboxPopoverItem.image_id}/file`, { responseType: 'arraybuffer' });
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          setImage(imageUrl);
        }

        getAudio();
        getImage();
    }, [inboxPopoverItem]);

    const handleCreate = async () => {
      if (!popover.item?.title ||
        inboxPopoverItem?.id === null
      ) {
        return;
      }
      const action = await addAction({
        title: popover.item?.title as string,
        description: popover.item?.description as string,
        due_date: popover.item?.due_date as string,
        priority: popover.item?.priority as Priority,
      })
      if (action) {
        updateItem(inboxPopoverItem?.id as string, {
          processed: true,
          action_id: action.id
        })
      }
      setPopover({ isOpen: false });
    }

    const handleComplete = async () => {
      if (!popover.item?.id) {
        return;
      }
      await updateAction(popover.item?.id as string, {
        status: ActionStatus.COMPLETED,
      })
      setPopover({ isOpen: false });
    }

    return (
    <Popover open={popover.isOpen}>
        <PopoverContent 
          onClick={() => setPopover({ isOpen: false })}
          className="w-[100vw] h-[100vh] z-100 absolute top-0 left-0 bg-black/50 flex items-center justify-center text-foreground"
        >
          <div className="bg-secondary border-primary border-2 rounded-md shadow-lg p-6 text-secondary-foreground" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 gap-2">
              <div className="font-medium">Convert capture item to actionable task</div>
              <button onClick={() => setPopover({ isOpen: false })} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <LabeledInput label="Task Title" isRequired={true}>
                <Input value={popover.item?.title} onChange={(e) => setPopover({ item: { ...popover.item, title: e.target.value } })} />
              </LabeledInput>

              <LabeledInput label="Task Description" isRequired={false}>
                <Textarea value={popover.item?.description || ""} onChange={(e) => setPopover({ item: { ...popover.item, description: e.target.value } })} />
              </LabeledInput>

              <LabeledInput label="Deadline" isRequired={false}>
                <DatePicker 
                  date={popover.item?.due_date ? new Date(popover.item.due_date) : undefined} 
                  setDate={(date) => setPopover({ item: { ...popover.item, due_date: date.toISOString() } })} 
                />
              </LabeledInput>

              <LabeledInput label="Priority" isRequired={false}>
              <Select
                  value={popover.item?.priority || ""}
                  onValueChange={(value) => setPopover({ item: { ...popover.item, priority: value as Priority } })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        Object.values(Priority).map((priority) => (
                          <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </LabeledInput>

              <div className="mb-4 ga-1">
                <div className="font-medium mb-2">Inbox Content</div>
                {image && (<img src={image} alt="image" className="w-full h-auto max-h-64 object-contain cursor-pointer" />)}
                {audio && <audio src={audio} controls />}
                {inboxPopoverItem?.content && <Textarea className="w-full border rounded-md p-2 h-24 text-sm" value={inboxPopoverItem?.content} disabled readOnly />}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 items-center">
              {
                popover.type === PopoverType.EDIT ? 
                  <button className="bg-primary text-primary-foreground py-2 rounded-md font-medium w-1/2" onClick={handleComplete}>Complete</button> :
                  <button className="bg-primary text-primary-foreground py-2 rounded-md font-medium w-1/2" onClick={handleCreate}>Create</button>
              }
              <button className="bg-gray-500 text-gray-700 py-2 rounded-md w-1/2" onClick={() => setPopover({ isOpen: false })}>Cancel</button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
}