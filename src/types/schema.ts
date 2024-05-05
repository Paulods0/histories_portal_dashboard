import { z } from "zod"

export const scheduleFormSchema = z.object({
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

export type ScheduleFormSchemaType = z.infer<typeof scheduleFormSchema>

// #######################################

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

export type TourFormSchemaType = z.infer<typeof tourFormSchema>
