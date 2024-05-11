export type UpdateProduct = {
  id: string
  name?: string
  price?: string
  image?: string | File | undefined
  category?: string
}

export type UpdateUser = {}

export type UpdatePost = {
  title?: string
  mainImage?: string
  content?: string
  highlighted?: boolean
  category?: string
  latitude?: number | null
  longitude?: number | null
  tag?: string[]
  author_notes?: string
  author_id: string
}

export type UpdatePostCategory = {
  id: string
  name: string
}

export type UpdateProductCategory = {}
