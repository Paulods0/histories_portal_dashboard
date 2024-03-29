import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { storage } from "../config/firebase"
import { toast } from "react-toastify"

export function getImagePathFromFirebaseURL(
  imageURL: string,
  folder: string
): string {
  const imagePathArray = imageURL.split(`/o/${folder}%2F`)
  const imageName = imagePathArray[1].split("?alt=")[0]
  // firebasestorage.googleapis.com/v0/b/history-post.appspot.com/o/products%2F1710710391446114.jpg?alt=media&token=d7eb81c8-a277-4584-8a5b-5c3dde0a6a33
  https: console.log(imageName)

  return imageName
}

export async function deleteImageFromFirebase(
  image: string,
  firebaseFolder: string
) {
  const imageName = getImagePathFromFirebaseURL(image, firebaseFolder)
  console.log(imageName)
  const imageRef = ref(storage, `${firebaseFolder}/${imageName}`)
  await deleteObject(imageRef)
}

export function renameImageName(image: string) {
  const regex = /[^\w\s]/g
  const imageName = image.split(".")
  const ext = imageName[imageName.length - 1]
  const name = imageName[0]
  const rawName = new Date().getTime() + "-" + name
  const rawNameWithouNonAlphaNumeric = rawName.replace(regex, "")
  const filename = rawNameWithouNonAlphaNumeric.concat(`.${ext}`)

  return filename
}

export async function uploadImageToFirebaseStorage(
  image: File,
  firbaseImageFolderPath: string
) {
  const filename = renameImageName(image?.name)
  const imageRef = ref(storage, firbaseImageFolderPath + filename)
  const uploadTask = uploadBytesResumable(imageRef, image)

  await new Promise((resolve: (value?: unknown) => void, reject) => {
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        toast.error(error.message, {
          autoClose: 1000,
          hideProgressBar: true,
        })
        reject()
      },
      () => {
        resolve()
      }
    )
  })
  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
  return downloadURL
}
