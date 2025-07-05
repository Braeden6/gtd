import OverlayButton from "./OverlayButton";
import SelectionButton from "./SelectionButton";
import SidePanel from "./SidePanel";

function Overlay() {
    return (
      <div 
        id="test" 
        className="fixed bottom-8 right-8 z-[999999]"
      >
        <SidePanel />
        <OverlayButton />
        <SelectionButton />
      </div>
    )
}

export default Overlay;