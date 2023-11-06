import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../button';
import { Component } from 'react';

function PopUp({
    id,
    text
}) {
    const PopUp = ({ id, text }) => {
        // create state `open` with default as false
        const [open, setOpen] = useState(false);

        return (
            <>
                {/* click of button toggles `open` value therefore visibility */}
                <button
                    className = 'popup-overlay'
                    onClick={() => setOpen(!open)}
                    type="button"
                    //className="btn btn-primary"
                    data-toggle="modal"
                    data-target={`#${id}`}
                >
                    {text}
                </button>
                {/* If open is true show your <div /> */}
                {open && (
                    <div
                        className="modal fade"
                        id={id}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        {text}
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* Popup content */}
                                    Content goes here.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

export default PopUp;