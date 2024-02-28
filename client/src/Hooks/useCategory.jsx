
import { useState, useEffect, memo, useCallback } from "react";

import axios from "axios";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    // console.log('categories:', categories)

    // Function for getting all category;
    const gettingAllCategory = useCallback(async () => {
        try {

            const { data } = await axios.get(`/api/v1/category/get-all-categories`);
            setCategories(data?.allCategories);
        } catch(error) {
            // console.log("error : ", error.message);
        }
    },[])

    return [categories, gettingAllCategory];

}

export default useCategories;