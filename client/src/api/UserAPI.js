import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [user, setUser] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const [fav, setFav] = useState([])

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setFav(res.data.fav)
                    setUser(res.data)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    }, [token])

    const addFav = async (ad) => {
        if(!isLogged) return alert("Effettuare il login per continuare!")

        const check = fav.every(item => {
            return item._id !== ad._id
        })

        if(check){
            setFav([...fav, ad])

            await axios.patch('/user/addfav', {fav: [...fav, ad]}, {
                headers: {Authorization: token}
            })
        }else{
            alert("Questo annuncio è stato aggiunto ai preferiti.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        fav: [fav, setFav],
        addFav: addFav,
        user: [user, setUser]
    }
}

export default UserAPI