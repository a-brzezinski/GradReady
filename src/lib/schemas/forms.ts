import { z } from "zod";

const groupNameSchema = z
  .string()
  .min(3, { message: "The group name must contain a minimum of 3 characters!" })
  .max(18, { message: "The group name must contain a maximum of 18 characters!" });

export const createFlashcardGroupSchema = z.object({
  createName: groupNameSchema,
});

export type CreateFlashcardGroup = z.infer<typeof createFlashcardGroupSchema>;

export const editFlashcardGroupSchema = z.object({
  editName: groupNameSchema,
});

export type EditFlashcardGroupName = z.infer<typeof editFlashcardGroupSchema>;

const flashcardSchema = z.string().min(3, { message: "The field must contain a minimum of 3 characters!" });

export const createFlashcardSchema = z.object({
  question: flashcardSchema,
  answer: flashcardSchema,
  status: z.string().optional(),
});

export type CreateFlashcard = z.infer<typeof createFlashcardSchema>;

export const flashcardFilterSchema = z.object({
  groupName: z.string(),
  status: z.string(),
});
