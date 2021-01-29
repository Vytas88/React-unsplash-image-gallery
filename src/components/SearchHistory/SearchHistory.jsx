import React from "react";
import { useSelector } from "react-redux";
import "./SearchHistory.scss";

const SearchHistory = (props) => {
    const { selectQueryHandler, removeQueryHandler } = props;

    const savedQueries = useSelector((state) => state);

    if (savedQueries.length === 0) return null;

    return (
        <div className="search-history">
            {savedQueries.map((query, i) => {
                return (
                    <div className="history-item" key={i}>
                        <span
                            className="query"
                            onClick={() => {
                                selectQueryHandler(query);
                            }}
                        >
                            {query}
                        </span>
                        <span
                            className="query-remove-btn"
                            onClick={() => {
                                removeQueryHandler(query);
                            }}
                        >
                            &#10005;
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchHistory;
