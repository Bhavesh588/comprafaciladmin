import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

import "./ShowStore.scss";

function ShowStore() {
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

    const verifying = async (id) => {
        console.log(id);
        var ver = {
            verify: "verify",
        };
        await db.collection("store").doc(id).update(ver);
        window.location.reload();
    };

    return (
        <div className="showstore">
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
                        <th>#</th>
                        <th>Store Name</th>
                        <th className="text-center">Verified</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>Directions</th>
                        <th className="text-center">Total Products</th>
                        <th>Subscription</th>
                    </tr>
                </thead>
                <tbody>
                    {allstore?.map((val, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{val.Full_Name}</td>
                            <td className="text-center">
                                {val.verify === "verify" ? (
                                    <div className="bg-success text-light p-2 rounded">
                                        Verified
                                    </div>
                                ) : (
                                    <button
                                        className="bg-danger text-light p-2 rounded border-0"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => verifying(val.Store_id)}
                                    >
                                        Not Verified
                                    </button>
                                )}
                            </td>
                            <td>{val.Email}</td>
                            <td>{val.contactDetails.telephone}</td>
                            <td>
                                <p>{val.Address.address1}</p>
                                <p>{val.Address.address2}</p>
                                <p>{val.Address.city}</p>
                                <p>{val.Address.state}</p>
                            </td>
                            <td className="text-center">
                                {countproduct(val.Store_id)}
                            </td>
                            <td className="text-center">
                                {val.Subscribe ? (
                                    <div className="bg-success text-light p-2 rounded">
                                        Subscribe
                                    </div>
                                ) : (
                                    <div className="bg-danger text-light p-2 rounded border-0">
                                        Not Subscribe
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowStore;
