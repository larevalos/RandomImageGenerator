import {
    FETCH_IMAGES_SUCCESS,
    FETCH_ALL_HISTORY_SUCCESS
} from "constants/ActionTypes";

const INIT_STATE = {
    image: null,
    allImages: {},
    allHistory: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_IMAGES_SUCCESS: {
            return {
                ...state,
                allImages: action.payload
            }
        }
        case FETCH_ALL_HISTORY_SUCCESS: {
            return {
                ...state,
                allHistory: action.payload
            }
        }
        default:
            return state;
    }
}