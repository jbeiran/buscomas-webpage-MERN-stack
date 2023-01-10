import React, {useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import AdItem from '../utils/adItem/AdItem'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'

function Ads() {

    const state = useContext(GlobalState)
    const [ads, setAds] = state.adsAPI.ads
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.adsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    useEffect(() => {
      document.title = 'Home'
    }, [])

    const handleCheck = (id) => {
      ads.forEach(ad => {
        if(ad._id === id) ad.checked = !ad.checked
      })
      setAds([...ads])
    }

    const checkAll = () => {
      ads.forEach(ad => {
        ad.checked = !isCheck
      })
      setAds([...ads])
      setIsCheck(!isCheck)
    }

    const deleteAd = async(id, public_id) => {
      try {
          setLoading(true)
          const deleteImg = axios.post('/api/destroy', {public_id}, {
              headers: {Authorization: token}
          })

          const deleteAd = axios.delete(`/api/ads/${id}`,{
              headers: {Authorization: token}
          })      
          
          
          await deleteImg
          await deleteAd
          setCallback(!callback)
          setLoading(false)

      } catch(err){
          alert(err.response.data.msg)
      }
    }

    const deleteAll = () => {
      ads.forEach(ad => {
        if(ad.checked) deleteAd(ad._id, ad.images.public_id)
      })
    }

    if(loading) return <div className='ads'><Loading /></div>

    return (
      <>
        <div>
          <Filters />
          {
            isAdmin &&
            <div className="delete-all" style={{marginBottom: '50px', marginTop: '-20px'}}>
    
              <input type="checkbox" checked={isCheck} onChange={checkAll}
              style={{width: '25px', height: '25px', transform: 'translateY(8px)'}} />

              <button className='btn ml-2' onClick={deleteAll}
              style={{textAlign: 'center'}}>
                Cancellare tutti
              </button>

            </div>
          }

          <div className='ads'>
            {
              ads.map(ad => {
                return <AdItem key={ad._id} ad={ad} 
                isAdmin={isAdmin} deleteAd={deleteAd} handleCheck={handleCheck}/>
              })
            }
          </div>

          {ads.length === 0 && 
            <div className='no_ads' 
            style={{textAlign: 'center', fontSize: '3rem', color: 'red', marginTop: '400px'}}
            >
              <h2>Nessun annuncio trovato.</h2>
            </div>
          }
          <LoadMore />
        </div>
      </>

    )
}

export default Ads