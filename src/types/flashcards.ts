export enum FlashcardStatus {
  Know = "know",
  SomewhatKnow = "somewhat know",
  DontKnow = "don't know",
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  status: FlashcardStatus;
}

export interface CurrentView {
  selectedGroupFilter: {
    groupName: string;
    status: string;
  };
  currentFlashcard: Flashcard | null;
  currentlyEditedGroup: string | null;
}

export interface FlashcardsGroup {
  name: string;
  flashcards: Flashcard[];
  slug: string;
}
