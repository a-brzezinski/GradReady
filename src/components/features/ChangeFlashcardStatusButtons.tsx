import { Button } from "@/components/ui/button";
import useFlashcardsStore from "@/lib/store/flashcardsStore";
import { FlashcardStatus } from "@/types/flashcards";

const ChangeFlashcardStatusButtons = () => {
  const updateStatus = useFlashcardsStore(state => state.updateFlashcardStatus);
  const randomFlashcard = useFlashcardsStore(state => state.randomFlashcard);
  const currentFlashcard = useFlashcardsStore(state => state.currentView.currentFlashcard);

  const handleStatusChange = (status: FlashcardStatus) => {
    if (!currentFlashcard) return;

    updateStatus(currentFlashcard.id, status);
    randomFlashcard();
  };

  return (
    <div className="mt-4 flex w-full max-w-md justify-between">
      <Button
        variant="outline"
        className="w-28 bg-red-700 hover:bg-red-600"
        onClick={() => handleStatusChange(FlashcardStatus.DontKnow)}>
        I don't know
      </Button>
      <Button
        variant="outline"
        className="w-28 bg-orange-500 hover:bg-orange-400"
        onClick={() => handleStatusChange(FlashcardStatus.SomewhatKnow)}>
        I know a bit
      </Button>
      <Button
        variant="outline"
        className="w-28 bg-green-600 hover:bg-green-500"
        onClick={() => handleStatusChange(FlashcardStatus.Know)}>
        I know
      </Button>
    </div>
  );
};
export default ChangeFlashcardStatusButtons;
