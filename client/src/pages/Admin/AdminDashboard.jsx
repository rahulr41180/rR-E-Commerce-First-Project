
import { Layout } from "../../components/Layout/Layout";

import { AdminMainu } from "../../components/Layout/AdminMainu";
import { useAuth } from "../../context/AuthContext";

export const AdminDashboard = () => {

    const [auth] = useAuth();

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMainu />
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