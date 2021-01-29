export const SAVE_SEARCH_QUERY = "SAVE_SEARCH_QUERY";
export const REMOVE_SEARCH_QUERY = "REMOVE_SEARCH_QUERY";

export const saveQuery = (query) => {
    return {
        type: SAVE_SEARCH_QUERY,
        payload: query,
    };
};

export const removeQuery = (query) => {
    return {
        type: REMOVE_SEARCH_QUERY,
        payload: query,
    };
};
