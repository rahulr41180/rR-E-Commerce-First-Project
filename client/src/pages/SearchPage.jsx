
import { Layout } from "../components/Layout/Layout";

import { useSearchFilterProductContext } from "../context/SearchFilterProductContext";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";


export const SearchPage = () => {

    const [searchFilterProductResult, setSearchFilterProductResult] = useSearchFilterProductContext();

    return (

        <Layout title={"Search Products || rR e-Com"}>
            <div className="container">
                <div className="text-center">
                    <h1>Searched Products</h1>
                    <h6>{searchFilterProductResult?.searchFilterProducts.length < 1 ? "No Product found" : `Founds : ${searchFilterProductResult?.searchFilterProducts.length} Products`}</h6>
                </div>
            </div>
            <div className="container-fluid" style={{ border: "1px solid" }}>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3">
                    {searchFilterProductResult?.searchFilterProducts.map((element, index) => {
                        return (
                            <>
                                <div className="col">
                                    <div className="card" key={index}>
                                        <img src={`/api/v1/product/get-product-photo/${element._id}`} className="card-img-top productCardImage" alt="..." style={{ border: "1px solid silver" }} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{element.name.substring(0, 20)}...</h5>
                                            <p className="card-text">{element.description.substring(0, 40)}...</p>
                                            <p className="card-text mt-1">₹ {element.price}</p>
                                            <div className="card-detail-link d-flex flex-row">
                                                <Link to={""} class="btn btn-secondary">To CART</Link>
                                                <Link className="btn btn-primary" to={`/dashboard/admin/product-details/${element._id}`}>Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>

            </div>
        </Layout>
    )

}