import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { collection, onSnapshot } from 'firebase/firestore'
import app from '../../firebase/firebase'

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

    const [storenameerr, setStoreNameErr] = useState(false)
    const [producttitleerr, setProductTitleErr] = useState(false)
    const [detailserr, setDetailsErr] = useState(false)
    const [discountpriceerr, setDiscountPriceErr] = useState(false)
    const [originalpriceerr, setOriginalPriceErr] = useState(false)
    const [minimumqtyerr, setMinimumQtyErr] = useState(false)
    const [categoryerr, setCategoryErr] = useState(false)
    // const [imageserr, setImagesErr] = useState(false)

    const [storeoption, setStoreOption] = useState(null)
    // const [categoryoption, setCategoryOption] = useState(null)

    useEffect(() => {
        if (storeoption === null) {
            onSnapshot(collection(app, 'store'), (snapshot) => {
                if (snapshot.docs.length !== 0) {
                    var option = []
                    snapshot.docs.map((doc) =>
                        option.push({
                            values: doc.data(),
                            label:
                                doc.data().Full_Name +
                                ' ' +
                                doc.data().Store_id,
                        })
                    )
                    setStoreOption(option)
                }
            })
        }
        // if(categoryoption === null) {
        //     onSnapshot(collection(app, "category"), (snapshot) => {
        //         if(snapshot.docs.length !== 0) {
        //             var option = []
        //             console.log(snapshot.docs[0].data().Category)
        //             snapshot.docs.map(doc => option.push({values: doc.data(), label: doc.data().Full_Name}))
        //             setCategoryOption(option)
        //         }
        //     })
        // }
    }, [storeoption])

    const options = [
        { value: { main: 'Zone', cate: 'Shirts' }, label: 'Chocolate' },
        { value: { main: 'Zone', cate: 'Shirts' }, label: 'Strawberry' },
        { value: { main: 'Zone', cate: 'Shirts' }, label: 'Vanilla' },
    ]

    const handleChange = (selectedOption) => {
        setCategory(selectedOption)
    }

    const handleChangestore = (selectedOption) => {
        setStoreName(selectedOption)
    }

    const onSubmit = () => {
        if (storename === '') setStoreNameErr(true)
        else setStoreNameErr(false)
        if (details === '') setDetailsErr(true)
        else setDetailsErr(false)
        if (producttitle === '') setProductTitleErr(true)
        else setProductTitleErr(false)
        if (discountprice === '') setDiscountPriceErr(true)
        else setDiscountPriceErr(false)
        if (originalprice === '') setOriginalPriceErr(true)
        else setOriginalPriceErr(false)
        if (minimumqty === '') setMinimumQtyErr(true)
        else setMinimumQtyErr(false)
        if (category === null) setCategoryErr(true)
        else setCategoryErr(false)
    }

    return (
        <div className="addproduct">
            <div className="addproduct_inner">
                <h1 className="title">Add Product</h1>
                <Select
                    value={storename}
                    onChange={handleChangestore}
                    options={storeoption}
                />
                {storenameerr ? (
                    <div className="text-danger">Required</div>
                ) : null}
                {/* <Inputbox
                    type="text"
                    placeholder="Store Name"
                    value={storename}
                    setvalue={setStoreName}
                    err={storenameerr}
                /> */}
                <Inputbox
                    type="text"
                    placeholder="Product Title"
                    value={producttitle}
                    setvalue={setProductTitle}
                    err={producttitleerr}
                />
                <textarea
                    placeholder="Details"
                    className="textarea_txt"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                />
                {detailserr ? (
                    <div className="text-danger">Required</div>
                ) : null}
                <Inputbox
                    type="number"
                    placeholder="Discount Price"
                    value={discountprice}
                    setvalue={setDiscountPrice}
                    err={discountpriceerr}
                />
                <Inputbox
                    type="number"
                    placeholder="Original Price"
                    value={originalprice}
                    setvalue={setOriginalPrice}
                    err={originalpriceerr}
                />
                <Inputbox
                    type="number"
                    placeholder="Minimum Qty"
                    value={minimumqty}
                    setvalue={setMinimumQty}
                    err={minimumqtyerr}
                />
                <Select
                    value={category}
                    onChange={handleChange}
                    options={options}
                    isMulti
                />
                {categoryerr ? (
                    <div className="text-danger">Required</div>
                ) : null}
            </div>
            <div className="addproduct_img">
                <div className="container">
                    <div className="row">
                        <div className="col-sm d-flex justify-content-center pb-1">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="inputfile"
                            />
                            <label htmlFor="file">+</label>
                        </div>
                        <div className="col-sm d-flex justify-content-center pb-1">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="inputfile"
                            />
                            <label htmlFor="file">+</label>
                        </div>
                        <div className="col-sm d-flex justify-content-center pb-1">
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
            <button className="btn_submit" onClick={onSubmit}>
                Submit
            </button>
        </div>
    )
}

export default AddProduct
