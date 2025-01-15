import { Link } from "react-router";

import DeleteFlashcardGroupModal from "@/components/dialogs/DeleteFlashcardGroupModal";
import { EditFlashcardGroupNameModal } from "@/components/dialogs/EditFlashcardGroupNameModal";
import useFlashcardsStore from "@/lib/store/flashcardsStore";
import { FlashcardsGroup } from "@/types/flashcards";

export const FlashcardsListElement = ({ flashcards, name, slug }: FlashcardsGroup) => {
  const setCurrentlyEditedGroup = useFlashcardsStore(state => state.setCurrentlyEditedGroup);
  return (
    <div>
      <Link to={slug} onClick={() => setCurrentlyEditedGroup(slug)}>
        <div className="flex h-[160px] w-[250px] cursor-pointer flex-col items-center justify-around rounded-xl bg-white p-4 shadow-lg hover:scale-105 dark:bg-zinc-900">
          <h3 className="text-center text-lg font-bold">{name}</h3>
          <p className="text-balance text-center italic">Flashcards: {flashcards.length}</p>
        </div>
      </Link>
      <div className="flex justify-around pt-2">
        <EditFlashcardGroupNameModal slug={slug} />
        <DeleteFlashcardGroupModal name={name} />
      </div>
    </div>
  );
};
