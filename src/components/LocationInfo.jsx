import React from 'react'

const LocationInfo = ({location}) => {


    return (
        <article>
            <div className='infoLocation'>
                <h2>{location?.name}</h2>
                <ul>
                    <li><span>type👉🏻 </span> {location?.type}</li>
                    <li><span>Dirension👉🏾 </span> {location?.dimension}</li>
                    <li><span>Populencion👉 </span>{location?.residents.length}</li>
                </ul>
            </div>

        </article>
    )
}

export default LocationInfo