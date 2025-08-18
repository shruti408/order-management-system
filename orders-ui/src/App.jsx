import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/CreateOrder';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/orders/:id" element={<OrderPage />} />
      </Routes>
       
    </>
  )
}

export default App
