import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Modal, Button } from "react-bootstrap";

import UpdateProduct from "../UpdateProduct/UpdateProduct";

import "./ShowProduct.scss";

function ShowProduct() {
    const [allproducts, setAllProduct] = useState(null);
    const [editproduct, setEditProduct] = useState(null);
    const [show, setShow] = useState(false);

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

    const sort_num = (ind) => {
        var num = [];
        allproducts.map((val) => num.push(val[ind]));
        num.sort();
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
                            <th scope="col">Price</th>
                            <th scope="col">
                                <button
                                    className="btn_sort"
                                    onClick={() => sort_num("Viewed")}
                                >
                                    Viewed
                                </button>
                            </th>
                            <th scope="col">Contacted</th>
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
                        X
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
