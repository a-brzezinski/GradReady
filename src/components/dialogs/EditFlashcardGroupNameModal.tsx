import { PencilLine } from "lucide-react";
import { useState } from "react";

import { CustomTooltip } from "@/components/common/CustomTooltip";
import { EditFlashcardGroupNameForm } from "@/components/forms/EditFlashcardGroupNameForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  slug: string;
}

export const EditFlashcardGroupNameModal = ({ slug }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className="cursor-pointer">
        <CustomTooltip content="Edit Group Name">
          <PencilLine size={20} className="text-emerald-400" />
        </CustomTooltip>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Rename the group</DialogTitle>
        </DialogHeader>
        <EditFlashcardGroupNameForm toggleDialog={setIsOpen} editName={slug} />
      </DialogContent>
    </Dialog>
  );
};
