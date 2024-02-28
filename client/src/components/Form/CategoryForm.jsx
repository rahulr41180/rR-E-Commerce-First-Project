
import { memom } from "react";

export const CategoryForm = ({ handleSubmit, value, setValue }) => {

    // console.log("categoryForm")
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder = "Enter new category name.." value={value}
                    onChange={(event) => {
                        return (
                            setValue(event.target.value)
                        )
                    }} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>

    )

}