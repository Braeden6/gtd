import ActionPopover from '@/components/popovers/Action/Action'
import { PopoverType, useAction } from '@/components/popovers/Action/useAction'
import { useViewInbox } from '@/components/popovers/Inbox/useViewInbox'
import ViewInbox from '@/components/popovers/Inbox/ViewInbox'
import { ActionStatus, Priority } from '@gtd/shared/api/generated'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_main/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setPopoverOpen, setPopoverItem } = useViewInbox();
  const { setPopover: setActionPopover } = useAction();


  // useEffect(() => {
  //   setActionPopover({
  //     isOpen: true,
  //     type: PopoverType.CREATE,
  //     item: {
  //       id: "1",
  //       title: "Test",
  //       description: "Test",
  //       priority: Priority.HIGH,
  //       due_date: "2025-01-01",
  //       status: ActionStatus.IN_PROGRESS,
  //       created_at: "2025-01-01",
  //       project_id: "1",
  //       inbox_id: "1",
  //     }
  //   })
  // }, [])

  return <div>

  

    {/* <BasePopover isOpen={true} setIsOpen={() => {}} title="Test">
      <div>
        <h1>Test</h1>
      </div>
    </BasePopover> */}


    <ViewInbox />
    <ActionPopover />


  </div>
}
