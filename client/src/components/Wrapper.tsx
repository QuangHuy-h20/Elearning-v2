import { ReactNode } from "react"

interface IFormWrapperProps{
    children: ReactNode
}

const Wrapper = ({children}: IFormWrapperProps) => {
    return (
        <section className="flex justify-center items-center flex-col my-32">
            {children}
        </section>
    )
}

export default Wrapper
