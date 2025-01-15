import { CreateFlashcardModal } from "@/components/dialogs/CreaseFlashcardModal";

interface Props {
  groupName: string;
}

export const FlashcardGroupNavigation = ({ groupName }: Props) => {
  return (
    <nav className="flex items-center justify-around p-2">
      <div className="flex flex-col items-center gap-2">
        <span className="gradient-text text-xl font-bold md:text-2xl">{groupName}</span>
      </div>
      <div>
        <CreateFlashcardModal />
      </div>
    </nav>
  );
};
