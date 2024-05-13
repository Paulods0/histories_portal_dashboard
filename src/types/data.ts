export type Role = "admin" | "store-manager" | "publicator"

export type User = {
  _id: string
  firstname: string
  lastname: string
  email: string
  image?: string
  posts: Post[]
  createdAt: string
  role: Role
}
export type Category = {
  _id: string
  name: string
  createdAt: string
  creator: User
}

export type Post = {
  _id: string
  title: string
  mainImage: string
  content: string
  highlighted: boolean
  category: Category
  createdAt: string
  latitude: string
  longitude: string
  tag?: string[]
  author_notes?: string
  rating: string
  deslikes: number
  views: number
  author_id: string
  author: User
}

export type SchedulePost = {
  author: User
  file: string
  title: string
  category: string
  createdAt: string
}

export type Product = {
  _id: string
  image: string
  name: string
  price: string
  quantity: number
  category: Category
  createdAt: string
}
