export interface IUser {
  id: string
  firstname: string
  lastname: string
  email: string
  image?: string
}
export interface ICategoryData {
  _id: string
  name: string
  createdAt: string
  creator: {
    firstname: string
    lastname: string
  }
}
export interface IPostData {
  _id: string
  title: string
  subtitle: string
  mainImage: string
  content: string
  isHighlighted: boolean
  category: ICategoryData
  createdAt: string
  author: {
    _id: string
    firstname: string
    lastname: string
  }
  views: number
}
export interface IProductData {
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
