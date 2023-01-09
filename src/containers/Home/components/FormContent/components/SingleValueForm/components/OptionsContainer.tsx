import { useContext, useState } from "react";
import { SubOption } from "../../../../../../../shared/interfaces/options.interface";
import { Config } from "../../../../../../../shared/assets/icons";
import clsx from "clsx";
import {
  DatasetField,
  SingleValueDataType,
} from "../../../../../../../shared/interfaces/datasets.interface";
import { DatasetsContext } from "../../../../../../../shared/context/DatasetsContext";
import { DATASETS_ACTIONS } from "../../../../../constants/ACTION_TYPES";
import { DATA_TYPES } from "../../../../../../../shared/constant/DATA_TYPES";
import OptionArguments from "./OptionArguments";
import { useUtils } from "../../../../../hooks/useUtils";
import ChacaRadioButton from "../../../../../../../shared/components/ChacaRadioButton/ChacaRadioButton";

const OptionsContainer = ({
  options,
  field,
}: {
  options: SubOption[];
  field: DatasetField<SingleValueDataType>;
}) => {
  return (
    <div className="flex flex-col gap-1 px-5">
      {options.map((o, i) => (
        <Option
          option={o}
          key={i}
          field={field}
          isSelected={field.dataType.fieldType.type === o.name}
        />
      ))}
    </div>
  );
};

const Option = ({
  option,
  field,
  isSelected,
}: {
  option: SubOption;
  field: DatasetField<SingleValueDataType>;
  isSelected: boolean;
}) => {
  const { findType } = useUtils();
  const { selectedDataset, datasetDispatch } = useContext(DatasetsContext);
  const args = findType(
    field.dataType.fieldType.parent,
    field.dataType.fieldType.type
  ).arguments;

  const [openArguments, setOpenArguments] = useState(isSelected);

  const handleSelectOption = () => {
    datasetDispatch({
      type: DATASETS_ACTIONS.CHANGE_FIELD_DATATYPE,
      payload: {
        datasetID: selectedDataset.id,
        fieldID: field.id,
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: {
            args: {},
            parent: field.dataType.fieldType.parent,
            type: option.name,
          },
        },
      },
    });
  };

  const divClass = () => {
    return clsx(
      "w-full rounded-md flex items-center flex-col py-2 px-4",
      {
        "bg-principalColor text-white fill-white": isSelected,
      },
      { "bg-slate-100 text-block fill-black": !isSelected }
    );
  };

  return (
    <div className={divClass()}>
      <div className="flex items-center w-full justify-between ">
        <div className="flex items-center">
          <ChacaRadioButton
            value={isSelected}
            onChange={() => handleSelectOption()}
          />

          <p className="text-base ml-4">{option.name}</p>
        </div>

        <button
          className="cursor-pointer"
          onClick={() => setOpenArguments(!openArguments)}
        >
          <Config size={20} />
        </button>
      </div>

      {openArguments && args.length > 0 && (
        <OptionArguments args={args} field={field} />
      )}
    </div>
  );
};

export default OptionsContainer;
