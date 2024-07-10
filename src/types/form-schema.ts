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
  date: z
    .string()
    .refine(
      (date) => {
        const newDate = new Date(date)
        return !isNaN(newDate.getTime())
      },
      { message: "*Insira uma data válida" }
    )
    .transform((date) => {
      const newDate = new Date(date)
      return newDate.toLocaleDateString()
    }),
})

export const scheduleFormSchema = z.object({
  title: z.string().min(1, { message: "*O título é obrigatório" }),
  file: z
    .instanceof(FileList)
    .refine((file) => file.item(0) !== null, "*Insira um ficheiro PDF")
    .transform((file) => file.item(0)),
  author: z.string().optional(),
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
  date: z.string().transform((date) => new Date(date).toLocaleDateString()),
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
  author: z.string().optional(),
  date: z.string().transform((date) => new Date(date).toLocaleDateString()).optional(),
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
  date: z
    .string()
    .transform((date) => {
      const newDate = new Date(date)
      return newDate.toLocaleDateString()
    })
    .optional(),
})

export const editScheduleFormSchema = z.object({
  author: z.string().optional(),
  title: z.string().optional(),
  file: z.custom<File>().optional(),
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
    .custom<File>()
    .transform((image) => {
      if (image !== null) {
        return handleImageUpload(image!!)
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
  description: z.string().optional(),
})

export const addTipsSchema = z.object({
  title: z.string().min(1, "Insira um título"),
  content: z.string().min(1, "Escreva alguma dica"),
  author: z.string().min(1, "Adicione um autor para esta dica"),
  mainImage: z
    .custom<File>()
    .refine((image) => image !== undefined, "Insira uma imagem")
    .transform(async (file) => await handleImageUpload(file)),
})

export const editTipSchema = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),
  image: z.union([z.custom<File>(), z.string()]),
})

export const addPartnerSchema = z.object({
  author: z.string().min(1, "Escolha autor"),
  title: z.string().min(1, "Insira um título"),
  content: z.string().min(1, "Escreva algum conteúdo"),
  image: z
    .custom<File>()
    .refine((file) => file !== undefined, "Insira uma imagem")
    .transform((file) => {
      if (file) {
        return handleImageUpload(file)
      }
    }),
})

export const editPartnerSchema = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),
  image: z.union([z.custom<File>(), z.string()]),
})

export type EditPartnerType = z.infer<typeof editPartnerSchema>
export type EditTipType = z.infer<typeof editTipSchema>
export type AddTipsType = z.infer<typeof addTipsSchema>
export type LoginInSchema = z.infer<typeof loginSchema>
export type UserFormType = z.infer<typeof userFormSchema>
export type AddPartnerType = z.infer<typeof addPartnerSchema>
export type PostFormSchemaType = z.infer<typeof postFormSchema>
export type TourFormSchemaType = z.infer<typeof tourFormSchema>
export type EditUserFormType = z.infer<typeof editUserFormSchema>
export type ProductFormSchema = z.infer<typeof productFormSchema>
export type ScheduleFormSchemaType = z.infer<typeof scheduleFormSchema>
export type EditTourFormSchemaType = z.infer<typeof editTourFormSchema>
export type EditPostFormSchemaType = z.infer<typeof editPostFormSchema>
export type EditProductFormSchemaType = z.infer<typeof editProductFormSchema>
export type EditScheduleFormSchemaType = z.infer<typeof editScheduleFormSchema>
