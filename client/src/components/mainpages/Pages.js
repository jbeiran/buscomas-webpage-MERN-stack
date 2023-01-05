import React, {useContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import Ads from './ads/Ads'
import DetailAd from './detailAd/DetailAd'
import Login from './auth/Login'
import Register from './auth/Register'
import Fav from './fav/Fav'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateAd from './createAd/CreateAd'
import ActivationEmail from './auth/ActivationEmail'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'

import {GlobalState} from '../../GlobalState'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

  return (
    <section>
      <Routes>
        <Route path="/" exact element={<Ads />} />
        <Route path="/detail/:id" exact element={<DetailAd />} />

        <Route path="/login" exact element={isLogged ? <NotFound /> : <Login />} />
        <Route path="/register" exact element={isLogged ? <NotFound /> : <Register />} />
        <Route path="/user/activate/:activation_token" exact element={<ActivationEmail />} />

        <Route path="/forgot_password" exact element={isLogged ? <NotFound /> : <ForgotPassword />} />
        <Route path="/user/reset/:token" exact element={isLogged ? <NotFound /> : <ResetPassword />} />

        <Route path="/category" exact element={isAdmin ? <Categories /> : <NotFound />} />
        <Route path="/create_ads" exact element={isAdmin ? <CreateAd /> : <NotFound />} />
        <Route path="/edit_ad/:id" exact element={isAdmin ? <CreateAd /> : <NotFound />} />

        <Route path="/fav" exact element={<Fav />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default Pages