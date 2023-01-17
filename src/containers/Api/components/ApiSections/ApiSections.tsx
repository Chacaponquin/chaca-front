import { ApiSection } from "../../interfaces/apiSections.interface"
import { ApiSearch, ApiSectionsHeader, SectionsContainer } from "./components"

export default function ApiSections({
  sections,
  selectSection,
  handleSelectSubSection,
}: {
  sections: Array<ApiSection>
  selectSection: string | null
  handleSelectSubSection: (route: string) => void
}) {
  return (
    <div className='h-screen min-w-[300px] max-w-[300px] border-r-2 gap-y-1 flex flex-col'>
      <ApiSectionsHeader />

      <div className='px-4 py-2'>
        <ApiSearch />
        <SectionsContainer
          selectSection={selectSection}
          sections={sections}
          handleSelectSubSection={handleSelectSubSection}
        />
      </div>
    </div>
  )
}