import React, { Fragment } from "react";

const Table = ({ data, rowCount }) => {
  return (
    <Fragment>
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            {data.labels.map((label, i) => (
              <Fragment key={label + i}>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider truncate md:overflow-clip">
                  {label}
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...data.items].slice(0, rowCount).map((item, i) => (
            <Fragment key={i}>
              <tr>
                {data.labels.map((label, idx) => (
                  <Fragment key={item[label] + idx}>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm mw-240" title={item[label] || "-"}>
                      <p class="text-gray-900 whitespace-no-wrap truncate md:overflow-clip">{item[label] || "-"}</p>
                    </td>
                  </Fragment>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
export default Table;
