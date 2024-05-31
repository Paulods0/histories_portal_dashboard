export type Role = "admin" | "store-manager" | "publicator"
export type ClassifiedStatus = "active" | "suspended" | "inactive"
export type ClassifiedType = "buy" | "sell"

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
  creator: User
  createdAt: string
}

export type Post = {
  _id: string
  title: string
  mainImage: string
  content: string
  highlighted: boolean
  category: string
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
  category_slug: string
}

export type SchedulePost = {
  _id: string
  author: User
  file: string
  title: string
  category: string
  createdAt: string
}

export type ClassifiedPost = {
  _id: string
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
  status: ClassifiedStatus
  type: ClassifiedType
}

export type Product = {
  _id: string
  image: string
  name: string
  price: string
  category: string
  quantity: number
  createdAt: string
  description: string
}
