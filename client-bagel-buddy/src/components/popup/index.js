import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../button';
import { Component } from 'react';

function PopUp({
    id,
    text,
    content,
    buttonLabel,
    popUpLabel
}) {
    // create state `open` with default as false
    const [open, setOpen] = useState(false);
    const [textcancel, setCancel] = useState("");
    const [cancelMessage, submitMessage] = useState("")

    return (
        <>
            {/* click of button toggles `open` value therefore visibility */}
            <button
                className='main btn'
                onClick={() => setOpen(!open)} s
                data-toggle="modal"
                data-target={`#${id}`}
            >
                {text}
            </button>
            {/* If open is true show your <div /> */}
            {open && (
                <div
                    className="popup-overlay"
                    id={id}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="popup-container" role="document">
                        <div className="modal-content">
                            <button
                                type="button"
                                className="close-button"
                                aria-label="Close"
                                onClick={() => setOpen(false)}
                            >
                                <span aria-hidden="true">X</span>
                            </button>
                            <div className="modal-header">
                                <h1 className="modal-title">
                                    {popUpLabel}
                                </h1>
                            </div>
                            <textarea
                                className='modal-body'
                                type='text'
                                value={textcancel}
                                placeholder={content}
                                onInput={(e) => setCancel(e.target.value)} />
                            <input className="submit-button" type="button" value={buttonLabel}
                                /* TODO: Include backend for submitting cancellation message */
                                onClick={() => setOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PopUp;