import { YourFlashcardsNavigation } from "@/components/navigations/YourFlashcardsNavigation";
import { FlashcardsList } from "@/components/pages/YourFlashcardsPage/FlashcardsList";

const YourFlashcardsPage = () => {
  return (
    <main className="page-component pt-20">
      <YourFlashcardsNavigation />
      <FlashcardsList />
    </main>
  );
};
export default YourFlashcardsPage;
