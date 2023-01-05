import React, {useContext} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../../GlobalState'
import {Link} from 'react-router-dom'

function FavItem({item}) {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [fav, setFav] = state.userAPI.fav

    const addToFav = async (fav) => {
        await axios.patch('/user/addfav', {fav}, {
        headers: {Authorization: token}
    })}

    const removeAd = id => {
        if(window.confirm("Do you want to delete this ad?")){
            fav.forEach((ad, index) => {
                if(ad._id === id){
                    fav.splice(index, 1)
                }
            })
            
            setFav([...fav])
            addToFav(fav)
        }
    }

    return (
        <tr>
            <td style={{
                width: '100px', overflow: 'hidden'
            }}>
                <img src={item.images[0].url} alt={item.images[0].url} 
                className='img-thumbnail w-100'
                style={{
                    minWidth: '100px', height: '80px'
                }} />
            </td>

            <td style={{minWidth: '200px'}} className="w-50 align-middle">
                <h5 className="text-capitalize text-secondary" title={item.title}>
                    <Link to={`/detail/${item._id}`} style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        lineHeight: '1.5',
                        letterSpacing: '0.00938em',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        textTransform: 'uppercase',
                        margin: 'auto'
                        }}>
                        {item.title}
                    </Link>
                </h5>

                <h6 className="text-danger" style={{
                    fontWeight: 'bold',
                    lineHeight: '1.5',
                    letterSpacing: '0.00938em',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    margin: 'auto'
                }}
                >{item.province}</h6>
            </td>

            <td className="align-middle" style={{minWidth: '20px', cursor: 'pointer'}}>
                <i className='fa-solid fa-trash-can text-danger'
                style={{fontSize: '20px'}}
                onClick={() => removeAd(item._id)}
                ></i>
            </td>


        </tr>
    )
}

export default FavItem