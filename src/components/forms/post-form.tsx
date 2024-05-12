import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useAuthContext } from "@/context/auth-context"
import { PostFormSchemaType, postFormSchema } from "@/types/form-schema"

// import { useCreatePost } from "@/lib/react-query/mutations"

// import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import InputField from "./form-ui/input-field"
import InputCheckbox from "./form-ui/input-checkbox"

import TextAreaField from "./form-ui/text-area-field"
import { useAuthContext } from "@/context/auth-context"

import { ClipLoader } from "react-spinners"

type Props = {
  content: string
  category: string
  authorId: string
}

const PostForm = ({ content, category, authorId }: Props) => {
  // const navigate = useNavigate()
  // const { mutate } = useCreatePost()
  const { userId } = useAuthContext()

  const postFormProvider: UseFormReturn<PostFormSchemaType> =
    useForm<PostFormSchemaType>({
      resolver: zodResolver(postFormSchema),
      mode: "all",
    })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = postFormProvider

  setValue("content", content)
  setValue("category", category)

  const handleSubmitForm = async (data: PostFormSchemaType) => {
    console.log({ ...data, author_id: authorId ? authorId : userId })
    // setIsLoading(true)
    // try {
    //   if (!data.title || !category || !file || !content) {
    //     toast.error("Preencha todos os dados obrigatórios.")
    //     setIsLoading(false)
    //     return
    //   }

    //   const imageURL = await uploadImageToFirebaseStorage(file, "posts")

    //   const post: NewPost = {
    //     tag: data.tags,
    //     content: content,
    //     mainImage: imageURL,
    //     title: data.title,
    //     category: category,
    //     highlighted: data.hightlight,
    //     author_notes: data.author_notes,
    //     author_id: authorId ? authorId : userId!!,
    //   }

    //   mutate(post)
    //   setIsLoading(false)
    //   toast.success("Publicado com sucesso")
    //   navigate("/posts")
    //   console.log(post)
    // } catch (error) {
    //   setIsLoading(false)
    //   toast.error("Erro ao publicar o post")
    //   console.log("Erro: " + error)
    // }
  }

  return (
    <FormProvider {...postFormProvider}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-3 w-full h-auto"
      >
        <Button disabled={isSubmitting} type="submit" className="sticky top-0">
          {isSubmitting ? <ClipLoader size={14} /> : "Publicar"}
        </Button>

        {errors.content && (
          <span className="text-xs text-red-600 self-end ">
            {errors.content.message}
          </span>
        )}

        {errors.category && (
          <span className="text-xs text-red-600 self-end ">
            {errors.category.message}
          </span>
        )}

        <InputField
          type="file"
          className="file:text-zinc-400"
          error={errors.image}
          label="Adicionar imagem"
          {...register("image")}
        />

        <InputField
          error={errors.title}
          label="Título"
          {...register("title")}
        />

        <InputField label="Tags (opcional)" {...register("tags")} />

        <InputCheckbox
          label="Destacar"
          {...register("hightlight")}
          type="checkbox"
        />

        <TextAreaField
          {...register("author_notes")}
          label="Notas do autor (opcional)"
        />
      </form>
    </FormProvider>
  )
}
export default PostForm
