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
                {/* <span className='select_image'>
                    <input type="file" className='choose' />
                </span> */}
            </div>
        </div>
    )
}

export default AddProduct
