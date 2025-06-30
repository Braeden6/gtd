import OverlayButton from "./OverlayButton";
import SelectionButton from "./SelectionButton";
import SidePanel from "./SidePanel";

function Overlay() {
    return (
      <div className="fixed bottom-8 right-8 z-[999999] pointer-events-none font-sans">
        <SelectionButton />
        <SidePanel />
        <OverlayButton />
      </div>
    )
}

export default Overlay;