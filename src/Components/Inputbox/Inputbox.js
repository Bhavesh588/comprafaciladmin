import React from 'react'

import './Inputbox.scss'

const Inputbox = ({ type, placeholder, value, setvalue, err }) => {
    return (
        <div className="inputbox">
            <input
                type={type}
                placeholder={placeholder}
                className="txt_input"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
            />
            {err ? <div className="text-danger">Required</div> : null}
        </div>
    )
}

export default Inputbox
