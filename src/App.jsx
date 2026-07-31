import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import AppShell from './layouts/AppShell'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Styles from './pages/Styles'
import Gallery from './pages/Gallery'
import Shop from './pages/Shop'
import Profile from './pages/Profile'

const MIN_DISPLAY_MS = 700

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // drop the pre-React static splash from index.html now that React has taken over
    document.getElementById('splash')?.remove()

    const start = Date.now()
    const fontsReady = document.fonts?.ready ?? Promise.resolve()

    fontsReady.then(() => {
      const elapsed = Date.now() - start
      const wait = Math.max(MIN_DISPLAY_MS - elapsed, 0)
      setTimeout(() => setReady(true), wait)
    })
  }, [])

  return (
    <ThemeProvider>
      <AnimatePresence>{!ready && <LoadingScreen />}</AnimatePresence>

      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/styles" element={<Styles />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}