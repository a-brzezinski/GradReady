import { createBrowserRouter } from "react-router";

import FlashcardGroupPage from "@/pages/Flashcards/FlashcardGroupPage";
import FlashcardsPage from "@/pages/Flashcards/FlashcardsPage";
import YourFlashcardsPage from "@/pages/Flashcards/YourFlashcardsPage";
import HomePage from "@/pages/HomePage";
import FlashcardsLayout from "@/pages/Layouts/FlashcardsLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/flashcards",
    element: <FlashcardsLayout />,
    children: [
      {
        index: true,
        element: <FlashcardsPage />,
      },
      {
        path: "your-flashcards",
        element: <YourFlashcardsPage />,
      },
      {
        path: "your-flashcards/:slug",
        element: <FlashcardGroupPage />,
      },
    ],
  },
]);
