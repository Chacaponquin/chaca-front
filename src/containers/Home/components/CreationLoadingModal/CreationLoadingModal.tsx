import { LoaderContainer } from "@modules/app/components/Loader"

export default function CreationLoadingModal() {
  return (
    <div className="w-screen h-screen fixed bg-scale-5 top-0 left-0 z-[999] flex justify-center items-center overflow-hidden">
      <div className="px-10 py-10 w-full h-full flex flex-col items-center bg-white dark:bg-scale-3 justify-center overflow-hidden gap-20">
        <LoaderContainer size={200} loading={true} />
      </div>
    </div>
  )
}
