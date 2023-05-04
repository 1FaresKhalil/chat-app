import React from 'react';
import '../style/_spinner.scss';

function Spinner() {
    let spinnerElem =
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <div className="spinner spinner-border loading mt-4" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    return (
        <div>
            {spinnerElem}
        </div>
    );
}

export default Spinner;