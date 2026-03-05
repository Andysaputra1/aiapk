import { Navbar } from './components/Navbar/Navbar';
import { AiWorkspace } from './pages/AiWorkspace/AiWorkspace';
import { Footer } from './components/Footer/Footer';
import './App.css'; 

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <AiWorkspace />
      <Footer />
    </div>
  )
}

export default App;