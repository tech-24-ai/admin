import { crudConstants } from "../_constants";
import { crudService } from "../_services";
import { alertActions } from "./alert.actions";
import { loaderActions } from "./loader.actions";
import fileDownload from "js-file-download";

export const crudActions = {
  _getAll,
  _getAllWithParam,
  _get,
  _create,
  _update,
  _delete,
  _deleteAll,
  _clear,
  _reset,
  _download,
};

function _clear(kind) {
  return { type: `${kind}.${crudConstants.CLEAR}` };
}

function _reset(kind, data) {
  return { type: `${kind}.${crudConstants.RESET}`, data };
}

function _get(kind, url, id) {
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._get(url, id).then(
      (result) => {
        if (result.status === 200) {
          dispatch(success(result.data));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_FAILURE}`, error };
  }
}

function _getAllWithParam(kind, url, filterData) {
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._getAllWithParam(url, filterData).then(
      (result) => {
        if (result.status === 200) {
          dispatch(success(result.data));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error };
  }
}

function _getAll(kind, url, filterData) {
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._getAll(url, filterData).then(
      (result) => {
        if (result.status === 200) {
          dispatch(success(result.data.data));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error };
  }
}

function _create(kind, url, data) {
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._create(url, data).then(
      (result) => {
        if (result.status === 200) {
          dispatch(alertActions.success(result.data.message));
          dispatch(success(null));
          dispatch(loaderActions.hide());
        }

        if (result.status === 400) {
          dispatch(failure(result.data[0].message));
          dispatch(alertActions.error(result.data[0].message));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.CREATE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.CREATE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.CREATE_FAILURE}`, error };
  }
}

function _update(kind, url, id, data) {
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._update(url, id, data).then(
      (result) => {
        if (result.status === 200) {
          dispatch(alertActions.success(result.data.message));
          dispatch(success(null));
          dispatch(loaderActions.hide());
        }

        if (result.status === 400) {
          dispatch(failure(result.data[0].message));
          dispatch(alertActions.error(result.data[0].message));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.UPDATE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.UPDATE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.UPDATE_FAILURE}`, error };
  }
}

function _delete(kind, url, id) {
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._delete(url, id).then(
      (result) => {
        if (result.status === 200) {
          dispatch(alertActions.success(result.data.message));
          dispatch(success(null));
          dispatch(loaderActions.hide());
        }

        if (result.status === 400) {
          dispatch(failure(result.data[0].message));
          dispatch(alertActions.error(result.data[0].message));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.DELETE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.DELETE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.DELETE_FAILURE}`, error };
  }
}

function _deleteAll(kind, url, data) {
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._deleteAll(url, data).then(
      (result) => {
        if (result.status === 200) {
          dispatch(alertActions.success(result.data.message));
          dispatch(success(null));
          dispatch(loaderActions.hide());
        }

        if (result.status === 400) {
          dispatch(failure(result.data[0].message));
          dispatch(alertActions.error(result.data[0].message));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.DELETE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.DELETE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.DELETE_FAILURE}`, error };
  }
}

function _download(kind, url, data) {
  let { type } = data;
  return (dispatch) => {
    dispatch(loaderActions.show());
    dispatch(request());
    crudService._download(url, data).then(
      (result) => {
        if (result.status === 200) {
          dispatch(loaderActions.hide());
          if (result.data) {
            fileDownload(result.data, `${type}.pdf`);
          }
        } else {
          dispatch(failure(result.message));
          dispatch(alertActions.error(result.message));
          dispatch(loaderActions.hide());
        }
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
        dispatch(loaderActions.hide());
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.DELETE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.DELETE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.DELETE_FAILURE}`, error };
  }
}
