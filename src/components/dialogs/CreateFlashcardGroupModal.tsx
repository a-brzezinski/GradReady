import { useState } from "react";

import { CreateFlashcardGroupForm } from "@/components/forms/CreateFlashcardGroupForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateFlashcardGroupModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-bold">
          Create Flashcard Group
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create a new group of your flashcards</DialogTitle>
          <DialogDescription className="text-center">
            Remember that the name of the flashcard group must be unique!
          </DialogDescription>
        </DialogHeader>
        <CreateFlashcardGroupForm toggleDialog={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
