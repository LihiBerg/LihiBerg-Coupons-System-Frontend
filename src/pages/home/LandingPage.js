import { useState, useEffect } from "react";
import CouponList from "../../components/couopon/CouponList";
import "../../UI/assets/Background.css"

const LandingPage = () => {
    const [coupons, setCoupons] = useState([])
    useEffect(() => {
        fetch("http://localhost:8086/api/coupon")
            .then(response => response.json())
            .then(data => setCoupons(data))
            .catch(error => console.log(error))
    }, [])

    let display = <h1>No Content To Display</h1>
    if (coupons.length > 0) {
        display = <CouponList coupons={coupons} />
    }

    return (
        <>
            <div
                className='landingPage'>
                {display}
            </div>
        </>
    );
}

export default LandingPage;