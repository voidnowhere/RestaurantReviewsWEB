import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProfileInformation from "./components/ProfileInformation.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";
import Home from "./components/Home.jsx";
import {useSelector} from "react-redux";
import Restaurant from "./components/Restaurant.jsx";
import RestaurantsVerification from "./components/RestaurantsVerification.jsx";
import Ratings from "./components/Ratings.jsx";

function App() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isReviewer = useSelector(state => state.user.isReviewer);

    return (
        <BrowserRouter>
            <Routes>y
                <Route path="/" element={<Home/>}/>
                <Route path="/restaurant" element={<Restaurant/>}/>
                <Route path='/ratings/:restaurantId' element={<Ratings/>}/>
                <Route path="/login" element={(isAuthenticated) ? <Navigate to="/"/> : <Login/>}/>
                <Route path="/register" element={(isAuthenticated) ? <Navigate to="/"/> : <Register/>}/>
                <Route path="/profile" element={(!isAuthenticated) ? <Navigate to="/login"/> : <ProfileInformation/>}/>
                <Route path="/update-password"
                       element={(!isAuthenticated) ? <Navigate to="/login"/> : <UpdatePassword/>}/>
                <Route path="/restaurants/verification"
                       element={(!isAuthenticated && !isReviewer) ? <Navigate to="/login"/> :
                           <RestaurantsVerification/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
