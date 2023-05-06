import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProfileInformation from "./components/ProfileInformation.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";
import Home from "./components/Home.jsx";
import {useSelector} from "react-redux";
import RestaurantsVerification from "./components/RestaurantsVerification.jsx";
import RatingsVerification from "./components/RatingsVerification.jsx";
import Restaurant from './components/Restaurant.jsx';

function App() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isReviewer = useSelector(state => state.user.isReviewer);

    const router = createBrowserRouter([
        {path: "/", element: <Home/>,},
        {path: "/login", element: (isAuthenticated) ? <Navigate to="/"/> : <Login/>,},
        {path: "/register", element: (isAuthenticated) ? <Navigate to="/"/> : <Register/>,},
        {path: "/profile", element: (!isAuthenticated) ? <Navigate to="/login"/> : <ProfileInformation/>,},
        {path: "/update-password", element: (!isAuthenticated) ? <Navigate to="/login"/> : <UpdatePassword/>,},
        {
            path: "/verifications",
            element: (!isAuthenticated && !isReviewer) ? <Navigate to="/login"/> : <RestaurantsVerification/>,
        },
        {
            path: "/verifications/:restaurantId/ratings",
            element: (!isAuthenticated && !isReviewer) ? <Navigate to="/login"/> : <RatingsVerification/>,
        },
        {
            path: "/restaurant/:nom",
            element: <Restaurant/>,
        },

    ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default App
