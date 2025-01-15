import { EditFlashcardForm } from "@/components/forms/EditFlashcardForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { truncateText } from "@/helpers/features";
import useFlashcardsStore from "@/lib/store/flashcardsStore";
import { Flashcard } from "@/types/flashcards";

export const FlashcardItemSheet = (props: Flashcard) => {
  const deleteFlashcard = useFlashcardsStore(state => state.deleteFlashcard);

  const handleDeleteFlashcard = () => {
    deleteFlashcard(props.id);
  };

  return (
    <Sheet>
      <SheetTrigger className="aspect-square size-40 rounded-xl bg-slate-100 shadow-lg dark:bg-zinc-900">
        {truncateText(props.question, 14)}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="text-center">Manage the Flashcard</SheetTitle>
          <EditFlashcardForm {...props} />
        </SheetHeader>
        <SheetFooter>
          <Button className="w-full" type="button" variant="destructive" onClick={handleDeleteFlashcard}>
            Delete Flashcard
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
