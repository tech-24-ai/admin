import { stepConstants } from '../_constants';

export function questionSteps(state = null, action) {
    switch (action.type) {
        // get all call 
        case stepConstants.GET_STEP_REQUEST:
            return null;
        case stepConstants.GET_STEP_SUCCESS:
            return action.data;
        case stepConstants.GET_STEP_FAILURE:
            return null;

        // clear data
        case stepConstants.CLEAR_STEP:
            return null
        default:
            return state
    }
}