import axios from "axios";
const BASE_URL = "https://2akek6xvsc.execute-api.ap-south-1.amazonaws.com/dev";
// const BASE_URL = "http://localhost:3000/dev";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getPaginatedData = (limit, offset = 0) => {
  return instance({
    method: "get",
    url: `/${offset}/${limit}`,
  });
};

export const postTableData = items => {
  return instance({
    method: "post",
    url: `/`,
    data: items,
  });
};

export const getAll = () => {
  return instance({
    method: "get",
    url: "/",
  });
};
export const getSortedData = (order, filter) => {
  return instance({
    method: "get",
    url: `/${order}/${filter}`,
  });
};

export const getSearchData = payload => {
  return instance({
    method: "post",
    url: `/search`,
    data: { ...payload },
  });
};

// {
//     "schema": ["title", "description", "age"],
//     "filter": "title",
//     "query": "Avenge"
// }
