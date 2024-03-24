import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "../../store/User-Slice";
import { uiActions } from "../../store/Ui-Slice";
import CouponList from "../couopon/CouponList";
import { toast, ToastContainer } from 'react-toastify';

const ExploreCoupons = () => {
    let display = " "
    const errorMessage = useSelector(state => state.ui.errorMessage)
    const purchaseVisibility = useSelector(state => state.ui.purchaseVisibility)
    const userCoupons = useSelector(state => state.userCoupons)
    const dispatch = useDispatch()
    const [allCoupons, setAllCoupons] = useState([])

    if (!purchaseVisibility) {
        dispatch(uiActions.togglePurchaseVisibility());
    }
    useEffect(() => {
        toast.promise(showAllCoupons(),
            { error: errorMessage });
    }, [userCoupons])

    display = <CouponList coupons={allCoupons} />

    const showAllCoupons = async () => {
        const response = await fetch("http://localhost:8086/api/coupon")
        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            dispatch(uiActions.loadError(error.message));
            throw new Error(error.message);
        }

        const data = await response.json();
        dispatch(userActions.loadAllCoupons(data));
        setAllCoupons(data)
        console.log(data);
        return data;
    };

    return (
        <div className="user-coupons">
            <ToastContainer />
            {display}

        </div>
    );
}

export default ExploreCoupons;