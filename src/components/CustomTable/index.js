import React, { Fragment, useState } from "react";
import Table from "../Table";
import DATA from "../../constant/data.json";

const CustomTable = () => {
  const rowCount = [5, 10, 20, 30, 40, 50];
  const [data, setData] = useState(DATA);
  const [search, setSearch] = useState(null);
  const [selectedSearchFilter, setSelectedSearchFilter] = useState(-1);
  const [selectedRowCount, setSelectedRowCount] = useState(0);

  return data ? (
    <Fragment>
      <div className="antialiased font-sans bg-gray-300">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Users</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <button className="w-full flex justify-center p-3 border border-transparent text-lg  font-normal rounded-md text-white bg-primary hover:bg-primary-800 focus:outline-none focus:ring-blue transition duration-150 ease-in-out">
                    Export
                  </button>
                </div>
                <div className="relative">
                  <select
                    className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="row_count"
                    onChange={e => {
                      const { value } = (e || {}).currentTarget || {};
                      setSelectedRowCount(value);
                    }}
                  >
                    {rowCount.map((row, i) => (
                      <option key={row + "-" + i} value={i} selected={i === selectedRowCount}>
                        {row}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select
                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                    name="searchFilter"
                    onChange={e => {
                      const { value } = (e || {}).currentTarget || {};
                      setSelectedSearchFilter(value);
                    }}
                  >
                    <option value={null} selected>
                      Select Search Filter
                    </option>
                    {data.labels.map((label, i) => (
                      <Fragment key={i + label}>
                        <option value={label} selected={i === selectedSearchFilter}>
                          {label}
                        </option>
                      </Fragment>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <Table data={data} rowCount={rowCount[selectedRowCount]} />
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <span className="text-xs xs:text-sm text-gray-900">
                    Showing 1 to {Math.floor(data.items.length / rowCount[selectedRowCount])} of {data.items.length} Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">Prev</button>
                    <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment />
  );
};
export default CustomTable;
