import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { flashcardFilterSchema } from "@/lib/schemas/forms";
import useFlashcardsStore from "@/lib/store/flashcardsStore";
import { FlashcardStatus } from "@/types/flashcards";

export const FlashcardFilterForm = () => {
  const flashcards = useFlashcardsStore(state => state.flashcardsGroups);
  const selectedGroupFilter = useFlashcardsStore(state => state.currentView.selectedGroupFilter);
  const setSelectedGroupFilter = useFlashcardsStore(state => state.setSelectedGroupFilter);
  const randomFlashcard = useFlashcardsStore(state => state.randomFlashcard);

  const form = useForm({
    defaultValues: {
      groupName: selectedGroupFilter.groupName || "",
      status: selectedGroupFilter.status || FlashcardStatus.DontKnow,
    },
    resolver: zodResolver(flashcardFilterSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = form.watch(data => {
      setSelectedGroupFilter(data.groupName!, data.status!);
      randomFlashcard();
    });
    return () => subscription.unsubscribe();
  }, [form, setSelectedGroupFilter, randomFlashcard]);

  return (
    <Form {...form}>
      <form className="mb-4 flex gap-4">
        <FormField
          control={form.control}
          name="groupName"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group to learn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {flashcards.map(group => (
                    <SelectItem key={group.name} value={group.slug}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {selectedGroupFilter.groupName !== "" ? (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(FlashcardStatus).map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        ) : null}
      </form>
    </Form>
  );
};
