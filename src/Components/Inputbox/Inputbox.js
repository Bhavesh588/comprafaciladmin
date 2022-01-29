import React from 'react'

import './Inputbox.scss'

const Inputbox = ({ type, placeholder, value, setvalue, err, cal_dis }) => {
    return (
        <div className="inputbox">
            <input
                type={type}
                placeholder={placeholder}
                className="txt_input"
                value={value}
                onChange={(e) => {
                    if (
                        placeholder === 'Offer Price' ||
                        placeholder === 'Original Price' ||
                        placeholder === 'Minimum Qty'
                    ) {
                        if (
                            isFinite(e.target.value[e.target.value.length - 1])
                        ) {
                            if (
                                e.target.value[e.target.value.length - 1] !==
                                ' '
                            ) {
                                setvalue(e.target.value)
                            }
                        } else if (e.target.value === '') {
                            setvalue('')
                        }
                    } else {
                        setvalue(e.target.value)
                    }
                }}
            />
            {err ? <div className="text-light bg-danger">Required</div> : null}
        </div>
    )
}

export default Inputbox
