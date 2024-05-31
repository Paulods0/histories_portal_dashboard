export type UpdateProduct = {
  id: string
  name?: string
  price?: string
  category?: string
  description?: string
  image?: string | File | undefined
}

export type UpdateUser = {
  id: string
  image?: File | undefined
  firstname?: string | undefined
  lastname?: string | undefined
  role?: string | undefined
}

export type EditPost = {
  title?: string
  mainImage?: string
  content?: string
  highlighted?: boolean
  latitude?: string
  longitude: string
  category?: string
  tag?: string[]
  author_notes?: string
  author_id?: string
}

export type UpdatePost = {
  title?: string
  mainImage?: string | false | File | null
  content?: string
  highlighted?: boolean
  category?: string
  latitude?: string
  longitude?: string
  tag?: string[] | string
  author_notes?: string
  author: string
}

export type UpdateSchedulePost = {
  id?: string
  title?: string
  file?: string
  category?: string
  author?: string
}

export type UpdatePostCategory = {
  id: string
  name: string
}

export type UpdateProductCategory = {}
