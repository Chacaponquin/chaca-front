import { InputNumber } from "primereact/inputnumber";
import React from "react";
import { useState, useContext } from "react";
import Icon from "supercons";
import { DatasetsContext } from "../../../../../shared/context/DatasetsContext";
import { UserContext } from "../../../../../shared/context/UserContext";
import { DATASETS_ACTIONS } from "../../../helpers/reducer/ActionTypes";

const AddFieldButton = () => {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className="w-full flex justify-end items-center">
      <div className="flex flex-col">
        <div
          className="flex justify-center items-center w-[40px] h-[40px] rounded-full hover:bg-slate-100 transition-all duration-300 cursor-pointer"
          onClick={() => setOpenOptions(!openOptions)}
        >
          <Icon glyph="more" />
        </div>

        {openOptions && (
          <div className="absolute px-8 py-4 shadow-md rounded-md bg-white flex flex-col gap-3 -translate-x-[80%] translate-y-[35px] text-base">
            <AddField />
            <InputCantDoc />
          </div>
        )}
      </div>
    </div>
  );
};

const AddField = () => {
  const { dispatch, selectedDataset } = useContext(DatasetsContext);

  return (
    <button
      className="items-center flex gap-3"
      onClick={() =>
        dispatch({
          type: DATASETS_ACTIONS.ADD_NEW_FIELD,
          payload: { datasetID: selectedDataset.id },
        })
      }
      type="button"
    >
      <Icon glyph="plus" size={25} />
      <p className="mb-0 whitespace-nowrap">Add Field</p>
    </button>
  );
};

const InputCantDoc = () => {
  const { selectedDataset, dispatch, noUserLimits } =
    useContext(DatasetsContext);
  const { actualUser } = useContext(UserContext);

  return (
    <div className="flex items-center gap-3 justify-center">
      <Icon glyph="docs" size={25} />
      <InputNumber
        value={selectedDataset.limit}
        onValueChange={(e) => {
          dispatch({
            type: DATASETS_ACTIONS.CHANGE_DATASET_LIMIT,
            payload: {
              datasetID: selectedDataset.id,
              value: e.value,
            },
          });
        }}
        min={1}
        max={
          actualUser ? actualUser.limitDocuments : noUserLimits.LIMIT_DOCUMENTS
        }
        className="w-[100px]"
      />
    </div>
  );
};

export default AddFieldButton;
