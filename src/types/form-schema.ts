import { z } from "zod"

export const postFormSchema = z.object({
  image: z
    .instanceof(FileList)
    .refine((image) => {
      return image.item(0) !== null
    }, "*Insira uma imagem")
    .transform((image) => image.item(0)),
  title: z.string().min(1, "*O título é obrigatório."),
  tags: z
    .string()
    .transform((text) => text.split(","))
    .optional(),
  author_notes: z.string().optional(),
  content: z.string().min(1, "*Escreva alguma coisa no conteúdo"),
  hightlight: z.boolean().default(false),
  category: z.string().min(1, "*Selecione uma categoria"),
})

export const scheduleFormSchema = z.object({
  title: z.string().min(1, { message: "*O título é obrigatório" }),
  file: z
    .instanceof(FileList)
    .refine((file) => !file.item(0), "*Insira um ficheiro PDF"),
})

export const tourFormSchema = z.object({
  title: z.string(),
  coordinates: z.string().transform((coordinates) => {
    const currentCoordinates = coordinates.split(",")
    const latitude = Number(currentCoordinates[0])
    const longitude = Number(currentCoordinates[1])

    return {
      latitude,
      longitude,
    }
  }),
  tags: z
    .string()
    .transform((text) => text.split(","))
    .optional(),
  author_notes: z.string().optional(),
  highlighted: z.boolean().default(false),
})

export const editTourFormSchema = z.object({
  title: z.string().optional(),
  coordinates: z.string().optional(),
  tags: z
    .string()
    .transform((text) => text.split(","))
    .optional(),
  author_notes: z.string().optional(),
  highlighted: z.boolean().optional(),
})

export const editPostFormSchema = z.object({
  tags: z
    .string()
    .optional()
    .transform((tag) => (tag ? tag.split(",") : "")),
  title: z.string().optional(),
  category: z.string().optional(),
  highlighted: z.boolean().optional(),
  author_notes: z.string().optional(),
  image: z.union([z.string(), z.custom<File>()]).optional(),
})

export const editScheduleFormSchema = z.object({
  file: z.string(),
})

export const userFormSchema = z.object({
  firstname: z.string().min(1, "Por favor preencha este campo."),
  lastname: z.string().min(1, "Por favor preencha este campo."),
  email: z.string().email().min(1, "Por favor insira um email válido."),
  password: z.string().min(6, "A password deve ter no mínimo 6 caracteres."),
})

export const editUserFormSchema = z.object({
  image: z
    .instanceof(FileList)
    .transform((image) => image.item(0)!)
    .optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email().min(1, "*O email é obrigatório."),
  password: z.string().min(1, "*A password é obrigatória."),
})

export const productFormSchema = z.object({
  price: z.string().min(1, { message: "*O preço é obrigatório" }),
  title: z.string().min(1, { message: "*O título é obrigatório" }),
  category: z.string().min(1, { message: "*Selecione uma categoria" }),
  image: z
    .instanceof(FileList)
    .refine((image) => image.item(0) !== null, "*Insira uma imagem")
    .transform((image) => image.item(0)),
})

export const editProductFormSchema = z.object({
  name: z.string().optional(),
  price: z.coerce.string().optional(),
  image: z
    .union([
      z.instanceof(FileList).transform((image) => image.item(0)!),
      z.string(),
    ])
    .optional(),
  category: z.string().optional(),
})

export type EditUserFormType = z.infer<typeof editUserFormSchema>
export type LoginInSchema = z.infer<typeof loginSchema>
export type UserFormType = z.infer<typeof userFormSchema>
export type ProductFormSchema = z.infer<typeof productFormSchema>
export type EditProductFormSchemaType = z.infer<typeof editProductFormSchema>
export type PostFormSchemaType = z.infer<typeof postFormSchema>
export type TourFormSchemaType = z.infer<typeof tourFormSchema>
export type ScheduleFormSchemaType = z.infer<typeof scheduleFormSchema>
export type EditTourFormSchemaType = z.infer<typeof editTourFormSchema>
export type EditPostFormSchemaType = z.infer<typeof editPostFormSchema>
export type EditScheduleFormSchemaType = z.infer<typeof editScheduleFormSchema>
