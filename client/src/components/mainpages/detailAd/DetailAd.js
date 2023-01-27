import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import AdItem from '../utils/adItem/AdItem'

function DetailAd() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [ads] = state.adsAPI.ads
    const [detailAd, setDetailAd] = useState([])
    const [tab, setTab] = useState(0);
    const addFav = state.userAPI.addFav

    const isActive = (index) => {
        if(tab === index) return 'active'
        return ''
    }
    
    useEffect(() => {
        
        if(params.id){
            ads.forEach(ad => {
                if(ad._id === params.id) setDetailAd(ad)
            })
        }

        window.scrollTo(0, 0)
    },[params.id, ads])

    if(detailAd.length === 0) return null;

    return (
        <>
            <div className='row detail_page'>
                <div className='col-md-6 mt-3'>
                    
                    <img src={detailAd.images[tab].url} alt={detailAd.images[tab].url}
                    className="img-fluid rounded"
                    style={{height: '500px'}}/>

                    <div className="row mx-0" style={{cursor: 'pointer', marginTop: '10px'}}>
                        {
                            detailAd.images.map((img, index) => (
                                <img key={index} src={img.url} alt={img.url}
                                className={`img-thumbnail rounded ${isActive(index)}`}
                                style={{height: '100%', width: '20%'}}
                                onClick={() => setTab(index)}/>
                            ))
                        }
                    </div>
                </div>

                <div className='col-md-6 mt-3' >
                    <h2 className="text-uppercase" 
                    style={{marginTop: '8px'}}>
                        {detailAd.title}
                    </h2>

                    <h6
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        zIndex: 1,
                        right: '0',
                        top: '10',
                        color: 'black',
                        padding: '5px 10px',
                        borderRadius: '0 0 0 5px',
                        background: 'white',
                        fontSize: '20px'
                    }}>
                        {detailAd.date} 
                    </h6>

                    <h5 className="text-danger">{detailAd.province}</h5>
                    <br></br>

                    <h5 className="text-danger">{detailAd.zone}</h5>
                    <br></br>

                    <div className="row justify-content-between mx-0">
                        <h6 className="text-danger">{detailAd.phone}</h6>
                    </div>

                    {detailAd.phone2 ?
                    <div className="row justify-content-between mx-0 mt-1">
                        <h6 className="text-danger">{detailAd.phone2}</h6>
                    </div> : null}

                    {detailAd.phone3 ?
                    <div className="row justify-content-between mx-0 mt-1">
                        <h6 className="text-danger">{detailAd.phone3}</h6>
                    </div> : null}

                    {detailAd.phone4 ?
                    <div className="row justify-content-between mx-0 mt-1">
                        <h6 className="text-danger">{detailAd.phone4}</h6>
                    </div> : null}

                    {detailAd.phone5 ?
                    <div className="row justify-content-between mx-0 mt-1">
                        <h6 className="text-danger">{detailAd.phone5}</h6>
                    </div> : null}        

                    <div className="my-2">{detailAd.description}</div>
                    <div className="my-2">{detailAd.content}</div><br></br>

                    <div className="row justify-content-between mx-0">
                        <button className="btn btn-dark"
                        style={{marginRight: '10px'}}
                        onClick={() => addFav(detailAd)}>
                            Aggiungi ai preferiti
                        </button>
                    </div>

                </div>
            </div>

            <div>
                <h2 className="text-uppercase"
                style={{marginTop: '70px', 
                marginBottom: '20px'}}>
                    Annunci correlati
                </h2>

                <div className='ads'>
                    {
                        ads.map(ad => {
                            return ad.category === detailAd.category
                            ? <AdItem key={ad._id} ad={ad} /> : null
                        })
                    }
                </div> 
            </div>
        </>
    )
}

export default DetailAd