import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UpdateProduct from "../UpdateProduct/UpdateProduct";

import "./ShowProduct.scss";

function ShowProduct() {
    const [allproducts, setAllProduct] = useState(null);
    const [editproduct, setEditProduct] = useState(null);
    const [show, setShow] = useState(false);
    const [viewedsort, setViewedSort] = useState(false);
    const [contactedsort, setContactedSort] = useState(false);
    const [pricesort, setPriceSort] = useState(false);

    useEffect(() => {
        const fetchdata = () => {
            if (allproducts === null) {
                db.collection("products")
                    .get()
                    .then((val) => {
                        var pro = [];
                        val.docs.map((doc) => pro.push(doc.data()));
                        setAllProduct(pro);
                    });
                console.log("its called");
            }
        };
        fetchdata();
    }, [allproducts]);

    const sort_num = (ind, sort) => {
        var num = [];
        allproducts.map((val) => num.push(val[ind]));
        if (sort) {
            for (var i = 0; i < num.length; i++) {
                for (var j = 0; j < num.length; j++) {
                    if (num[i] < num[j]) {
                        var extra = num[i];
                        num[i] = num[j];
                        num[j] = extra;

                        extra = allproducts[i];
                        allproducts[i] = allproducts[j];
                        allproducts[j] = extra;
                    }
                }
            }
            if (ind === "Viewed") {
                setViewedSort(!viewedsort);
            } else if (ind === "Contacted") {
                setContactedSort(!contactedsort);
            } else if (ind === "Discount_Price") {
                setPriceSort(!pricesort);
            }
        } else {
            for (var k = 0; k < num.length; k++) {
                for (var l = 0; l < num.length; l++) {
                    if (num[k] > num[l]) {
                        var ext = num[k];
                        num[k] = num[l];
                        num[l] = ext;

                        ext = allproducts[k];
                        allproducts[k] = allproducts[l];
                        allproducts[l] = ext;
                    }
                }
            }
            if (ind === "Viewed") {
                setViewedSort(!viewedsort);
            } else if (ind === "Contacted") {
                setContactedSort(!contactedsort);
            } else if (ind === "Discount_Price") {
                setPriceSort(!pricesort);
            }
        }
    };

    const handleClose = () => setShow(false);

    const handleShow = (index) => {
        setEditProduct(allproducts[index]);
        setShow(true);
    };

    return (
        <div className="showproduct">
            <h1>All Products</h1>
            {/* <div className="input_outer">
                <input
                    type="text"
                    placeholder="Search Store..."
                    className="input_width"
                />
                <button className="btn_search">Search</button>
            </div> */}
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Store Name</th>
                            <th scope="col">Product_Title</th>
                            <th scope="col">
                                <button
                                    className="btn_sort"
                                    onClick={() =>
                                        sort_num("Discount_Price", pricesort)
                                    }
                                >
                                    Price
                                    {pricesort ? (
                                        <FontAwesomeIcon icon="caret-down" />
                                    ) : (
                                        <FontAwesomeIcon icon="caret-up" />
                                    )}
                                </button>
                            </th>
                            <th scope="col">
                                <button
                                    className="btn_sort"
                                    onClick={() =>
                                        sort_num("Viewed", viewedsort)
                                    }
                                >
                                    Viewed
                                    {viewedsort ? (
                                        <FontAwesomeIcon icon="caret-down" />
                                    ) : (
                                        <FontAwesomeIcon icon="caret-up" />
                                    )}
                                </button>
                            </th>
                            <th scope="col">
                                <button
                                    className="btn_sort"
                                    onClick={() =>
                                        sort_num("Contacted", contactedsort)
                                    }
                                >
                                    Contacted
                                    {contactedsort ? (
                                        <FontAwesomeIcon icon="caret-down" />
                                    ) : (
                                        <FontAwesomeIcon icon="caret-up" />
                                    )}
                                </button>
                            </th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allproducts?.map((val, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{val.Store.Full_Name}</td>
                                <td>{val.Product_Title}</td>
                                <td>{val.Discount_Price}</td>
                                <td>{val.Viewed}</td>
                                <td>{val.Contacted}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(index)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Product</Modal.Title>
                    <Button variant="secondary" onClick={handleClose}>
                        <FontAwesomeIcon
                            icon="times"
                            size="lg"
                            color="#fff"
                            className="close_btn"
                        />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <UpdateProduct editproduct={editproduct} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ShowProduct;
