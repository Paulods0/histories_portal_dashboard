import { z } from "zod"

export const SignInFormSchema = z.object({
  email: z.string().email("*Email inválido"),
  password: z.string().min(8, { message: "*A password é muito curta" }),
})

export type PostFormType = z.infer<typeof CreatePostFormSchema>
type Category = {
  value: string
}

export const CreatePostFormSchema = z.object({
  title: z.string().min(1, { message: "*O título é obrigatório." }),
  tags: z
    .string()
    .optional()
    .transform((tags) => {
      if (!tags) {
        return
      }
      const tagsArr = tags.trim().split(",")
      return tagsArr
    }),
  author_notes: z.string().optional(),
  geoCoordinates: z
    .string()
    .optional()
    .transform((geoCoordinates) => {
      if (!geoCoordinates) return
      return geoCoordinates.split(",")
    }),
  author: z.string().optional(),
  isHighlighted: z.boolean().default(false),
  category: z.custom<{ value: string }[]>(),
})
