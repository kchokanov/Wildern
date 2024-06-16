import { Routes, Route } from 'react-router-dom'
import React from 'react'

import Home from './components/Home'
import CardMaker from './components/card_maker/CardMaker'
import NoRoute from './components/NoRoute'
import InProgress from './components/InProgress'

class RouteList extends React.Component<{}> {
  render (): React.JSX.Element {
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
}

export default RouteList
