export type User = {
  _id: string
  firstname: string
  lastname: string
  email: string
  image?: string
  posts: PostData[]
  createdAt: string
}
export type CategoryData = {
  _id: string
  name: string
  createdAt: string
  creator: {
    firstname: string
    lastname: string
  }
}
export type NewExcursionPost = {
  title: string
  mainImage: string
  content: string
  highlighted: boolean
  category: string
  latitude: string
  longitude: string
  tag?: string[]
  author_notes: string
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

export type Author = {
  _id: string
  image: string
  firstname: string
  lastname: string
}

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
  author: string
}

export type PostData = {
  _id: string
  title: string
  mainImage: string
  content: string
  highlighted: boolean
  category: CategoryData
  createdAt: string
  latitude: string
  longitude: string
  tag: string[]
  author_notes: string
  rating: string
  deslikes: number
  views: number
  author_id: string
  author: {
    _id: string
    image: string
    firstname: string
    lastname: string
  }
}
export type ProductData = {
  _id: string
  image: string
  name: string
  price: string
  quantity: number
  category: {
    _id: string
    name: string
  }
  createdAt: string
}
