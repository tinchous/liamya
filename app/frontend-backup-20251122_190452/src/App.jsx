import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Productos from './pages/Productos'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
