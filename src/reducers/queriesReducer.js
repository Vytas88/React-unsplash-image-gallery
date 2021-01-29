import {
    SAVE_SEARCH_QUERY,
    REMOVE_SEARCH_QUERY,
} from "../actions/queriesActions";

const initialState = [];

export const queriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SEARCH_QUERY:
            return [...state, action.payload];
        case REMOVE_SEARCH_QUERY:
            const filteredQueries = state.filter(
                (query) => query !== action.payload
            );

            return [...filteredQueries];
        default:
            return state;
    }
};
