import React, { useState, useEffect } from 'react';
import './index.css';

function PopUp({
    styleName = "main",
    isEditMode = true,
    isReview = false,
    text,
    content,
    buttonLabel,
    popUpLabel,
    action
}) {
    // create state `open` with default as false
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [starNum, setStarNum] = useState(0);

    return (
        <>
            {/* click of button toggles `open` value therefore visibility */}
            <button
                className={`${styleName} btn`}
                onClick={() => setOpen(!open)}
                data-toggle="modal"
                data-target="#target"
            >
                {text}
            </button>
            {/* If open is true show your <div /> */}
            {open && (
                <div
                    className="popup-overlay"
                    id="target"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="popup-container" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                type="button"
                                className="close-button"
                                aria-label="Close"
                                onClick={() => setOpen(false)}
                                 >
                                <img src='../../images/close.png' alt="close" />
                                {/*<span aria-hidden="true">&#x2716;</span>*/}
                                </button>
                                <h1 className="modal-title">
                                    {popUpLabel}
                                </h1>
                            </div>
                            {
                                (isReview && isEditMode) && (
                                    <div className='star-section'>
                                        {
                                            Array.from({ length: 5 }).map((val, index) =>
                                                <img
                                                    key={`star-${index}`}
                                                    src={`../../images/star${index < starNum ? 'Solid': 'Line'}.png`}
                                                    alt="star"
                                                    onClick={() => setStarNum(index+1)}
                                                />
                                            )
                                        }
                                    </div>
                                )
                            }
                            {isEditMode ? (
                                <textarea
                                    className='modal-body'
                                    type='text'
                                    value={message}
                                    placeholder={content}
                                    onInput={(e) => setMessage(e.target.value)} />
                            ) : <p>
                                {content}
                            </p>
                            }
                            <input
                                className="btn main submit-button"
                                type="button" value={buttonLabel}
                                onClick={() => {
                                    if (isEditMode) {
                                        if (isReview) {
                                            action(starNum, message);
                                        } else {
                                            action(message);
                                        }
                                    }
                                    setOpen(false);
                                    setMessage("");
                                    setStarNum(0);
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