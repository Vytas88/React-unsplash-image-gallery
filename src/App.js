import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchHistory from "./components/SearchHistory/SearchHistory";
import { useDispatch, useSelector } from "react-redux";
import { saveQuery, removeQuery } from "./actions/queriesActions";
import "./styles.scss";

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const savedQueries = useSelector((state) => state);

    const dispatch = useDispatch();

    const getPhotos = useCallback(() => {
        let apiUrl = `https://api.unsplash.com/photos?`;
        if (query)
            apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;
        apiUrl += `&page=${page}`;
        apiUrl += `&client_id=${accessKey}`;

        // console.log(apiUrl);

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const imagesFromApi = data.results ?? data;

                // if page is 1, then we need a whole new array of images
                if (page === 1) {
                    setImages(imagesFromApi);
                    return;
                }

                // if page > 1, then we are adding for our infinite scroll
                setImages((images) => [...images, ...imagesFromApi]);
            });
    }, [page, query]);

    useEffect(() => {
        getPhotos();
    }, [page]);

    const searchPhotos = (e) => {
        e.preventDefault();

        if (!savedQueries.includes(query)) {
            dispatch(saveQuery(query));
        }

        getPhotos();
    };

    const hadleRemoveQuery = (selectedQuery) => {
        dispatch(removeQuery(selectedQuery));
    };

    const handleSelectQuery = (selectedQuery) => {
        setQuery(selectedQuery);
    };

    // will return an error if there is no access key
    if (!accessKey) {
        return (
            <a href="https://unsplash.com/developers" className="error">
                Required: Get Your Unsplash API Key First
            </a>
        );
    }

    return (
        <div className="app">
            <div className="header">
                <div className="name">
                    <h1>Unsplash.com Images</h1>
                </div>
                <form onSubmit={searchPhotos}>
                    <input
                        type="text"
                        placeholder="Search for images..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button>Search</button>
                </form>
            </div>
            <SearchHistory
                removeQueryHandler={hadleRemoveQuery}
                selectQueryHandler={handleSelectQuery}
            />

            <InfiniteScroll
                dataLength={images.length} //This is important field to render the next data
                next={() => setPage((page) => page + 1)}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <div className="image-grid">
                    {images.length === 0 && <h4>No Images Found!</h4>}
                    {images.map((image, index) => (
                        <a
                            className="image"
                            key={index}
                            href={image.links.html}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={image.urls.regular}
                                alt={image.alt_description}
                            />
                        </a>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}
