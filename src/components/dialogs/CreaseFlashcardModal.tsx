import { CircleHelp } from "lucide-react";
import { useState } from "react";

import { CreateFlashcardForm } from "@/components/forms/CreateFlashcardForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreateFlashcardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Create Flashcard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:max-w-[425px]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true">
            <CircleHelp className="text-white opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Create a new flashcard</DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter the question first and then the answer
            </DialogDescription>
          </DialogHeader>
        </div>

        <CreateFlashcardForm toggleDialog={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
