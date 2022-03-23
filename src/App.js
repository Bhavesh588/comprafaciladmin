import AddProduct from "./Pages/AddProducts/AddProduct";
import ShowProduct from "./Pages/ShowProduct/ShowProduct";
import { Routes, Route } from "react-router-dom";
import ShowStore from "./Pages/ShowStore/ShowStore";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/comprafaciladmin"
                    exact
                    element={<ShowProduct />}
                />
                <Route
                    path="/comprafaciladmin/addproduct"
                    element={<AddProduct />}
                />
                <Route
                    path="/comprafaciladmin/stores"
                    element={<ShowStore />}
                />
            </Routes>
        </div>
    );
}

export default App;
