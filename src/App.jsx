import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProfileInformation from "./components/ProfileInformation.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";
import Home from "./components/Home.jsx";
import {useSelector} from "react-redux";
import Restaurant from './components/Restaurant.jsx';

function App() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/restaurant/:nom' element={<Restaurant/>} />
                <Route path="/login" element={(isAuthenticated) ? <Navigate to="/"/> : <Login/>}/>
                <Route path="/register" element={(isAuthenticated) ? <Navigate to="/"/> : <Register/>}/>
                <Route path="/profile" element={(!isAuthenticated) ? <Navigate to="/login"/> : <ProfileInformation/>}/>
                <Route path="/update-password"
                       element={(!isAuthenticated) ? <Navigate to="/login"/> : <UpdatePassword/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
