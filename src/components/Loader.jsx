import React from 'react'
import "./Loader.css"

const Loader = () => {
    return (
        <>
        <div className='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        
        <h1 className='mt-[10rem]'>Accediendo a tu ubicación...</h1>
        
        </>
    )
}

export default Loader
