import { Routes, Route } from 'react-router-dom'
import React, { FC } from 'react'

import Home from './Home'
import CardMaker from './CardMaker'
import NoRoute from './NoRoute'
import InProgress from './InProgress'

const RouteList: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cardmaker' element={<CardMaker />} />
      <Route path='/deckbuilder' element={<InProgress />} />
      <Route path='/game' element={<InProgress />} />
      <Route path='*' element={<NoRoute />} />
    </Routes>
  )
}

export default RouteList
