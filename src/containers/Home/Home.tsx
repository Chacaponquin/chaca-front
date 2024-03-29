import {
  ContentLoader,
  CreationLoadingModal,
  DatasetPlayground,
  FieldsMenu,
  HomeLayout,
  NoDatasetsMessage,
} from "./components"
import { useHome } from "./hooks"
import { useContext } from "react"
import { HomeContext } from "./context"

export default function Home() {
  const { smallWindow } = useContext(HomeContext)

  const {
    handleExportSelectedDataset,
    createDataLoading,
    handleAddNewField,
    handleCreateAllDatasets,
    handleAddDataset,
    datasets,
    showFieldsMenu,
  } = useHome()

  const showMenu = !smallWindow || (smallWindow && showFieldsMenu)

  return (
    <HomeLayout>
      <ContentLoader />

      {datasets.length === 0 && <NoDatasetsMessage handleCreateDataset={handleAddDataset} />}

      {datasets.length > 0 && (
        <main className="flex flex-grow">
          {createDataLoading && <CreationLoadingModal />}

          {showMenu && (
            <FieldsMenu
              handleExportSelectedDataset={handleExportSelectedDataset}
              handleAddNewField={handleAddNewField}
            />
          )}

          <DatasetPlayground
            handleAddDataset={handleAddDataset}
            handleCreateAllDatasets={handleCreateAllDatasets}
          />
        </main>
      )}
    </HomeLayout>
  )
}
