import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import FavItem from '../utils/favItem/FavItem'

function Fav() {
  const state = useContext(GlobalState)
  const [fav] = state.userAPI.fav
  const [token] = state.token

  useEffect(() => {
    document.title = 'Fav'
  }, [])

  if(!token) return <h2 style={{textAlign: 'center', fontSize: '5rem'}}>Login to continue</h2>
  if(fav.length === 0) return <h2 style={{textAlign: "center", fontSize: "3rem", marginTop: '400px'}}>No hay favs</h2>

  return (
    <div className='row mx-auto'>
      <div className='col-md-8 text-secondary table-responsive my-3'>
        <h2 className='text-uppercase'>Favs</h2>

        <table className='table my-3'>
          <tbody>
            {
              fav.map(ad => (
                <FavItem key={ad._id} item={ad} fav={ad} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Fav