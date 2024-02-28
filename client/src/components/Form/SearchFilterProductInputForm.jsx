
import { useState, useEffect } from "react";

import { useSearchFilterProductContext } from "../../context/SearchFilterProductContext";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export const SearchFilterProductInputForm = () => {

    const [searchFilterProductResult, setSearchFilterProductResult] = useSearchFilterProductContext();
    const navigate = useNavigate();
    const handleChange = (event) => {
        setSearchFilterProductResult({...searchFilterProductResult, searchFilterProductTerm : event.target.value})

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // console.log('searchFilterProductResult.searchFilterProductTerm:', searchFilterProductResult.searchFilterProductTerm)
            if(!searchFilterProductResult.searchFilterProductTerm) {

                toast.error("Please enter valid input search");
                return;
            }

            const { data } = await axios.get(`/api/v1/product/search-base-product/${searchFilterProductResult.searchFilterProductTerm}`)
            // console.log('data:', data)


            if(data.status) {
                setSearchFilterProductResult({...searchFilterProductResult, searchFilterProducts : data.products})
                navigate("/search")
            } else {
                toast.error(data.message);
            }


        } catch(error) {

            // console.log(error.message);

        }

    }

    return (
        <div className="me-2 d-flex align-item-center">

            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" onChange={handleChange} value={searchFilterProductResult.searchFilterProductTerm} type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>

            </form>
        </div>
    )

}