import { useModal } from "@modules/modal/hooks"
import React, { useEffect } from "react"
import { ModalButtons, ModalTitle } from "./components"

interface Props {
  children: React.ReactNode
  width?: number
  title: string
  handleNext: () => void
  nextText: string
  type: "delete" | "edit"
  nextButtonId?: string
  name: string
}

export default function ModalContainer({
  children,
  width = 500,
  handleNext,
  nextText,
  title,
  type,
  name,
}: Props) {
  const { handleCloseModal } = useModal()

  function handleCloseWithClick(key: KeyboardEvent) {
    if (key.key === "Enter" && !key.shiftKey) {
      handleNext()
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    handleNext()
  }

  function handleClose() {
    document.removeEventListener("keypress", handleCloseWithClick)
    handleCloseModal()
  }

  useEffect(() => {
    document.addEventListener("keypress", handleCloseWithClick)

    return () => {
      document.removeEventListener("keypress", handleCloseWithClick)
    }
  }, [handleNext])

  return (
    <div
      onClick={handleClose}
      id={`${name}-modal`}
      className="w-full fixed top-0 left-0 h-screen bg-grayColor/50 z-[999] flex justify-center items-center"
    >
      <form
        className="bg-white dark:bg-darkColorLight flex flex-col rounded-md px-10 py-5 shadow-md text-black dark:text-white"
        style={{ minWidth: `${width}px` }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        autoFocus={true}
      >
        <ModalTitle titleText={title} />
        {children}
        <ModalButtons type={type} nextText={nextText} />
      </form>
    </div>
  )
}
