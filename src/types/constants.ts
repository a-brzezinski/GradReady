import { State } from "@/types/store";

export const initialState: State = {
  flashcardsGroups: [],
  currentView: {
    selectedGroupFilter: {
      groupName: "",
      status: "",
    },
    currentFlashcard: null,
    currentlyEditedGroup: null,
  },
};
