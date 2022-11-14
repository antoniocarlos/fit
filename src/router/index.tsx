import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))

const Router = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  )
}

export default Router
