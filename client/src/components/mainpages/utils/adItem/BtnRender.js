import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {GlobalState} from '../../../../GlobalState'

function BtnRender({ad, deleteAd}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addFav = state.userAPI.addFav
    
    return (
        <>
            { isAdmin ? 
            <>
                <Link to={`/edit_ad/${ad._id}`} 
                style={{
                    textDecoration: 'none',
                    marginRight: '5px', 
                    flex: 1
                }} 
                className="btn btn-info">
                        Modifica
                </Link>

                <Link className='btn btn-outline-danger'
                style={{
                    marginLeft: '5px',
                    flex: 1,
                    height: '100%'
                }}
                onClick={() => deleteAd(ad._id, ad.images[0].public_id)}>
                    Cancellare
                </Link>
            </> :
            <>
                <button className='btn btn-outline-danger'
                style={{
                    marginLeft: '5px',
                    flex: 1,
                    height: '100%',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    padding: '0px',
                    fontSize: '20px',
                    color: 'red',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1.2)'
                }}
                onClick={() => addFav(ad)}
                >
                    <i className='fa-solid fa-heart text-danger position-relative' aria-hidden="true" 
                    style={{
                        fontSize: '20px',
                        transition: 'all 0.3s ease',
                        transform: 'scale(1.2)'
                    }}></i>
                </button>
            </>
            }
        </>
    )
}

export default BtnRender;