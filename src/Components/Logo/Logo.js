import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import photo from './photo.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 180, width: 180 }} >
        <div className="Tilt-inner pa3"> <img style={{padding: "auto"}} alt='mobil' src={photo}></img></div>
            </Tilt>
        </div>
    );
}

export default Logo;
