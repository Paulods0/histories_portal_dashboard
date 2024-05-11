export type NewExcursionPost = {
  title: string
  mainImage: string
  content: string
  highlighted: boolean
  category: string
  latitude: number
  longitude: number
  tag?: string[]
  author_notes?: string
  author_id: string
}
export type NewPost = {
  title: string
  mainImage: string
  content: string
  highlighted: boolean
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
