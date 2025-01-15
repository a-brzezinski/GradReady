import { FlashcardsListElement } from "@/components/pages/YourFlashcardsPage/FlashcardsListElement";
import useFlashcardsStore from "@/lib/store/flashcardsStore";

export const FlashcardsList = () => {
  const flashcardsGroups = useFlashcardsStore(state => state.flashcardsGroups);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-5">
      {flashcardsGroups.map(group => (
        <FlashcardsListElement key={group.name} {...group} />
      ))}
    </div>
  );
};
