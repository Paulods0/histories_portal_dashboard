import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../config/firebase"
import { toast } from "react-toastify"

export function getImagePathFromFirebaseURL(imageURL: string): string {
  const imagePathArray = imageURL.split("/o/images%2F")
  const imageName = imagePathArray[1].split("?alt=")[0]
  console.log(imageName)

  return imageName
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

