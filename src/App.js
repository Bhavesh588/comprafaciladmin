import AddProduct from "./Pages/AddProducts/AddProduct";
import ShowProduct from "./Pages/ShowProduct/ShowProduct";
import { Routes, Route } from "react-router-dom";
import ShowStore from "./Pages/ShowStore/ShowStore";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" exact element={<ShowProduct />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/stores" element={<ShowStore />} />
            </Routes>
        </div>
    );
}

export default App;
