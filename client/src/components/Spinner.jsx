
import { Layout } from "./Layout/Layout"

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Spinner = ({path = "/login"}) => {

    const [count, setCount] = useState(5);
    // console.log('count:', count);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue)
        },1000);
        // console.log("Here1");
        // console.log("Here2");
        if(count === 0) {
            // console.log('count:', count);
            navigate(`${path}`, {

                state : location.pathname
            });
        }
        // console.log("Here3");
        // console.log("Here4");
        // When Unmounting(Redirecting to another route or component is not showing on UI) of component is happening then only then this return () => clearInterval(interval) callback function will execute.
        return () => clearInterval(interval);
    },[count, path]);


    return (
        <>
            <Layout title={"Protected | rR e-Com"}>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{height : "70vh"}}>
                    <h1 className="text-center">Redirecting to you in {count} seconds</h1>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

            </Layout>
        </>
    )

}