import React, { useState } from 'react'

const Searcher = ({weather, temp}) => {
    const [isCelsius, setIsCelsius] = useState(true)

    

    console.log(weather)

    const changeUnitTemp = () => setIsCelsius(!isCelsius)


    return (
        <>


        <section className='text-xl'>
            <h2 className='text-center text-white bg-blue-500/70 mb-4 font-bold text-2xl tracking-wide w-64 m-auto bg-blue-500 p-4 rounded-md shadow-md border border-gray-300 sm:text-3xl sm:p-5 sm:mb-8'>{weather.name}, {weather.sys.country}</h2>

            <section className='grid gap-6 sm:grid-cols-two'>
                <article className='bg-slate-300/70 rounded-3xl grid grid-cols-2 justify-items-center items-center p-4 gap-8 sm:p-8 sm:w-[30rem]'>
                    <h3 className='text-[25px] capitalize col-start-1 col-end-3 sm:text-[35px]'>{weather.weather[0].description}</h3>

                    <h2 className='text-[35px] font-light  sm:text-[55px] sm:font-bold'>{isCelsius ? `${temp.celsius} °C` : `${temp.fahrenheit} °F`}</h2>

                    <div>
                        <img className='animate-bounce hover:animate-spin' src={`/icons/${weather.weather[0].icon}.png`} alt="" />
                    </div>
                </article>


                <article className='bg-slate-300/70 rounded-3xl grid grid-cols-3 sm:grid-cols-1 sm:py-0 sm:px-8'>
                    <div className='text-sm flex flex-col items-center py-4 gap-2'>
                        <div>
                            <img src="/images/wind.png" alt="" />
                        </div>

                        <h5>{weather.wind.speed} m/s</h5>
                    </div>

                    <div className='text-sm flex flex-col items-center py-4 gap-2'>
                        <div>
                            <img src="/images/humidity.png" alt="" />
                        </div>

                        <h5>{weather.main.humidity}%</h5>
                    </div>

                    <div className='text-sm flex flex-col items-center py-4 gap-2'>
                        <div>
                            <img src="/images/pressure.png" alt="" />
                        </div>

                        <h5>{weather.main.pressure} hPa</h5>
                    </div>
                </article>
            </section>

            <button onClick={changeUnitTemp} className='bg-blue-500 py-2 px-6 text-white font-bold rounded-full hover:bg-blue-800 duration-200 text-sm block mx-auto mt-4 sm:text-lg sm:mt-8'>Change °C/°F</button>

            
        </section>
        </>

        
        
    )
}

export default Searcher
