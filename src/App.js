import AddProduct from './Pages/AddProducts/AddProduct'

import './App.scss'

function App() {
    return (
        <div className="App">
            <img
                src={require('./assets/Background.jpg')}
                alt="Background"
                className="bg_img"
            />
            {/* <AddProduct /> */}
        </div>
    )
}

export default App
