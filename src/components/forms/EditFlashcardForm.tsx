import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateFlashcard, createFlashcardSchema } from "@/lib/schemas/forms";
import useFlashcardsStore from "@/lib/store/flashcardsStore";
import { Flashcard } from "@/types/flashcards";

export const EditFlashcardForm = ({ answer, id, question, status }: Flashcard) => {
  const updateFlashcard = useFlashcardsStore(state => state.updateFlashcard);

  const form = useForm<CreateFlashcard>({
    resolver: zodResolver(createFlashcardSchema),
    defaultValues: {
      answer: answer,
      question: question,
      status: status,
    },
  });

  function onSubmit(data: CreateFlashcard) {
    console.log(data.answer, data.question);
    updateFlashcard(id, data.question, data.answer);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6 pt-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter group name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter group name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="know">know</SelectItem>
                  <SelectItem value="somewhat know">somewhat know</SelectItem>
                  <SelectItem value="don't know">don't know</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Edit</Button>
      </form>
    </Form>
  );
};
