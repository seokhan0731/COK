import { Routes, Route } from 'react-router-dom';
import CreateProfilePage from './page/CreateProfile/CreateProfile';
import PlanningPage from './page/PlanningPage';

const App = () => {


  return (
    <Routes>
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/planning" element={<PlanningPage/>}/>
    </Routes>
  )
}

export default App
