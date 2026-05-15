import { Routes, Route } from 'react-router-dom';
import CreateProfilePage from './pages/CreateProfile/CreateProfile';


const App = () => {
  return (
    <Routes>
      <Route path="/create-profile" element={<CreateProfilePage />} />
    </Routes>
  )
}

export default App
