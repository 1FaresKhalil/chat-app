import React from 'react';

function UnAuthenticated() {
    return (
        <>
            <div>
                <div className='d-flex flex-row justify-content-center'>
                    <img className='logo'
                         src='https://cloud.mongodb.com/static/images/sadface.gif'
                         alt=''
                    />
                    <div className='pt-5 mt-4'>
                        <h1 className='pt-5 mt-5'>401 Unauthenticated!</h1>
                    </div>
                </div>

                <p className='text-center'>Oops! you should login first!.</p>
            </div>
        </>

    );
}

export default UnAuthenticated;