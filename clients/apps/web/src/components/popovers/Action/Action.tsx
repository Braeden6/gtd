
import { X } from "lucide-react";
import { useViewInbox } from "@/components/popovers/Inbox/useViewInbox";
import { useState, useEffect } from "react";
import axios from "axios";
import { ActionStatus, Priority } from "@gtd/shared/api/generated";
import { useInboxItems } from "@/hooks/useInboxItems";
import { useActions } from "@/hooks/useActions";
import { LabeledInput } from "@/components/LabelField";
import { PopoverType, useAction } from "@/components/popovers/Action/useAction";
import { Popover, PopoverContent } from "@gtd/shared/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@gtd/shared/components/ui/card";
import { Input } from "@gtd/shared/components/ui/input";
import { Textarea } from "@gtd/shared/components/ui/textarea";
import { DatePicker } from "@gtd/shared/components/ui/datepicker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@gtd/shared/components/ui/select";
import { Button } from "@gtd/shared/components/ui/button";
import BasePopover from "../BasePopover";

export default function ActionPopover() {
    const { popoverItem: inboxPopoverItem } = useViewInbox();
    const { popover, setPopover } = useAction();
    const { updateItem } = useInboxItems();
    const { addAction, updateAction } = useActions();
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
        inbox_id: inboxPopoverItem?.id as string,
      })
      if (action) {
        updateItem(inboxPopoverItem?.id as string, {
          processed: true,
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
    // <Popover open={popover.isOpen}>
    //     <PopoverContent 
    //       onClick={() => setPopover({ isOpen: false })}
    //       className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/50 flex items-center justify-center text-foreground"
    //     >
    //       <Card className="p-6 min-w-[400px] max-w-[800px]" onClick={(e) => e.stopPropagation()}>
    //         <CardHeader>
    //           <CardTitle>{popover.type === PopoverType.EDIT ? "Edit" : "Create"} Action</CardTitle>
    //         </CardHeader>
    //         <Button variant="ghost" onClick={() => setPopover({ isOpen: false })} className="absolute top-2 right-2"> 
    //             <X className="w-6 h-6" />
    //         </Button>
            
    //         <CardContent>
    //           <LabeledInput label="Task Title" isRequired={true}>
    //             <Input value={popover.item?.title} onChange={(e) => setPopover({ item: { ...popover.item, title: e.target.value } })} />
    //           </LabeledInput>

    //           <LabeledInput label="Task Description" isRequired={false}>
    //             <Textarea value={popover.item?.description || ""} onChange={(e) => setPopover({ item: { ...popover.item, description: e.target.value } })} />
    //           </LabeledInput>

    //           <LabeledInput label="Deadline" isRequired={false}>
    //             <DatePicker 
    //               date={popover.item?.due_date ? new Date(popover.item.due_date) : undefined} 
    //               setDate={(date) => setPopover({ item: { ...popover.item, due_date: date.toISOString() } })} 
    //             />
    //           </LabeledInput>

    //           <LabeledInput label="Priority" isRequired={false}>
    //             <Select
    //                 value={popover.item?.priority || ""}
    //                 onValueChange={(value) => setPopover({ item: { ...popover.item, priority: value as Priority } })}
    //               >
    //                 <SelectTrigger className="w-[180px]">
    //                   <SelectValue placeholder="Select a priority" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                   <SelectGroup>
    //                     {
    //                       Object.values(Priority).map((priority) => (
    //                         <SelectItem key={priority} value={priority}>{priority}</SelectItem>
    //                       ))
    //                     }
    //                   </SelectGroup>
    //                 </SelectContent>
    //               </Select>
    //           </LabeledInput>

    //           <div className="mt-4">
    //             <div className="font-medium mb-2">Inbox Content</div>
    //             {image && (<img src={image} alt="image" className="w-full h-auto max-h-64 object-contain cursor-pointer" />)}
    //             {audio && <audio src={audio} controls />}
    //             {inboxPopoverItem?.content && <Textarea className="w-full p-2 h-24 text-sm" value={inboxPopoverItem?.content} disabled readOnly />}
    //           </div>
    //         </CardContent>
    //         <CardFooter>
    //           <div className="flex flex-col gap-2 items-center w-full">
    //             {
    //               popover.type === PopoverType.EDIT ? 
    //                 <Button className="bg-primary text-primary-foreground py-2 rounded-md font-medium w-1/2" onClick={handleComplete}>Complete</Button> :
    //                 <Button className="bg-primary text-primary-foreground py-2 rounded-md font-medium w-1/2" onClick={handleCreate}>Create</Button>
    //             }
    //             <Button variant="secondary" className="py-2 rounded-md w-1/2" onClick={() => setPopover({ isOpen: false })}>Cancel</Button>
    //           </div>
    //         </CardFooter>
    //       </Card>
    //     </PopoverContent>
    //   </Popover>

    <BasePopover isOpen={popover.isOpen} setIsOpen={() => setPopover({ isOpen: false })} title={popover.type === PopoverType.EDIT ? "Edit" : "Create"} >
      <div>
        <h1>Test</h1>
      </div>
    </BasePopover>
    )
}