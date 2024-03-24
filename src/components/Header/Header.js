import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { logout } from '../../store/Auth-Slice'
import { useState, useEffect } from "react";
import { userActions } from "../../store/User-Slice";


const Header = () => {
    const [showCustomerHeader, setShowCustomerHeader] = useState(false)
    const [showCompanyHeader, setShowCompanyHeader] = useState(false)
    const token = useSelector(state => state.auth.token)
    const type = useSelector(state => state.auth.type)
    const dispatch = useDispatch()


    const logoutHandler = () => {
        dispatch(logout())
        setShowCustomerHeader(false)
        setShowCompanyHeader(false)
    }

    useEffect(() => {
        if (type === "customer") {
            console.log(type);
            setShowCustomerHeader(true);
            dispatch(userActions.customer())

        } if (type === "company") {
            console.log(type);
            setShowCompanyHeader(true);
            dispatch(userActions.company())
        }
        if (type === null || type === undefined) {
            setShowCustomerHeader(false)
            setShowCompanyHeader(false)
        }

    }, [type, dispatch])


    return (
        <header className="header">
            <h1>Coupon System</h1>
            <nav>
                <ul className="main-header">
                    {!token && <li>
                        <Link to="/login" >Login</Link>
                    </li>}
                </ul>
            </nav>

            <nav>
                {showCustomerHeader &&
                    <ul className="customer-header">
                        <li>
                            <Link to="/home" >Home</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                        <li>
                            <Link to="/explore">Explore</Link>
                        </li>
                        <li>
                            <Link to="/my-coupons">My Coupons</Link>
                        </li>
                        <li>
                            <Link to="/almost-expired">Expires Soon</Link>
                        </li>

                    </ul>}

            </nav>
            <nav>
                {showCompanyHeader && (
                    <ul className="company-header">
                        <li>
                            <Link to="/home" >Home</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                        <li>
                            <Link to="/add-coupon">Add Coupon</Link>
                        </li>
                        <li>
                            <Link to="/my-coupons">My Coupons</Link>
                        </li>
                    </ul>
                )}
            </nav>
            <nav>
                {token && (
                    <ul className="logout">
                        <li>
                            <Button onClick={logoutHandler}>Logout</Button>
                        </li>
                    </ul>)}
            </nav>
        </header >
    );
};

export default Header;