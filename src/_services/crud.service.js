import { apiConfig } from "./api";

export const crudService = {
  _get,
  _getAll,
  _getAllWithParam,
  _create,
  _update,
  _delete,
  _deleteAll,
  _download,
};
function _get(type, id) {
  return apiConfig.get(`/${type}/${id}`);
}

function _getAllWithParam(type, filterData) {
  return apiConfig.get(`/${type}`, { params: filterData });
}

function _getAll(type, filterData) {
  let filters = [];
  let filter;

  if (filterData) {
    if (filterData.filters) {
      filterData.filters.map((filter) => {
        const { column, value } = filter;
        if (
          value == "" ||
          value.length == 0 ||
          value.startDate == "" ||
          value.endDate == ""
        ) {
          // skipped date field from filter
        } else {
          filters.push({
            name: column.field,
            value: value,
          });
        }

        return null;
      });
    }

    filter = {
      page: filterData.page + 1,
      pageSize: filterData.pageSize,
      search: filterData.search,
      orderBy: filterData.orderBy ? filterData.orderBy.field : null,
      orderDirection: filterData.orderDirection,
      filters: JSON.stringify(filters),
      customFilter: JSON.stringify(filterData.customFilter),
    };
  }

  return apiConfig.get(`/${type}`, { params: filter });
}
function _create(type, data) {
  return apiConfig.post(`/${type}`, data);
}
function _update(type, id, data) {
  return apiConfig.put(`/${type}/${id}`, data);
}
function _delete(type, id) {
  return apiConfig.delete(`/${type}/${id}`);
}
function _deleteAll(type, data) {
  return apiConfig.post(`/${type}`, data);
}

function _download(type, data) {
  return apiConfig.post(`/${type}`, data, {
    responseType: "blob",
  });
}
