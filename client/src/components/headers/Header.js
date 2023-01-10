/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [fav] = state.userAPI.fav

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <li className='nav-item'>
                    <Link to="/create_ads" style={{ textDecoration: 'none', color: 'black' }} className="nav-link active">
                        Creare annunci
                    </Link>
                </li>

                <li className='nav-item'>
                    <Link to="/category" style={{ textDecoration: 'none' }} className="nav-link active">
                        Categorie
                    </Link>
                </li>
            </>
        )
    }
  
    const loggedRouter = () => {
        return (
            <>
                <li className="nav-item">
                    <Link to="/fav" style={{ textDecoration: 'none' }} className="nav-link active">
                        <i className='fa-solid fa-heart text-danger position-relative' aria-hidden="true">
                            <span className='position-absolute' 
                                style={{top: '-10px', 
                                right: '10px', 
                                background: 'red', 
                                borderRadius: '50%', 
                                padding: '4px 6px', 
                                color: 'white', 
                                fontSize: '10px'}}>
                                    {fav.length}
                                </span>
                            </i> Preferiti
                    </Link>
                </li>


                <li className='nav-item'>
                    <Link to="/" onClick={logoutUser} style={{ textDecoration: 'none' }} className="nav-link active">
                        Disconnessione
                    </Link>
                </li>
            </>
        )
    }

    return (
        <header className='main-header my-2 z-10'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <Link to="/" style={{ textDecoration: 'none' }} className="navbar-brand">
                    {isAdmin ? 'Admin' : '  buscomas'}
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" 
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link to="/" style={{ textDecoration: 'none', marginLeft: '200px'}} className="nav-link active ">
                                 Casa
                            </Link>
                        </li>


                        {(isAdmin && adminRouter())}

                        {
                            isLogged ? loggedRouter() : 
                            <li className="nav-item" style={{color: 'white'}}>
                                <Link to="/login" style={{ textDecoration: 'none' }} className="nav-link active">
                                        <i className='fas fa-user position-relative' aria-hidden="true">
                                        </i> Accesso | Registro
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header