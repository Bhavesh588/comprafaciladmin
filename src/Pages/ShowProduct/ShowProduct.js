import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

import "./ShowProduct.scss";

function ShowProduct() {
    const [allproducts, setAllProduct] = useState(null);
    const [allstore, setAllStore] = useState(null);

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
            if (allstore === null) {
                db.collection("store")
                    .get()
                    .then((val) => {
                        var pro = [];
                        val.docs.map((doc) => pro.push(doc.data()));
                        setAllStore(pro);
                    });
            }
        };
        fetchdata();
    }, [allproducts, allstore]);
    console.log(allstore);
    console.log(allproducts);

    // const sort_num = (ind) => {
    //     var num = [];
    //     allproducts.map((val) => num.push(val[ind]));
    //     num.sort();
    // };

    const countproduct = (id) => {
        var count = 0;
        allproducts.map((val) => {
            if (val.Store_id === id) {
                count = count + 1;
            }
            return 0;
        });
        return count;
    };

    return (
        <div className="showproduct">
            {/* <div className="input_outer">
                <input
                    type="text"
                    placeholder="Search Store..."
                    className="input_width"
                />
                <button className="btn_search">Search</button>
            </div> */}
            <table className="table table-hover">
                <thead>
                    <tr>
                        {/* <th scope="col">#</th>
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
                        <th scope="col">Contacted</th> */}
                        <th>#</th>
                        <th>Store Name</th>
                        <th className="text-center">Verified</th>
                        <th>Directions</th>
                        <th className="text-center">Total Products</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {allproducts?.map((val, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{val.Store.Full_Name}</td>
                            <td>{val.Product_Title}</td>
                            <td>{val.Discount_Price}</td>
                            <td>{val.Viewed}</td>
                            <td>{val.Contacted}</td>
                        </tr>
                    ))} */}
                    {allstore?.map((val, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{val.Full_Name}</td>
                            <td className="text-center">
                                {val.verify === "verify" ? "Yes" : "No"}
                            </td>
                            <td>
                                <p>{val.Address.address1}</p>
                                <p>{val.Address.address2}</p>
                                <p>{val.Address.city}</p>
                                <p>{val.Address.state}</p>
                            </td>
                            <td className="text-center">
                                {countproduct(val.Store_id)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowProduct;
