import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header";
import LandingPage from "./pages/home/LandingPage";
import Login from "./pages/login/Login";
import GetUser from "./components/user/GetUser";
import ChangeUserSettings from "./components/user/ChangeUserSettings"
import UserCoupons from "./components/user/UserCoupons";
import AddCoupon from "./components/company/AddCoupon";
import NearlyExpired from "./components/customer/NearlyExpired";
import ExploreCoupons from "./components/couopon/ExploreCoupons";
const App = () => {

    const token = useSelector(state => state.auth.token)
    const type = useSelector(state => state.auth.type)
    const errorMessage = useSelector(state => state.user.errorMessage)
    const userDetails = useSelector((state) => state.user.details)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
        if (token === null || token === undefined) {
            localStorage.removeItem('type')
            navigate("/");
        }
    }, [token])

    useEffect(() => {
        if (userDetails) {
            setEmail(userDetails.email)
            setPassword(userDetails.password)
        }
    }, [userDetails])

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage, {
                position: "top-center", hideProgressBar: false, theme: "dark",
            });
        }
    }, [errorMessage])

    return (
        <div className="App">
            <Header token={token} type={type} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<GetUser />} />
                <Route path="/my-coupons" element={<UserCoupons />} />
                <Route path="/account" element={<ChangeUserSettings email={email} password={password} />} />
                <Route path="/explore" element={<ExploreCoupons />} />
                <Route path="/add-coupon" element={<AddCoupon />} />
                <Route path="/almost-expired" element={<NearlyExpired />} />
            </Routes>

        </div>

    );
}

export default App;