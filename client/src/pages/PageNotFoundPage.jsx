
import { Layout } from "../components/Layout/Layout";

import { Link } from "react-router-dom";
import "../css/PageNotFoundPage.css";

export const PageNotFoundPage = () => {

    return (
        <Layout title={ "Page Not Found Go Back | rR e-Com"}>
            <div className="pnf">
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading">Oops! Page Not Found</h2>
                
                <Link to="/" className="pnf-btn">Go Back</Link>
            </div>
        </Layout>
    )

}