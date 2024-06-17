import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'

const Home = React.lazy(async () => await import('./Home'))
const CardMaker = React.lazy(async () => await import('./card_maker/CardMaker'))
const NoRoute = React.lazy(async () => await import('./NoRoute'))
const InProgress = React.lazy(async () => await import('./InProgress'))

class RouteList extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Suspense fallback={<LoadingSpinner size='xl' color='#CB807D' />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cardmaker' element={<CardMaker />} />
          <Route path='/deckbuilder' element={<InProgress />} />
          <Route path='/game' element={<InProgress />} />
          <Route path='*' element={<NoRoute />} />
        </Routes>
      </Suspense>
    )
  }
}

export default RouteList
