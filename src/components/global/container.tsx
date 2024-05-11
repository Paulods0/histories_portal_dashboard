import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <section className={twMerge("px-4 mx-auto lg:px-12 w-full", className)}>
      {children}
    </section>
  )
}

export default Container
