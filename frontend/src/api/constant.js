export const API_URLS = {
  GET_ALL_PRODUCTS: "api/products/get/all",
  /* this below is a function maybe put it somewhere else or make it more readable */
  GET_PRODUCT_BY_ID: (uuid) => `api/products/get/${uuid}`,

  GET_CATEGORY_BY_UUID: function (uuid) {
    return `api/category/get/${uuid}`;
  },

  GET_ALL_CATEGORIES: "api/category/get/all",
};

export const API_BASE_URL = "http://localhost:8080/";
