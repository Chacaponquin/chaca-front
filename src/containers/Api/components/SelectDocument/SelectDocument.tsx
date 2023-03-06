import MDView from "@modules/shared/components/MDView/MDView"

const SelectDocument = ({ content }: { content: string }) => {
  return (
    <div className='w-full flex items-start py-4 px-10 h-full overflow-y-auto'>
      <MDView content={content} />
    </div>
  )
}

export default SelectDocument
