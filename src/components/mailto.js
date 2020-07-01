import React from 'react'
import "../styles/side-panel.scss"

const Mailto = ({ email, subject, body, ...props }) => {
    return (
        <a 
        href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${(body || '')}`}
        style={{
        height: '100%',
        width: '100%',
        display: 'block'
        }}
        >{props.children}</a>
    );
}

export default Mailto