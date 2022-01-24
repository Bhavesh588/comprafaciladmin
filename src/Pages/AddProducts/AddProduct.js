import React, { useState } from 'react'
import Select from 'react-select'

import './AddProduct.scss'

import Inputbox from '../../Components/Inputbox/Inputbox'

const AddProduct = () => {
    const [storename, setStoreName] = useState('')
    const [producttitle, setProductTitle] = useState('')
    const [details, setDetails] = useState('')
    const [discountprice, setDiscountPrice] = useState('')
    const [originalprice, setOriginalPrice] = useState('')
    const [minimumqty, setMinimumQty] = useState('')
    const [category, setCategory] = useState(null)
    // const [images, setImages] = useState('')

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]

    const handleChange = (selectedOption) => {
        setCategory(selectedOption)
    }

    const onSubmit = () => {
        var data = {
            Store: {
                Address: {
                    address1: '123',
                    address2: '456',
                    city: 'anything',
                    state: 'something',
                },
                FullName: 'Famous Store',
                Subscribe: false,
            },
            Store_id: '1597534862',
            Product_Title: producttitle,
            Details: details,
            Discount_Price: discountprice,
            Original_Price: originalprice,
            Category: [1, 2],
            Min_Qty: 3,
            Images: ['Image 1', 'Image 2'],
        }
        console.log(data)
    }

    return (
        <div className="addproduct">
            <form onSubmit={onSubmit}>
                <div className="addproduct_inner">
                    <h1 className="title">Add Product</h1>
                    <Inputbox
                        type="text"
                        placeholder="Store Name"
                        value={storename}
                        setvalue={setStoreName}
                        required={true}
                    />
                    <Inputbox
                        type="text"
                        placeholder="Product Title"
                        value={producttitle}
                        setvalue={setProductTitle}
                        required={true}
                    />
                    <textarea
                        placeholder="Details"
                        className="textarea_txt"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required={true}
                    />
                    <Inputbox
                        type="number"
                        placeholder="Discount Price"
                        value={discountprice}
                        setvalue={setDiscountPrice}
                    />
                    <Inputbox
                        type="number"
                        placeholder="Original Price"
                        value={originalprice}
                        setvalue={setOriginalPrice}
                        required={true}
                    />
                    <Inputbox
                        type="number"
                        placeholder="Minimum Qty"
                        value={minimumqty}
                        setvalue={setMinimumQty}
                        required={true}
                    />
                    {/* <div className='select_main'>
                        <div className='selected_val'>
                            {
                                category?.map((cate, i) => 
                                    <div className='selected_txt'>
                                        {cate}
                                    </div>
                                )
                            }
                        </div>
                        <div className='select_val'>
                            <select className="select_cat" defaultValue="">
                                <option value="" disabled hidden>
                                    Select Category
                                </option>
                                <option value="Select 1">Select 1</option>
                                <option value="Select 2">Select 2</option>
                                <option value="Select 3">Select 3</option>
                            </select>
                        </div>
                    </div> */}
                    <Select
                        value={category}
                        onChange={handleChange}
                        options={options}
                        isMulti
                        classNamePrefix="select_cat"
                    />
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
                <button className="btn_submit" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddProduct
