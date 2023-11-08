import React, { useState, useEffect } from 'react';
import './index.css';

function PopUp({
    id,
    styleName="main",
    isEditMode=true,
    text,
    content,
    buttonLabel,
    popUpLabel,
    action
}) {
    // create state `open` with default as false
    const [open, setOpen] = useState(false);
    const [cancelMessage, setCancelMessage] = useState("");

    return (
        <>
            {/* click of button toggles `open` value therefore visibility */}
            <button
                className={`${styleName} btn`}
                onClick={() => setOpen(!open)}
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
                                <span aria-hidden="true">&#x2716;</span>
                            </button>
                            <div className="modal-header">
                                <h1 className="modal-title">
                                    {popUpLabel}
                                </h1>
                            </div>
                            { isEditMode ? (
                                <textarea
                                    className='modal-body'
                                    type='text'
                                    value={cancelMessage}
                                    placeholder={content}
                                    onInput={(e) => setCancelMessage(e.target.value)} />
                            ) : <p>
                                    {content}
                                </p>
                            }
                            <input
                                className="btn main submit-button"
                                type="button" value={buttonLabel}
                                onClick={() => {
                                    if (isEditMode) {
                                        action(cancelMessage);
                                    }
                                    setOpen(false);
                                    setCancelMessage("");
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PopUp;