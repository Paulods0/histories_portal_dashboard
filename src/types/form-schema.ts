import { handleImageUpload } from "@/utils/helpers"
import { z } from "zod"

export const postFormSchema = z.object({
  image: z
    .instanceof(FileList)
    .refine((image) => {
      return image.item(0) !== null
    }, "*Insira uma imagem")
    .transform((image) => {
      if (image.item(0) !== null) {
        return handleImageUpload(image.item(0)!!)
      }
    }),
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
    .refine((file) => file.item(0) !== null, "*Insira um ficheiro PDF")
    .transform((file) => file.item(0)),
})

export const tourFormSchema = z.object({
  content: z.string().min(1, "*Escreva alguma história"),
  image: z
    .instanceof(FileList)
    .refine((image) => image.item(0) !== null, "*Insira uma imagem")
    .transform((image) => {
      if (image.item(0) !== null) {
        return handleImageUpload(image.item(0)!!)
      }
    }),
  title: z.string().min(1, "O titlo é obrigatório"),
  coordinates: z
    .string()
    .min(1, { message: "*Insira as coordenadas geográficas" }),
  tags: z
    .string()
    .transform((text) => text.split(","))
    .optional(),
  author_notes: z.string().optional(),
  highlighted: z.boolean().default(false),
})

export const editTourFormSchema = z.object({
  image: z
    .union([
      z.string(),
      z.instanceof(FileList).transform((file) => {
        if (file.item(0) !== null) {
          return handleImageUpload(file.item(0)!!)
        }
      }),
    ])
    .optional(),
  title: z.string().optional(),
  coordinates: z.string().optional(),
  tag: z
    .union([
      z.string().transform((tag) => tag && tag.split(",")),
      z.array(z.string()),
    ])
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
  image: z
    .union([
      z.string(),
      z.instanceof(FileList).transform((image) => {
        if (image.item(0) !== null) {
          return handleImageUpload(image.item(0)!!)
        }
      }),
    ])
    .optional(),
})

export const editScheduleFormSchema = z.object({
  title: z.string().optional(),
  file: z
    .union([
      z.string(),
      z
        .instanceof(FileList)
        .transform((file) => file.item(0) !== null && file.item(0)),
    ])
    .optional(),
})

export const userFormSchema = z.object({
  image: z
    .union([
      z.instanceof(FileList).transform((image) => {
        if (image.item(0) !== null) {
          return handleImageUpload(image.item(0)!!)
        }
      }),
      z.undefined(),
    ])
    .optional(),
  firstname: z.string().min(1, "*Por favor preencha este campo."),
  lastname: z.string().min(1, "*Por favor preencha este campo."),
  password: z.string().min(6, "*A password deve ter no mínimo 6 caracteres."),
  email: z.string().email().min(1, "*Por favor insira um email válido."),
  role: z.string().min(1, "*Selecione uma role para este usuário"),
})

export const editUserFormSchema = z.object({
  image: z
    .instanceof(FileList)
    .transform((image) => {
      if (image.item(0) !== null) {
        return handleImageUpload(image.item(0)!!)
      }
    })
    .optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  role: z.string().optional(),
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
    .transform((image) => {
      if (image.item(0) !== null) {
        return handleImageUpload(image.item(0)!!)
      }
    }),
})

export const editProductFormSchema = z.object({
  name: z.string().optional(),
  price: z.coerce.string().optional(),
  image: z
    .union([
      z.instanceof(FileList).transform((image) => {
        if (image.item(0) !== null) {
          return handleImageUpload(image.item(0)!!)
        }
      }),
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
