
import { Layout } from "../../components/Layout/Layout";

import { AdminMainu } from "../../components/Layout/AdminMainu";
import { CategoryForm } from "../../components/Form/CategoryForm";
import { useState, useEffect, useCallback} from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Modal, } from "antd";

export const AdminCreateCategory = () => {
    const [categories, setCategories] = useState([]);

    const [categoryName, setCategoryName] = useState("");
    const [visibilityModel, setVisibilityModel] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updateCategoryName, setUpdateCategoryName] = useState("");
    // console.log('updateCategoryName:', updateCategoryName)

    // handleForm

    const handleSubmit = useCallback(async (event) => {

        event.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
                name : categoryName
            })
            // console.log("data :", data);

            if(data?.status) {
                toast.success(`"${categoryName}" category has been created successfully`);

                getAllCategories();
            } else {
                // console.log('data.message:', data.message)
                setCategoryName("");
                toast.error(data.message);
            }
        } catch(error) {
            // console.log(error);
            toast.error("Something went wrong in input form");

        }
    },[categoryName])

    // console.log("categories :", categories);

    // Getting all categories.

    const getAllCategories = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-categories`);
            if(data?.status) {
                setCategories(data.allCategories);
            }
            // console.log("data :", data);

        } catch(error) {
            // console.log(error);
            toast.error("Something went wrong in getting categories");

        }
    }

    useEffect(() => {
        // console.log("admin panel")
        getAllCategories();
    }, [])

    // Update Category Function() :

    const handleUpdateSubmit = useCallback( async(event) => {
        event.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {
                name : updateCategoryName
            })
            if(data.status) {
                toast.success(`${updateCategoryName} category has been updated successfully`);
                setSelected(null);

                setUpdateCategoryName("");
                setVisibilityModel(false);

                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            toast.error("Something went wrong in updating category");

        }
    },[updateCategoryName])

    // Delete Category Function() :

    const handleDelete = async(id, name) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-single-category/${id}`)
            if(data.status) {
                
                toast.success(`${name} category has been deleted successfully`);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            toast.error("Something went wrong in updating category");

        }
    }

    return (
        <Layout title={"Create Category | rR e-Com"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMainu />

                    </div>
                    <div className="col-md-9">
                        
                        <h3>Manage Category</h3>
                        <div className="p-3 w-50">

                            <CategoryForm 
                                value={categoryName} 
                                setValue={setCategoryName} 
                                
                                handleSubmit={handleSubmit}   
                            />
                        </div>
                        <div className="w-75">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((element, index) => {
                                 return (
                                    <tr>
                                        <td key={element._id}>
                                            {element.name}
                                        </td>

                                        <td key={index}>
                                            <button className="btn btn-primary ms-2" onClick={() => {
                                                return (
                                                    setVisibilityModel(true),
                                                    setUpdateCategoryName(element.name),
                                                    setSelected(element)
                                                )
                                            }}>Edit</button>
                                            <button className="btn btn-danger ms-2" onClick={() => {
                                                handleDelete(element._id, element.name)
                                            }}>Delete</button>
                                        </td>

                                    </tr>
                                 )
                                })}
                            </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => {
                            return(

                                setVisibilityModel(false)
                            )
                        }} footer={null} open={visibilityModel}>
                            <CategoryForm 
                                value={updateCategoryName} 
                                setValue={setUpdateCategoryName} 
                                handleSubmit={handleUpdateSubmit} 
                            />
                        </Modal>

                    </div>
                </div>
            </div>
        </Layout>
    )
    
}