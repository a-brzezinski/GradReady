import { GraduationCap, Layers2 } from "lucide-react";
import { Link } from "react-router";

import { ModeToggle } from "@/components/common/mode-toggle";

const MainNavigation = () => {
  return (
    <nav className="fixed flex w-full items-center justify-center py-2">
      <div className="flex items-center gap-8 rounded-xl bg-black/50 p-4 px-10">
        <Link to="/flashcards" title="Study" className="text-white hover:scale-110">
          <GraduationCap className="h-6 w-6" />
        </Link>
        <Link to="/flashcards/your-flashcards" title="Flashcards" className="text-white hover:scale-110">
          <Layers2 className="h-6 w-6" />
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default MainNavigation;
