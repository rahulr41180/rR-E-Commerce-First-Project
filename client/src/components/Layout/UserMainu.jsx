
import { Layout } from "./Layout";

import { NavLink } from "react-router-dom";

export const UserMainu = () => {

    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>Dashboard</h4>
                    
                    <NavLink to="/dashboard/user" className="list-group-item list-group-item-action mb-2">Your Dashboard</NavLink>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">All Orders</NavLink>
                </div>
            </div>
        </>
    )

}