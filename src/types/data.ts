export type User = {
  _id: string
  firstname: string
  lastname: string
  email: string
  image?: string
  posts: Post[]
  createdAt: string
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
  tag?: string | string[]
  author_notes?: string
  rating: string
  deslikes: number
  views: number
  author_id: string
  author: User
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
