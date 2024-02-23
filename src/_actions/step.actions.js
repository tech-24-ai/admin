import { stepConstants } from '../_constants';
import { crudService } from '../_services';
import { alertActions } from './alert.actions';
import { loaderActions } from './loader.actions';

export const stepActions = {
    _getAll,
    _clear
};

function _clear() {
    return { type: stepConstants.CLEAR_STEP };
}

function _getAll(url, filterData) {
    return dispatch => {
        dispatch(loaderActions.show());
        dispatch(request());
        crudService._getAllWithParam(url, filterData)
            .then(
                result => {
                    dispatch(success(result.data))
                    dispatch(loaderActions.hide());
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                    dispatch(loaderActions.hide());
                }
            ).catch(error => {
                let errorMessage
                if (error.response) {
                    if (error.response.data && Array.isArray(error.response.data)) {
                        errorMessage = error.response.data[0].message
                    } else {
                        errorMessage = error.response.data.message
                    }
                }
                dispatch(failure(errorMessage));
                dispatch(alertActions.error(errorMessage));
                dispatch(loaderActions.hide());
            });
    };

    function request() { return { type: stepConstants.GET_STEP_REQUEST } }
    function success(data) { return { type: stepConstants.GET_STEP_SUCCESS, data } }
    function failure(error) { return { type: stepConstants.GET_STEP_FAILURE, error } }
}

