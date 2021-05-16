import React, { Fragment } from "react";
import { connect } from "react-redux";
import XLSX from "xlsx";
import { postTableData } from "../../api";
import { fetchTable } from "../../redux/helpers";
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

const Upload = () => {
  const handleUpload = e => {
    e.preventDefault();
    const { files } = e.currentTarget;
    handleFile(files[0]);
  };
  const handleFile = async (file /*:File*/) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    const response = {
      labels: [],
      items: [],
    };
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {
        header: 1,
      });
      /* Update state */
      const resp = { data: data, cols: make_cols(ws["!ref"]) };

      response.labels = resp.data[0];
      [...response.labels].forEach((label, i) => {
        const temp = resp.data[i + 1];
        const record = {};
        [...response.labels].forEach((labelItem, idx) => {
          Object.assign(record, { [labelItem]: temp[idx] });
        });
        response.items.push(record);
      });
    };
    await postTableData(response.items).then(_ => {
      fetchTable(response);
    });
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };
  return (
    <Fragment>
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6 max-w-4xl m-auto">
        <h1>Upload CSV to proceed</h1>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Click to upload a file</span>
                <input id="file-upload" name="file-upload" accept=".csv" type="file" className="sr-only hidden" onChange={handleUpload} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">CSV File upto 10MB</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  const { table = {} } = state;
  return { table };
}

export default connect(mapStateToProps, {})(Upload);
