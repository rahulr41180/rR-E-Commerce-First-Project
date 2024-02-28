
import { Layout } from "../components/Layout/Layout";

import "../css/ContactPage.css";
import contactusImage from "../images/contactus.jpg";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

export const ContactPage = () => {

    return (
        <Layout title={"Contact Us | rR e-Com"}>
            <div className="row contactus">
                <div className="col-md-6">
                    <img src={contactusImage} alt="contactUs" style={{ width : "90%"}} />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        any query and info about product feel free to call anytime we 24x7 available
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : www.help@rrecommerce.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : 012-3456789
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : 1800-1800-2222 (Toll Free)
                    </p>
                </div>
            </div>
        </Layout>
    )

}