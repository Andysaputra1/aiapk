import { Navbar } from './component/Navbar/Navbar';
import { AiWorkspace } from './component/AiWorkspace/AiWorkspace';
import { Footer } from './component/Footer/Footer';
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