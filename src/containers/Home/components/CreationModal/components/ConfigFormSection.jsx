import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import React, { useContext } from "react";
import { DatasetsContext } from "../../../../../shared/context/DatasetsContext";
import { CONFIG_ACTIONS } from "../../../helpers/reducer/ActionTypes";
import FileArguments from "./FileArguments";
import { UserContext } from "../../../../../shared/context/UserContext";
import Icon from "supercons";

const ConfigFormSection = () => {
  const divClass = "flex items-center gap-3";
  const textClass = "mb-0 font-fontRegular text-xl esm:text-lg";

  const { configDispatch, config, fileConfigOptions } =
    useContext(DatasetsContext);

  return (
    <div className="flex flex-col w-[40%] gap-2 esm:w-full">
      <h1 className="font-fontBold text-3xl esm:text-2xl">Options:</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-fontBold text-xl">Formato:</h1>
          <Dropdown
            options={fileConfigOptions.map((f) => f.fileType)}
            value={config.file.fileType}
            onChange={(e) => {
              configDispatch({
                type: CONFIG_ACTIONS.CHANGE_FILE_TYPE,
                payload: {
                  value: {
                    fileType: e.value,
                    arguments: {},
                  },
                },
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <FileArguments />

          <div className={divClass}>
            <NoUserPrivateConfig>
              <Checkbox
                onChange={(e) => {
                  configDispatch({
                    type: CONFIG_ACTIONS.CHANGE_SAVE_SCHEMA,
                    payload: { value: e.checked },
                  });
                }}
                checked={config.saveSchema}
              />
            </NoUserPrivateConfig>

            <p className={textClass}>Save Schema</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoUserPrivateConfig = ({ children }) => {
  const { actualUser } = useContext(UserContext);

  return (
    <>
      {!actualUser ? (
        <div>
          <Icon glyph="private-outline" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ConfigFormSection;