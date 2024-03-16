export enum API_URL {
  GET_ALL_POSTS = "post/get",
}

export function getImagePathFromFirebaseURL(imageURL: string): string {
  const imagePathArray = imageURL.split("/o/images%2F")
  const imageName = imagePathArray[1].split("?alt=")[0]

  return imageName
}
