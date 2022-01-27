import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, storage } from '../../firebase/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import './AddProduct.scss'
import '../../Components/FontAwesomeIcons'
import Inputbox from '../../Components/Inputbox/Inputbox'

const AddProduct = () => {
    const [storename, setStoreName] = useState('')
    const [producttitle, setProductTitle] = useState('')
    const [details, setDetails] = useState('')
    const [discountprice, setDiscountPrice] = useState('')
    const [originalprice, setOriginalPrice] = useState('')
    const [minimumqty, setMinimumQty] = useState('')
    const [category, setCategory] = useState(null)

    const [images, setImages] = useState([])
    const [imagestorage, setImageStorage] = useState([])
    const [filename, setFilename] = useState([])

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
            onSnapshot(collection(db, 'store'), (snapshot) => {
                if (snapshot.docs.length !== 0) {
                    var option = []
                    snapshot.docs.map((doc) =>
                        option.push({
                            values: doc.data(),
                            label:
                                doc.data().Full_Name +
                                ' => ' +
                                doc.data().Store_id,
                        })
                    )
                    setStoreOption(option)
                }
            })
        }
        // if(categoryoption === null) {
        //     onSnapshot(collection(db, "category"), (snapshot) => {
        //         if(snapshot.docs.length !== 0) {
        //             var option = []
        //             snapshot.docs.map(doc =>
        //                 doc.data().Category?.map(main_cate =>
        //                     main_cate.category?.map(sub_cate =>
        //                         sub_cate.sub_category.map(cate =>
        //                             option.push({values: doc.data(), label: main_cate.name + ' => ' + sub_cate.name + ' => ' + cate.name})
        //                         )
        //                     )
        //                 )
        //             )
        //             setCategoryOption(option)
        //         }
        //     })
        // }
    }, [storeoption])

    const handleChange = (selectedOption) => {
        setCategory(selectedOption)
    }

    const handleChangestore = (selectedOption) => {
        setStoreName(selectedOption)
    }

    const select_img = (input) => {
        if (!input) return
        setImageStorage((ti) => [...ti, input.target.files[0]])
        var reader = new FileReader()
        reader.onload = function (e) {
            setImages((t) => [...t, e.target.result])
        }
        reader.readAsDataURL(input.target.files[0])
    }

    const remove_img = (i) => {
        var filtered_values = images.filter(function (itm) {
            return images.indexOf(itm) !== i
        })
        setImages(filtered_values)
        var filtered_storage = imagestorage.filter(function (itm) {
            return imagestorage.indexOf(itm) !== i
        })
        setImageStorage(filtered_storage)
        // console.log(filtered_values, filtered_storage)
    }

    const onSubmit = async () => {
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
        // if (category === null) setCategoryErr(true)
        // else setCategoryErr(false)

        if (
            !storenameerr &&
            !detailserr &&
            !producttitleerr &&
            !discountpriceerr &&
            !originalpriceerr &&
            !minimumqtyerr &&
            !categoryerr
        ) {
            // for(var i=0; i<imagestorage.length; i++) {
            //     var path = `/sample/${storename.values.Store_id}/${producttitle}/${imagestorage[i].name}`
            //     const storageRef = await ref(storage, path)
            //     uploadBytes(storageRef, imagestorage[i]).then(async (snapshot) => {
            //         console.log('Uploaded');
            //         await getDownloadURL(ref(storage, path))
            //             .then((url) => {
            //                 // `url` is the download URL for 'images/stars.jpg'
            //                 setFilename((tid) => [...tid, url])
            //             })
            //             .catch((error) => {
            //                 console.log('there is an error in url: ', error)
            //             });
            //     });
            // }
        }
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
                {/* <Select
                    value={category}
                    onChange={handleChange}
                    options={categoryoption}
                    isMulti
                />
                {categoryerr ? (
                    <div className="text-danger">Required</div>
                ) : null} */}
            </div>
            <div className="addproduct_img">
                <div className="container">
                    <div className="row">
                        <div className="col-sm d-flex justify-content-center pb-1">
                            {images[0] === undefined ? (
                                <>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="inputfile"
                                        onChange={select_img}
                                    />
                                    <label htmlFor="file">+</label>
                                </>
                            ) : (
                                <div className="selected_img">
                                    <FontAwesomeIcon
                                        icon="times"
                                        size="lg"
                                        color="#fff"
                                        className="close_btn"
                                        onClick={() => remove_img(0)}
                                    />
                                    <img
                                        src={images[0]}
                                        alt="0"
                                        className="pro_img"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-sm d-flex justify-content-center pb-1">
                            {images[1] === undefined ? (
                                <>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="inputfile"
                                        onChange={select_img}
                                    />
                                    <label htmlFor="file">+</label>
                                </>
                            ) : (
                                <div className="selected_img">
                                    <FontAwesomeIcon
                                        icon="times"
                                        size="lg"
                                        color="#fff"
                                        className="close_btn"
                                        onClick={() => remove_img(1)}
                                    />
                                    <img
                                        src={images[1]}
                                        alt="1"
                                        className="pro_img"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-sm d-flex justify-content-center pb-1">
                            {images[2] === undefined ? (
                                <>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="inputfile"
                                        onChange={select_img}
                                    />
                                    <label htmlFor="file">+</label>
                                </>
                            ) : (
                                <div className="selected_img">
                                    <FontAwesomeIcon
                                        icon="times"
                                        size="lg"
                                        color="#fff"
                                        className="close_btn"
                                        onClick={() => remove_img(2)}
                                    />
                                    <img
                                        src={images[2]}
                                        alt="2"
                                        className="pro_img"
                                    />
                                </div>
                            )}
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
