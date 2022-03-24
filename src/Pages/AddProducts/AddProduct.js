import React, { useEffect, useState } from "react";
import Select from "react-select";
import { db, storage } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import "./AddProduct.scss";
import "../../Components/FontAwesomeIcons";
import Inputbox from "../../Components/Inputbox/Inputbox";

const AddProduct = () => {
    const [storename, setStoreName] = useState("");
    const [producttitle, setProductTitle] = useState("");
    const [details, setDetails] = useState("");
    const [discountprice, setDiscountPrice] = useState("");
    const [originalprice, setOriginalPrice] = useState("");
    const [minimumqty, setMinimumQty] = useState("");
    const [category, setCategory] = useState(null);

    const [images, setImages] = useState([]);
    const [imagestorage, setImageStorage] = useState([]);

    const [storenameerr, setStoreNameErr] = useState(false);
    const [producttitleerr, setProductTitleErr] = useState(false);
    const [detailserr, setDetailsErr] = useState(false);
    // const [discountpriceerr, setDiscountPriceErr] = useState(false)
    const [originalpriceerr, setOriginalPriceErr] = useState(false);
    const [minimumqtyerr, setMinimumQtyErr] = useState(false);
    const [categoryerr, setCategoryErr] = useState(false);
    const [imageserr, setImagesErr] = useState(false);

    const [storeoption, setStoreOption] = useState(null);
    const [categoryoption, setCategoryOption] = useState(null);

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (storeoption === null) {
            db.collection("store")
                .get()
                .then(async (val) => {
                    if (val.docs.length !== 0) {
                        var option = [];
                        await val.docs.map((doc) =>
                            option.push({
                                value: doc.data(),
                                label:
                                    doc.data().Full_Name +
                                    " => " +
                                    doc.data().Store_id,
                            })
                        );
                        setStoreOption(option);
                    }
                });
        }
        if (categoryoption === null) {
            db.collection("category")
                .get()
                .then(async (val) => {
                    if (val.docs.length !== 0) {
                        var option = [];
                        await val.docs.map((doc) =>
                            doc.data().Category?.map((main_cate) =>
                                main_cate.category?.map((cate) =>
                                    cate.sub_category.map((sub_cate) =>
                                        option.push({
                                            value: {
                                                main_cate: main_cate.name,
                                                cate: cate.name,
                                                sub_cate: sub_cate.name,
                                            },
                                            label:
                                                main_cate.name +
                                                " => " +
                                                cate.name +
                                                " => " +
                                                sub_cate.name,
                                        })
                                    )
                                )
                            )
                        );
                        setCategoryOption(option);
                    }
                });
        }
    }, [storeoption, categoryoption]);

    const handleChangestore = (selectedOption) => {
        setStoreName(selectedOption);
    };

    const select_img = (input) => {
        if (!input) return;
        setImageStorage((ti) => [...ti, input.target.files[0]]);
        var reader = new FileReader();
        reader.onload = function (e) {
            setImages((t) => [...t, e.target.result]);
        };
        reader.readAsDataURL(input.target.files[0]);
    };

    const remove_img = (i) => {
        var filtered_values = images.filter(function (itm) {
            return images.indexOf(itm) !== i;
        });
        setImages(filtered_values);
        var filtered_storage = imagestorage.filter(function (itm) {
            return imagestorage.indexOf(itm) !== i;
        });
        setImageStorage(filtered_storage);
        // console.log(filtered_values, filtered_storage)
    };

    const onSubmit = async () => {
        setUploading(true);

        if (storename === "") setStoreNameErr(true);
        else setStoreNameErr(false);
        if (details === "") setDetailsErr(true);
        else setDetailsErr(false);
        if (producttitle === "") setProductTitleErr(true);
        else setProductTitleErr(false);
        // if (discountprice === '') setDiscountPriceErr(true)
        // else setDiscountPriceErr(false)
        if (originalprice === "") setOriginalPriceErr(true);
        else setOriginalPriceErr(false);
        if (minimumqty === "") setMinimumQtyErr(true);
        else setMinimumQtyErr(false);
        if (category === null) setCategoryErr(true);
        else setCategoryErr(false);
        if (images.length === 0) setImagesErr(true);
        else setImagesErr(false);

        var discountper = 0;
        if (discountprice !== "") {
            var cal =
                100 - (parseInt(discountprice) * 100) / parseInt(originalprice);
            discountper = cal;
        }

        var final_category = await category.map((val) => val.value);
        console.log(final_category);

        if (
            storename !== "" &&
            details !== "" &&
            producttitle !== "" &&
            originalprice !== "" &&
            minimumqty !== "" &&
            category !== null &&
            images.length !== 0
        ) {
            await db
                .collection("products")
                .where("Store_id", "==", storename.value.Store_id)
                .where("Product_Title", "==", producttitle)
                .get()
                .then(async (val) => {
                    if (val.docs.length === 0) {
                        var filename = [];
                        setUploading(true);
                        for (var i = 0; i < imagestorage.length; i++) {
                            var path = `/Products/${storename.value.Store_id}/${producttitle}/${imagestorage[i].name}`;
                            try {
                                await storage.ref(path).put(imagestorage[i]);
                                const url = await storage
                                    .ref(path)
                                    .getDownloadURL();
                                filename.push(url);
                                setUploading(false);
                                // console.log('Images is being uploaded successfully')
                            } catch (err) {
                                console.log(
                                    "Error in file save in Add Product file"
                                );
                                console.log(err);
                                setUploading(false);
                            }
                        }

                        var uids = uuidv4();
                        const arrName = [];
                        let curName = "";
                        producttitle.split("").forEach((letter) => {
                            curName += letter;
                            arrName.push(curName.toLowerCase());
                        });
                        // console.log(arrName)
                        var d = new Date();
                        var date = d.getDate();
                        var month = d.getMonth() + 1;
                        var year = d.getFullYear();
                        var lastdate = new Date(year, month, 0).getDate();
                        var gap = storename.value?.Subscribe ? 3 : 1;
                        var dategap = date + gap;
                        while (dategap > lastdate) {
                            if (dategap > lastdate) {
                                month = month + 1;
                                if (month > 12) {
                                    month = 1;
                                    year = year + 1;
                                }
                                dategap = dategap - lastdate;
                            }
                            lastdate = new Date(year, month, 0).getDate();
                        }
                        var start_Date = new Date().toISOString();
                        var exp = new Date(
                            year,
                            month - 1,
                            dategap + 1
                        ).toISOString();

                        var data = {
                            Store: {
                                Address: storename.value.Address,
                                Full_Name: storename.value.Full_Name,
                                Subscribe: storename.value.Subscribe,
                            },
                            Product_Title: producttitle,
                            Min_Qty: parseInt(minimumqty),
                            keywords: arrName,
                            Category: final_category,
                            Original_Price: originalprice,
                            Discount_Price:
                                discountprice === ""
                                    ? parseInt(originalprice)
                                    : parseInt(discountprice),
                            Discount_Per:
                                discountper === 0 ? 0 : Math.round(discountper),
                            Details: details,
                            Images: filename,
                            Store_id: storename.value.Store_id,
                            Product_id: uids,
                            Viewed: 0,
                            Contacted: 0,
                            start_Date: start_Date,
                            end_Date: exp,
                        };

                        // console.log(data)
                        await db
                            .collection("products")
                            .doc(uids)
                            .set(data)
                            .then(() => {
                                console.log("Document successfully written!");
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.error(
                                    "Error writing document (AddProduct): ",
                                    error
                                );
                            });
                        setUploading(false);
                    }
                });
        }
    };

    return (
        <div className="addproduct">
            <div className="addproduct_inner">
                <h1 className="title">Add Product</h1>
                <Select
                    value={storename}
                    onChange={handleChangestore}
                    options={storeoption}
                    placeholder="Select Store Name"
                />
                {storenameerr ? (
                    <div className="text-light bg-danger">Required</div>
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
                    <div className="text-light bg-danger">Required</div>
                ) : null}
                <Inputbox
                    type="text"
                    placeholder="Offer Price"
                    value={discountprice}
                    setvalue={setDiscountPrice}
                    // err={discountpriceerr}
                />
                <Inputbox
                    type="text"
                    placeholder="Original Price"
                    value={originalprice}
                    setvalue={setOriginalPrice}
                    err={originalpriceerr}
                />
                <Inputbox
                    type="text"
                    placeholder="Minimum Qty"
                    value={minimumqty}
                    setvalue={setMinimumQty}
                    err={minimumqtyerr}
                />
                <Select
                    value={category}
                    onChange={setCategory}
                    options={categoryoption}
                    placeholder="Select Category"
                    isMulti
                />
                {categoryerr ? (
                    <div className="text-light bg-danger">Required</div>
                ) : null}
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
            {imageserr ? (
                <div className="text-light bg-danger">
                    Atleast One Images is Required
                </div>
            ) : null}
            <button
                className="btn_submit"
                style={{ backgroundColor: uploading ? "#E94560aa" : "#E94560" }}
                onClick={onSubmit}
                disabled={uploading}
            >
                {uploading ? "Uploading" : "Submit"}
            </button>
        </div>
    );
};

export default AddProduct;
