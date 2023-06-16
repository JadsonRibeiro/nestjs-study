import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(10),
  age: z.number().positive(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
