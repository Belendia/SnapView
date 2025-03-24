import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FaFilter } from "react-icons/fa";

export const ToolbarButtons = () => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* Filter Button */}
      <Button
        variant="ghost"
        onClick={() => setShowFilterPopup(!showFilterPopup)}
        className="rounded-full p-2 transition-colors text-white hover:bg-[#00509d] hover:text-white"
      >
        <FaFilter className="w-5 h-5 transition-color" />
      </Button>
      {showFilterPopup && <></>}

      {/* Search Button */}
      <Button
        variant="ghost"
        onClick={() => setShowFilterPopup(!showFilterPopup)}
        className="rounded-full p-2 transition-colors text-white hover:bg-[#00509d] hover:text-white"
      >
        <MagnifyingGlassIcon className="w-6 h-6 transition-colors" />
      </Button>
      {showSearchPopup && <></>}
    </div>
  );
};
