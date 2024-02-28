
import { Layout } from "../components/Layout/Layout";

import "../css/AboutPage.css";
import "../css/ContactPage.css";
import AboutUsImage from "../images/aboutUs.jfif"

export const AboutPage = () => {
    return (
        <Layout title={"About Us | rR e-Com"} description={"rR e-Com store for all items"}>
            <div className="row contactus">
                <div className="col-md-6 ">
                    <img
                        src={AboutUsImage}
                        alt="aboutUs"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p className="text-justify mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                        officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                        perferendis eius temporibus dicta blanditiis doloremque explicabo
                        quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                        accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                        commodi illum quidem neque tempora nam.
                    </p>
                </div>
            </div>
        </Layout>
    )

}