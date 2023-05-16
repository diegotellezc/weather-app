import React from 'react'
import gif from '/images/loader.gif';

const Loader = () => {
    return (
        <section className='grid place-items-center'>
            <img src={gif} alt="Loading gif" />
            <p className='font-bold mt-4 text-lg'>Please let us access your location!</p>
        </section>
    )
}

export default Loader
