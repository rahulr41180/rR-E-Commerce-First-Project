
import { Layout } from "../../components/Layout/Layout";

import { AdminMainu } from "../../components/Layout/AdminMainu";

export const AdminUser = () => {

    return (
        <Layout title={"All Users | rR e-Com"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMainu />
                    </div>
                    <div className="col-md-9">
                        <h3>All Users</h3>
                    </div>
                </div>
            </div>
        </Layout>
    )

}