import {
    FETCH_ALL_IMAGES,
    FETCH_IMAGES_SUCCESS,
    ON_SHOW_LOADER,
    ON_HIDE_LOADER,
    LIKE_DISLIKE,
    FETCH_ALL_HISTORY,
    FETCH_ALL_HISTORY_SUCCESS
} from "constants/ActionTypes.js";

export const fetchAllImages = () => {
    return {
      type: FETCH_ALL_IMAGES,
    };
};

export const fetchAllImagesSuccess = (allImages) => {
    return {
      type: FETCH_IMAGES_SUCCESS,
      payload: allImages
    };
};

export const fetchAllHistory = () => {
    return {
      type: FETCH_ALL_HISTORY,
    };
};

export const fetchAllHistorySuccess = (allHistory) => {
    return {
      type: FETCH_ALL_HISTORY_SUCCESS,
      payload: allHistory
    };
};

export const showImageLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};

export const likeDislike = (response) => {
    return {
        type: LIKE_DISLIKE,
        payload: response
    };
};