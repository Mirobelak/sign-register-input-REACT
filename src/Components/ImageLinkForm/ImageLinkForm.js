import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <div id="join" className='center'>
                <form className=' form center pa4 br3 shadow-5'>
                <input type="text" className='f4 pa2 w-70 center' onChange={onInputChange}/>
                    <button className=' w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </form>
             

            </div>
        </div>
    );
}

export default ImageLinkForm;
