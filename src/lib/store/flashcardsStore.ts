import slugify from "slugify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { initialState } from "@/types/constants";
import { Flashcard, FlashcardStatus } from "@/types/flashcards";
import { Actions, State } from "@/types/store";

const useFlashcardsStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        createFlashcardGroup: groupName =>
          set(state => {
            const generatedSlug = slugify(groupName, { lower: true });

            state.flashcardsGroups.push({
              name: groupName,
              flashcards: [],
              slug: generatedSlug,
            });
          }),
        editFlashcardGroupName: (groupName, newName) =>
          set(state => {
            const group = state.flashcardsGroups.find(g => g.name === groupName);

            const newSlug = slugify(newName, { lower: true });

            if (group) {
              group.name = newName;
              group.slug = newSlug;
            }
          }),
        deleteFlashcardGroup: groupName =>
          set(state => {
            state.flashcardsGroups = state.flashcardsGroups.filter(g => g.name !== groupName);
          }),
        setCurrentlyEditedGroup: groupName => {
          set(state => {
            state.currentView.currentlyEditedGroup = groupName;
          });
        },
        createFlashcard: (question, answer) =>
          set(state => {
            const group = state.flashcardsGroups.find(g => g.name === state.currentView.currentlyEditedGroup);

            const newFlashcard = {
              question: question,
              answer: answer,
              id: window.crypto.randomUUID(),
              status: FlashcardStatus.DontKnow,
            };

            if (group) {
              group.flashcards.push(newFlashcard);
            }
          }),
        updateFlashcard: (flashcardId, question, answer) =>
          set(state => {
            const editedGroup = state.flashcardsGroups.find(g => g.name === state.currentView.currentlyEditedGroup);
            const currentFlashcard = editedGroup?.flashcards.find(f => f.id === flashcardId);
            if (currentFlashcard) {
              currentFlashcard.question = question;
              currentFlashcard.answer = answer;
            }
          }),
        deleteFlashcard: flashcardId =>
          set(state => {
            const group = state.flashcardsGroups.find(g => g.name === state.currentView.currentlyEditedGroup);
            if (group) {
              group.flashcards = group.flashcards.filter(f => f.id !== flashcardId);
            }
          }),
        setSelectedGroupFilter: (groupName, status) =>
          set(state => {
            state.currentView.selectedGroupFilter = {
              groupName: groupName,
              status,
            };
          }),
        getFilteredFlashcards: (): Flashcard[] => {
          const { groupName, status } = get().currentView.selectedGroupFilter;
          const group = get().flashcardsGroups.find(g => g.name === groupName);

          if (!group) return [];
          return group.flashcards.filter(flashcard => (status ? flashcard.status === status : true));
        },
        randomFlashcard: () => {
          const filteredFlashcards = get().getFilteredFlashcards();
          if (filteredFlashcards.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredFlashcards.length);
            set(state => {
              state.currentView.currentFlashcard = filteredFlashcards[randomIndex];
            });
          } else {
            set(state => {
              state.currentView.currentFlashcard = null;
            });
          }
        },
        updateFlashcardStatus: (flashcardId, status) =>
          set(state => {
            const group = state.flashcardsGroups.find(g => g.name === state.currentView.selectedGroupFilter.groupName);
            const flashcard = group?.flashcards.find(f => f.id === flashcardId);
            if (flashcard) {
              flashcard.status = status;
            }
          }),
      })),
      {
        name: "flashcards-storage",
        partialize: state => ({
          flashcardsGroups: state.flashcardsGroups,
          currentView: state.currentView,
        }),
      }
    )
  )
);

export default useFlashcardsStore;
