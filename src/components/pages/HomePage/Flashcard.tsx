import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  question: string;
  answer: string;
}

export const FlashcardItem = ({ question, answer }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card className="aspect-video w-full max-w-md cursor-pointer dark:bg-zinc-900" onClick={flipCard}>
      <CardContent className="flex h-full items-center justify-center p-6">
        <div className="text-center">
          {isFlipped ? (
            <h2 className="mb-4 text-2xl font-bold">{question}</h2>
          ) : (
            <h2 className="mb-4 text-2xl font-bold">{answer}</h2>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
