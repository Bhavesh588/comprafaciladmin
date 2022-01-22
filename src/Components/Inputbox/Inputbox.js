import React from 'react'

import './Inputbox.scss'

const Inputbox = ({ type, placeholder }) => {
    return (
        <div className="inputbox">
            <input
                type={type}
                placeholder={placeholder}
                className="txt_input"
            />
        </div>
    )
}

export default Inputbox
