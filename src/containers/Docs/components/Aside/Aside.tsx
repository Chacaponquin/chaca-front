import { Sections } from "@containers/Docs/shared/components"
import { Header } from "./components"
import { SelectedDoc } from "@containers/Docs/interfaces"

interface Props {
  open: boolean
  handleClose(): void
  handleChangeSelectedDoc(section: SelectedDoc): void
  selectedDoc: SelectedDoc | null
}

export default function Aside({ handleClose, open, handleChangeSelectedDoc, selectedDoc }: Props) {
  return (
    <div
      className="w-full h-screen bg-scale-4/70 fixed top-0 left-0 z-[999] pr-5"
      onClick={handleClose}
      style={{ display: open ? "flex" : "none" }}
    >
      <aside
        className="h-full flex flex-col w-full max-w-[400px] shadow-lg dark:bg-scale-4 bg-white overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Header handleClose={handleClose} />
        <Sections handleChangeSelectedDoc={handleChangeSelectedDoc} selectedDoc={selectedDoc} />
      </aside>
    </div>
  )
}
