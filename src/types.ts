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
  category: ICategoryData
  createdAt: string
}

export interface IProductData {
  _id: string
  image: string
  name: string
  price: string
  category: {
    _id: string
    name: string
  }
  createdAt: string
}
