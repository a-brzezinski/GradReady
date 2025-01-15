import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateFlashcardGroup, createFlashcardGroupSchema } from "@/lib/schemas/forms";
import useFlashcardsStore from "@/lib/store/flashcardsStore";

interface Props {
  toggleDialog: (isOpen: boolean) => void;
}

export const CreateFlashcardGroupForm = ({ toggleDialog }: Props) => {
  const createFlashcardGroup = useFlashcardsStore(state => state.createFlashcardGroup);
  const flashcardsGroups = useFlashcardsStore(state => state.flashcardsGroups);

  const form = useForm<CreateFlashcardGroup>({
    resolver: zodResolver(createFlashcardGroupSchema),
    defaultValues: {
      createName: "",
    },
  });

  function onSubmit({ createName }: CreateFlashcardGroup) {
    if (flashcardsGroups.some(flashcard => flashcard.name === createName)) {
      form.setError("createName", {
        message: "You already have a group with that name.",
      });
      return;
    }

    if (flashcardsGroups.length >= 12) {
      form.setError("createName", {
        message: "You have reached the maximum number of groups.",
      });
      return;
    }

    createFlashcardGroup(createName);
    toggleDialog(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <FormField
          control={form.control}
          name="createName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flashcard Group Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter group name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
