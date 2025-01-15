import { CircleAlert, Trash } from "lucide-react";
import { useState } from "react";

import { CustomTooltip } from "@/components/common/CustomTooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFlashcardsStore from "@/lib/store/flashcardsStore";

interface Props {
  name: string;
}

export default function DeleteFlashcardGroupModal({ name }: Props) {
  const [inputValue, setInputValue] = useState("");
  const deleteFlashcardGroup = useFlashcardsStore(state => state.deleteFlashcardGroup);

  const handleDelete = () => {
    deleteFlashcardGroup(name);
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <CustomTooltip content="Delete Group">
          <Trash size={20} className="text-red-500" />
        </CustomTooltip>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:max-w-[425px]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true">
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Final confirmation</DialogTitle>
            <DialogDescription className="sm:text-center">
              This action cannot be undone. To confirm, please enter the group name{" "}
              <span className="text-foreground">{name}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              type="text"
              placeholder="Type group name to confirm"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" className="flex-1" disabled={inputValue !== name} onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
