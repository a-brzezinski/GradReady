import { CurrentView, Flashcard, FlashcardsGroup, FlashcardStatus } from "@/types/flashcards";

export interface State {
  flashcardsGroups: FlashcardsGroup[];
  currentView: CurrentView;
}

export interface Actions {
  createFlashcardGroup: (groupName: string) => void;
  deleteFlashcardGroup: (groupName: string) => void;
  editFlashcardGroupName: (groupName: string, newName: string) => void;
  createFlashcard: (question: string, answer: string) => void;
  updateFlashcard: (flashcardId: string, question: string, answer: string) => void;
  deleteFlashcard: (flashcardId: string) => void;
  getFilteredFlashcards: () => Flashcard[];
  randomFlashcard: () => void;
  updateFlashcardStatus: (flashcardId: string, status: FlashcardStatus) => void;
  setCurrentlyEditedGroup: (groupName: string) => void;
  setSelectedGroupFilter: (groupName: string, status: string) => void;
}
