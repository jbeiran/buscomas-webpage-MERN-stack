import React from 'react'
import BtnRender from './BtnRender'
import {Link} from 'react-router-dom'

function AdItem({ad, isAdmin, deleteAd, handleCheck}) {
    return (
        <div className='card' style={{ width: '20rem', marginLeft: 'margin-left: 615px' }}>

            {
                isAdmin && <input 
                type='checkbox' 
                checked={ad.checked}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    width: '20px',
                    height: '20px'
                }}
                onChange={() => handleCheck(ad._id)}
                />
            }

            <a href={`/detail/${ad._id}`}>
                <img className="card-img-top" src={ad.images[0].url} alt={ad.images[0].url}
                style={{ height: '250px', objectFit: 'cover' } } />
            </a>
            
        
            <div className="card-body">

                <Link to={`/detail/${ad._id}`} style={{textDecoration: 'none'}}>
                    <h5 className="card-title text-capitalize" title={ad.title}>
                        {ad.title}
                    </h5>
                </Link>

                <h6
                style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    zIndex: 1,
                    right: '0',
                    top: '0',
                    color: 'black',
                    padding: '5px 10px',
                    borderRadius: '0 0 0 5px',  
                    background: 'white',
                    fontSize: '15.45px',
                    marginTop: '6px',
                    marginRight: '5px'
                }}>
                    {ad.date}
                </h6>

                <div className="row justify-content-between mx-0">
                    <h6 className="text-danger">{ad.province}</h6>
                </div>

                <p className="card-text" title={ad.description}>
                    {ad.description}
                </p>

                <div className="row justify-content-between mx-0">
                    <BtnRender ad={ad} deleteAd={deleteAd}/>
                </div>
            </div>
        </div>
    )
}

export default AdItem