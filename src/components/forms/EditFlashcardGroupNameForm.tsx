import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditFlashcardGroupName, editFlashcardGroupSchema } from "@/lib/schemas/forms";
import useFlashcardsStore from "@/lib/store/flashcardsStore";

interface Props {
  toggleDialog: (isOpen: boolean) => void;
  editName: string;
}

export const EditFlashcardGroupNameForm = ({ editName, toggleDialog }: Props) => {
  const editFlashcardGroupName = useFlashcardsStore(state => state.editFlashcardGroupName);
  const flashcardsGroups = useFlashcardsStore(state => state.flashcardsGroups);
  const form = useForm<EditFlashcardGroupName>({
    resolver: zodResolver(editFlashcardGroupSchema),
    defaultValues: {
      editName,
    },
  });

  const onSubmit = (data: EditFlashcardGroupName) => {
    const groupExists = flashcardsGroups.some(group => group.name === data.editName);
    if (groupExists) {
      form.setError("editName", { message: "Group name already exists" });
      return;
    }

    editFlashcardGroupName(editName, data.editName);

    toggleDialog(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <FormField
          control={form.control}
          name="editName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Enter group name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Change Name</Button>
      </form>
    </Form>
  );
};
