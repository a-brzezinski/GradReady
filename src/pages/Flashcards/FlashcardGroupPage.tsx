import { Link, useParams } from "react-router";

import { FlashcardItemSheet } from "@/components/features/FlashcardItemSheet";
import { FlashcardGroupNavigation } from "@/components/navigations/FlashcardGroupNavigation";
import { Button } from "@/components/ui/button";
import useFlashcardsStore from "@/lib/store/flashcardsStore";

const FlashcardGroupPage = () => {
  const { slug } = useParams();
  const currentFlashcardGroup = useFlashcardsStore(state => state.flashcardsGroups).find(group => group.slug === slug);

  if (!currentFlashcardGroup) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <h3 className="font-bold">Flashcard group not found</h3>
        <Button asChild size="sm">
          <Link to="/flashcards/your-flashcards">Go to all Groups</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen px-10 pt-20">
      <FlashcardGroupNavigation groupName={currentFlashcardGroup.name} />
      <div className="flex flex-wrap justify-center gap-4 pt-10">
        {currentFlashcardGroup.flashcards.map(flashcard => (
          <FlashcardItemSheet key={flashcard.id} {...flashcard} />
        ))}
      </div>
    </div>
  );
};
export default FlashcardGroupPage;
