import React from 'react'

import './Inputbox.scss'

const Inputbox = ({ type, placeholder, value, setvalue, required = false }) => {
    return (
        <div className="inputbox">
            <input
                type={type}
                placeholder={placeholder}
                className="txt_input"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                required={required}
            />
        </div>
    )
}

export default Inputbox
