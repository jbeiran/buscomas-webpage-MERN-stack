import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.adsAPI.page
    const [result] = state.adsAPI.result

    return (
        <div className='load_more'>
            {
                result < page * 9 ? ""
                : <button onClick={() => setPage(page + 1)}>Carica di più</button>
                
            }
        </div>
    )
}

export default LoadMore