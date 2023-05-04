import React from 'react';
import '../style/_notfound.scss';



function NotFound() {

    return (
        <div>
            <div className='d-flex flex-row justify-content-center'>
                <img className='logo'
                    src='https://cloud.mongodb.com/static/images/sadface.gif'
                    alt=''
                />
                <div className='pt-5 mt-4'>
                    <h1 className='pt-5 mt-5'>404 Not found!</h1>
                </div>
            </div>

            <p className='text-center'>Oops! We can't find the page you were looking for.</p>
        </div>
    );
}

export default NotFound;