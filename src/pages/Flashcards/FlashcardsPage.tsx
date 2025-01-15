import { Link } from "react-router";
import slugify from "slugify";

import ErrorMessage from "@/components/common/ErrorMessage";
import ChangeFlashcardStatusButtons from "@/components/features/ChangeFlashcardStatusButtons";
import { FlashcardFilterForm } from "@/components/forms/FlashcardFilterForm";
import { FlashcardItem } from "@/components/pages/HomePage/Flashcard";
import { Button } from "@/components/ui/button";
import useFlashcardsStore from "@/lib/store/flashcardsStore";

const FlashcardsPage = () => {
  const selectedGroupFilter = useFlashcardsStore(state => state.currentView.selectedGroupFilter);
  const currentFlashcard = useFlashcardsStore(state => state.currentView.currentFlashcard);
  const flashcardsGroups = useFlashcardsStore(state => state.flashcardsGroups);

  let content;

  if (flashcardsGroups.length === 0) {
    content = (
      <main className="page-component justify-center">
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage text="You don't have any flashcards created." />
          <Button asChild className="animate-pulse font-bold">
            <Link to="/flashcards/your-flashcards">Create your first group of flashcards</Link>
          </Button>
        </div>
      </main>
    );
  } else if (!currentFlashcard && selectedGroupFilter.groupName !== "") {
    const slug = slugify(selectedGroupFilter.groupName, { lower: true });

    content = (
      <main className="page-component justify-center">
        <FlashcardFilterForm />
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage text="This group has no flashcards, or you don't have flashcards with this status" />
          <Button asChild className="animate-pulse font-bold">
            <Link to={`/flashcards/your-flashcards/${slug}`}>Create a flashcard in this group</Link>
          </Button>
        </div>
      </main>
    );
  } else if (selectedGroupFilter.groupName === "") {
    content = (
      <main className="page-component justify-center">
        <FlashcardFilterForm />
        <p className="mt-4 text-center text-lg text-gray-500">Select a group to start learning</p>
      </main>
    );
  } else if (selectedGroupFilter.groupName !== "" && currentFlashcard) {
    content = (
      <main className="page-component justify-center">
        <FlashcardFilterForm />
        <FlashcardItem answer={currentFlashcard.answer} question={currentFlashcard.question} />
        <ChangeFlashcardStatusButtons />
      </main>
    );
  }

  return content;
};

export default FlashcardsPage;
