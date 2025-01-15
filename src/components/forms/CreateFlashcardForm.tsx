import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateFlashcard, createFlashcardSchema } from "@/lib/schemas/forms";
import useFlashcardsStore from "@/lib/store/flashcardsStore";

interface Props {
  toggleDialog: (isOpen: boolean) => void;
}

export const CreateFlashcardForm = ({ toggleDialog }: Props) => {
  const createFlashcard = useFlashcardsStore(state => state.createFlashcard);

  const [step, setStep] = useState(1);
  const form = useForm<CreateFlashcard>({
    resolver: zodResolver(createFlashcardSchema),
    defaultValues: {
      answer: "",
      question: "",
    },
  });

  const handleNextStep = async () => {
    const isValid = await form.trigger("question");
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = (data: CreateFlashcard) => {
    console.log("click");
    createFlashcard(data.question, data.answer);
    toggleDialog(false);
  };

  const onCancel = () => {
    toggleDialog(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
        {step === 1 && (
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {step === 2 && (
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {step === 1 && (
          <div className="flex w-full gap-2">
            <Button className="w-1/2" type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="w-1/2" type="button" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex w-full gap-2">
            <Button className="w-1/2" onClick={() => setStep(1)} variant="outline">
              Back
            </Button>
            <Button className="w-1/2" type="submit">
              Create
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
