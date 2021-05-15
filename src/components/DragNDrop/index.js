import React, { Fragment } from "react";
import { CSVReader } from "react-papaparse";

const DragNDrop = () => {
  const handleOnDrop = data => {
    const response = {
      labels: [],
      items: [],
    };
    response.labels = data[0].data;
    [...response.labels].forEach((label, i) => {
      const temp = data[i + 1]["data"];
      const record = {};
      [...response.labels].forEach((labelItem, idx) => {
        Object.assign(record, { [labelItem]: temp[idx] });
      });
      response.items.push(record);
      localStorage.setItem("table_data", JSON.stringify(response));
    });
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = data => {
    localStorage.setItem("table_data", JSON.stringify({}));
  };
  return (
    <Fragment>
      <div className={`m-auto flex items-center justify-center w-screen text-base font-bold text-gray-500 max-w-4xl max-h-9 cursor-pointer`}>
        <h5 className="pr-8">Click and Drag Upload</h5>
        <CSVReader onDrop={handleOnDrop} onError={handleOnError} addRemoveButton onRemoveFile={handleOnRemoveFile}>
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </div>
    </Fragment>
  );
};

export default DragNDrop;
