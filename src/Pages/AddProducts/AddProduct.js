import React from 'react'

import './AddProduct.scss'

import Inputbox from '../../Components/Inputbox/Inputbox'

const AddProduct = () => {
    return (
        <div className="addproduct">
            <div className="addproduct_inner">
                <h1 className="title">Add Product</h1>
                <Inputbox type="text" placeholder="Store Name" />
                <Inputbox type="text" placeholder="Product Title" />
                <Inputbox type="text" placeholder="Details" />
                <Inputbox type="number" placeholder="Discount Price" />
                <Inputbox type="number" placeholder="Minimum Qty" />
                <select className="select_cat" defaultValue="">
                    <option value="" disabled hidden>
                        Select Category
                    </option>
                    <option value="Select 1">Select 1</option>
                    <option value="Select 2">Select 2</option>
                    <option value="Select 3">Select 3</option>
                </select>
            </div>
            <div className="addproduct_img">
                <div className="container">
                    <div className="row">
                        <div className="col-sm d-flex justify-content-center p-1">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="inputfile"
                            />
                            <label htmlFor="file">+</label>
                        </div>
                        <div className="col-sm d-flex justify-content-center p-1">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="inputfile"
                            />
                            <label htmlFor="file">+</label>
                        </div>
                        <div className="col-sm d-flex justify-content-center p-1">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="inputfile"
                            />
                            <label htmlFor="file">+</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
