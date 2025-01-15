import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <header className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h2 className="gradient-text text-6xl font-bold tracking-widest">GradReady</h2>
      <p className="text-balance text-3xl tracking-wider">Prepare for your thesis defence with ease!</p>
      <Button>
        <Link to="/flashcards">Create your first flashcards!</Link>
      </Button>
    </header>
  );
};
export default HomePage;
