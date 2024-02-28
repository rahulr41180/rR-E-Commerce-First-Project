
import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";

const SearchFilterProductContext = createContext();

const SearchFilterProductContextProvider = ({ children }) => {

    const [searchFilterProductResult, setSearchFilterProductResult] = useState({
        searchFilterProductTerm : "",
        searchFilterProducts : []

    })

    return (
        <SearchFilterProductContext.Provider value={ [searchFilterProductResult, setSearchFilterProductResult] }>
            { children }
        </SearchFilterProductContext.Provider>

    )
}

const useSearchFilterProductContext = () => {
    return useContext(SearchFilterProductContext);
}

export {
    useSearchFilterProductContext,

    SearchFilterProductContextProvider
}