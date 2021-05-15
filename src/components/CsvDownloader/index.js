import React, { Fragment } from "react";
import { CSVDownloader } from "react-papaparse";

const CsvDownloader = ({ data = [], filename = "downloaded-csv" }) => {
  const timestamp = new Date().getTime();
  return (
    <Fragment>
      <CSVDownloader
        className="p-2 border-2 border-green-400 rounded-lg text-white bg-green-400 my-2 font-semibold"
        data={data}
        type="button"
        filename={`${timestamp.toString()}-downloaded-csv`}
      >
        Download
      </CSVDownloader>
    </Fragment>
  );
};

export default CsvDownloader;
