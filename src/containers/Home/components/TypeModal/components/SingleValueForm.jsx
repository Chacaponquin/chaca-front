import React from "react";
import FieldOptionDiv from "./FieldOptionDiv";
import ParentDiv from "./ParentDiv";

const SingleValueForm = ({
  fieldsOptions,
  typeInfo,
  handleChangeParentSelected,
  handleChangeOptionSelected,
  handleChangeArguments,
}) => {
  return (
    <>
      <div className="flex sm:flex-col gap-3 px-2 sm:h-full overflow-auto sm:w-[230px] w-full sm:py-0 py-4 h-[80px]">
        {fieldsOptions.map((el, i) => (
          <ParentDiv
            key={i}
            parent={el}
            handleChangeParentSelected={handleChangeParentSelected}
            isSelected={el.id === typeInfo.parent.id}
          />
        ))}
      </div>

      <div className="sm:h-full grid xl:grid-cols-4 grid-cols-2 esm:grid-cols-1 auto-rows-max overflow-auto gap-3 w-full">
        {typeInfo.parent &&
          typeInfo.parent.fields.map((el, i) => (
            <FieldOptionDiv
              field={el}
              key={i}
              isSelected={el.name === typeInfo.type.name}
              handleChangeOptionSelected={handleChangeOptionSelected}
              handleChangeArguments={handleChangeArguments}
              allArguments={typeInfo.args}
            />
          ))}
      </div>
    </>
  );
};

export default SingleValueForm;