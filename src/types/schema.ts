import { z } from "zod"

export const postFormSchema = z.object({
  title: z.string().min(1, "*O título deve conter no mínimo 6 caracteres."),
  tags: z
    .string()
    .transform((text) => text.split(","))
    .optional(),
  author_notes: z.string().optional(),
  hightlight: z.boolean().default(false),
})

export const scheduleFormSchema = z.object({
  title: z.string().min(1, { message: "*O título é obrigatório" }),
  file: z.custom<File[]>().refine(
    (file) => {
      if (!file[0]) {
        return
      }
      return file
    },
    { message: "*Insira um ficheiro PDF." }
  ),
})

export const tourFormSchema = z.object({
  title: z.string().min(1, { message: "*O título é obrigatório." }),
  coordinates: z
    .string()
    .min(1, { message: "*Insira as coordenadas geográficas" })
    .transform((coordinates) => {
      const currentCoordinates = coordinates.split(",")
      return {
        latitude: Number(currentCoordinates[0]),
        longitude: Number(currentCoordinates[1]),
      }
    }),
  tags: z
    .string()
    .transform((text) => text.split(","))
    .optional(),
  author_notes: z.string().optional(),
  category: z
    .string()
    .min(1, { message: "*Selecione uma categoria." })
    .optional(),
  highlighted: z.boolean().default(false).optional(),
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
  tags: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  coordinates: z.string().optional(),
  author_notes: z.string().optional(),
  highlighted: z.boolean().optional(),
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

export const loginSchema = z.object({
  email: z.string().email().min(1, "*O email é obrigatório."),
  password: z.string().min(1, "*A password é obrigatória."),
})

export const storeFormSchema = z.object({
  title: z.string().min(1, { message: "*O título é obrigatório" }),
  price: z.string().min(1, { message: "*O preço é obrigatório" }),
  image: z.custom<File>(),
})

export type LoginInSchema = z.infer<typeof loginSchema>

export type StoreFormSchema = z.infer<typeof storeFormSchema>

export type UserFormType = z.infer<typeof userFormSchema>
export type PostFormSchemaType = z.infer<typeof postFormSchema>
export type TourFormSchemaType = z.infer<typeof tourFormSchema>
export type ScheduleFormSchemaType = z.infer<typeof scheduleFormSchema>

export type EditTourFormSchemaType = z.infer<typeof editTourFormSchema>
export type EditPostFormSchemaType = z.infer<typeof editPostFormSchema>
export type EditScheduleFormSchemaType = z.infer<typeof editScheduleFormSchema>
