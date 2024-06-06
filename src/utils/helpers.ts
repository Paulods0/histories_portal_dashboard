import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { storage } from "../config/firebase"
import { toast } from "react-toastify"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import imageCompression from "browser-image-compression"

type firebaseFolder =
  | "posts"
  | "classified-posts"
  | "products"
  | "profile"
  | "schedule-posts"
  | "posts-content"
  | "tips"

export function getImagePathFromFirebaseURL(
  imageURL: string,
  folder: firebaseFolder
): string {
  const imagePathArray = imageURL.split(`/o/${folder}%2F`)
  const imageName = imagePathArray[1].split("?alt=")[0]

  return imageName
}

export async function deleteImageFromFirebase(
  image: string,
  firebaseFolder: firebaseFolder
) {
  const imageName = getImagePathFromFirebaseURL(image, firebaseFolder)

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
  firbaseImageFolderPath: firebaseFolder
) {
  const filename = renameImageName(image?.name)
  const imageRef = ref(storage, `${firbaseImageFolderPath}/` + filename)
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

export const formatDate = (date: string) => {
  const reformatedDate = format(date, "dd 'de' LLLL 'de' yyyy", {
    locale: pt,
  })

  return reformatedDate
}

export const validateInputFields = (...inputs: string[]) => {
  if (!inputs) {
    toast.error("Por favor preencha todos os campos obrigatórios.")
    return
  }
}

export async function handleImageUpload(img: File) {
  const imageFile = img
  // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  }

  try {
    const compressedFile = await imageCompression(imageFile, options)
    // console.log(`newFile size ${compressedFile.size / 1024 / 1024} MB`)
    return compressedFile
  } catch (error) {
    console.log(error)
  }
}
