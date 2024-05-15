import { Role } from "./data"

export type NewTourPost = {
  title: string
  content: string
  tag?: string[] | string
  category: string
  mainImage: string
  highlighted: boolean
  author: string
  latitude: string
  longitude: string
  category_slug?: string
  author_notes: author_notes
}
export type NewPost = {
  title: string
  mainImage: string
  content: string
  highlighted: boolean
  latitude?: string
  longitude: string
  category: string
  tag?: string[]
  author_notes?: string
  author_id: string
}

export type NewPostCategory = {
  name: string
  user_id: string
}

export type NewProduct = {
  image: string
  name: string
  price: string
  category: string
}
export interface NewUser {
  firstname: string
  lastname: string
  image?: string
  email: string
  password: string
  role: string
}
export type NewSchedulePost = {
  title: string
  file: string
  category: string
  author: string
}

export type NewClassifiedPost = {
  title: string
  author: {
    firstname: string
    lastname: string
    email: string
    phone: string
  }
  mainImage: string
  content: string
  category: string
  price: string
  category_slug: string
}
