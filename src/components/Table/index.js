import React, { Fragment, useState, useEffect } from "react";
import { getSortedData } from "../../api";
import { fetchTable } from "../../redux/helpers";

const Down = () => (
  <svg className="inline" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
  </svg>
);

const Up = () => (
  <svg className="inline" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
  </svg>
);

const Table = ({ data, rowCount, setLoading }) => {
  const [labelOrder, setLabelOrder] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const temp = {};
    [...data.labels].forEach(item => {
      Object.assign(temp, { [item]: "asc" });
    });
    setLabelOrder(temp);
  }, [data]);
  return (
    <Fragment>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {data.labels.map((label, i) => (
              <Fragment key={label + i}>
                <th
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider truncate md:overflow-clip cursor-pointer"
                  onClick={async () => {
                    const t = { [selectedFilter]: "asc", [label]: labelOrder[label] === "asc" ? "desc" : "asc" };
                    setLoading(true);
                    const params = { order: labelOrder[label], filter: label };
                    getSortedData(params.order, params.filter)
                      .then(res => {
                        fetchTable({ labels: data.labels, items: res.data.items, total: res.data.total || res.data.items.length });
                        setLabelOrder(state => ({ ...state, ...t }));
                        setSelectedFilter(label);
                      })
                      .catch(err => console.error(err))
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                >
                  {label}
                  {selectedFilter === label && (labelOrder[label] === "desc" ? <Up /> : <Down />)}
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
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm mw-240" title={item[label] || "-"}>
                      <p className="text-gray-900 whitespace-no-wrap truncate md:overflow-clip">{item[label] || "-"}</p>
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
