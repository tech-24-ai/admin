import { fileConstants } from '../_constants';

export function fileUpload(state = {
    loading: true,
    error: null,
    items: null,
}, action) {
    switch (action.type) {
        // upload call
        case fileConstants.UPLOAD_REQUEST:
            return {
                loading: true,
                error: null,
                items: null,
            };
        case fileConstants.UPLOAD_SUCCESS:
            return {
                loading: false,
                fetching: true,
                items: action.data
            };
        case fileConstants.UPLOAD_FAILURE:
            return {
                loading: false,
                error: action.error,
                items: null
            };


        // clear data
        case fileConstants.CLEAR:
            return {
                loading: true,
                error: null,
                items: null,
            };
        default:
            return state
    }
}