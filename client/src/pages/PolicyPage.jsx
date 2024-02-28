
import { Layout } from "../components/Layout/Layout";

import privacyPolicy from "../images/privacyPolicy.png";
import "../css/ContactPage.css";

export const PolicyPage = () => {

    return (
        <Layout title={ "Privacy and Policy | rR e-Com" }>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img

                        src={privacyPolicy}
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                    <p>add privacy policy</p>
                </div>
            </div>
        </Layout>
    )

}