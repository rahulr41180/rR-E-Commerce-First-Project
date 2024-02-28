
import { Layout } from "../../components/Layout/Layout";

import { UserMainu } from "../../components/Layout/UserMainu";
import { useAuth } from "../../context/AuthContext";

export const UserDashboard = () => {

    const [auth] = useAuth();

    return (
        <Layout title={"Dashboard | rR e-Come"}>

            <div className="container-fluid p-0">
                <div className="row m-3">
                    <div className="col-md-3">

                        <UserMainu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h5>Name : {auth?.user?.name}</h5>

                            <h5>Email : {auth?.user?.email}</h5>
                            <h5>Contact : {auth?.user?.phone}</h5>
                            <h5>Address : {auth?.user?.address}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}