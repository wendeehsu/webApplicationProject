import React from 'react';
import './index.css';

function MainButton({
    text, onClick
}) {
    return (
        <button 
            className='main btn'
            onClick={onClick}>
            {text}
        </button>
    )
}

function SecondaryButton({
    text, onClick
}) {
    return (
        <button
            className='secondary btn'
            onClick={onClick}>
            {text}
        </button>
    )
}
export { MainButton, SecondaryButton };