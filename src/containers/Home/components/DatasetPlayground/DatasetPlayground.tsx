import ReactFlow, { Controls, Background } from "reactflow"
import { DatasetCard, DatasetsButtons } from "./components"
import { usePlayground } from "@modules/datasets/hooks"
import { useTheme } from "@modules/app/modules/theme/hooks"
import { THEME } from "@modules/app/modules/theme/constants"

import "reactflow/dist/style.css"
import "./styles/custom-playground.css"

interface Props {
  handleCreateAllDatasets(): void
  handleAddDataset(): void
}

const nodeTypes = {
  custom: DatasetCard,
}

export default function DatasetPlayground({ handleAddDataset, handleCreateAllDatasets }: Props) {
  const { edges, nodes, onEdgesChange, onNodesChange, onConnect } = usePlayground()
  const { theme } = useTheme()

  const color = theme === THEME.DARK ? "#ffffff" : "#000000"

  return (
    <section className="w-full h-full flex flex-col dark:bg-scale-2 bg-scale-12">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
      >
        <DatasetsButtons
          handleAddDataset={handleAddDataset}
          handleCreateAllDatasets={handleCreateAllDatasets}
        />

        <Controls position="top-left" />

        <Background color={color} />
      </ReactFlow>
    </section>
  )
}
