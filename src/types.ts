export interface ICategoryData {
  _id: string
  name: string
}
export interface IPostData {
  _id: string
  title: string
  subtitle: string
  mainImage: string
  content: string
  isHighlighted: boolean
  category: {
    name: string
  }
  createdAt: string
}

export interface IProduct {
  image: string
  name: string
  price: string
  category: {
    name: string
  }
  createdAt: string
}
