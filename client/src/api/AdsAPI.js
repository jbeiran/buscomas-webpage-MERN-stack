import {useState, useEffect} from 'react'
import axios from 'axios'

function AdsAPI() {
    const [ads, setAds] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [province, setProvince] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

        
    useEffect(() => {
        const getAds = async () => {
            const response  = await axios.get(`/api/ads?limit=${page*6}&${province}&${category}&${sort}&title[regex]=${search}`)
            setAds(response.data.ads)
            setResult(response.data.result)
        }
        getAds()
    },[callback, category, province, sort, search, page])

      
    return{
        ads: [ads, setAds],
        callback: [callback, setCallback],
        category: [category, setCategory],
        province: [province, setProvince],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default AdsAPI