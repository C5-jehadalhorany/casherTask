import Login from './Components/Login';
import { Route, Routes } from "react-router-dom";
import Register from './Components/Register';
import ProductAndHistory from './Components/Product';
import GetHistory from './Components/History';

function App() {
  
  return (
    <div>
    <Routes>
      <Route path={"/register"} element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductAndHistory />} />
        <Route path="/admin" element={<GetHistory />} />


    
    </Routes>
    </div>
  );
}

export default App;
