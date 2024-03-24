import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "../../store/User-Slice";
import { uiActions } from "../../store/Ui-Slice";
import CouponList from "../couopon/CouponList";
import { toast } from 'react-toastify';

const UserCoupons = () => {
    let display = " "
    let sortedCoupons = [];
    const errorMessage = useSelector(state => state.ui.errorMessage)
    const token = useSelector(state => state.auth.token)
    const type = useSelector(state => state.auth.type)
    const purchaseVisibility = useSelector(state => state.ui.purchaseVisibility)
    const deleteVisibility = useSelector(state => state.ui.deleteVisibility)
    const [userCoupons, setUserCoupons] = useState([])
    const [sortType, setSortType] = useState(" ");
    const dispatch = useDispatch()


    if (purchaseVisibility) {
        dispatch(uiActions.togglePurchaseVisibility()); //when displaying customer coupons- toggle purchase button
    }
    useEffect(() => {
        if (!deleteVisibility && type) {
            toast.promise(fetchCouponsByTypeAndToken(type, token),
                { error: errorMessage });
        }
        if (deleteVisibility && type) {
            fetchCouponsByTypeAndToken(type, token)
            dispatch(uiActions.toggleDeleteVisibility(false))
        }
    }, [type, deleteVisibility])

    display = <CouponList coupons={userCoupons} />

    const fetchCouponsByTypeAndToken = async (type, token) => {
        const response = await fetch(`http://localhost:8086/api/${type}/all/${token}`)
        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            dispatch(uiActions.loadError(error.message));
            throw new Error(error.message);
        }
        const data = await response.json();
        dispatch(userActions.loadUserCoupons(data));
        setUserCoupons(data)
        console.log(data);
        return data;
    }

    useEffect(() => {
        switch (sortType) {
            case "title":
                sortedCoupons = [...userCoupons].sort((a, b) =>
                    a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
                setUserCoupons(sortedCoupons);
                break;
            case "start":
                sortedCoupons = [...userCoupons].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                setUserCoupons(sortedCoupons);
                break;
            case "end":
                sortedCoupons = [...userCoupons].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
                setUserCoupons(sortedCoupons);
                break;
            default:
        }
        display = <CouponList coupons={userCoupons} />

    }, [sortType]);

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    return (
        <div className="user-coupons">

            <div className="sort-options">
                <label htmlFor="sort-select">Sort by:</label>
                <select id="sort-select" value={sortType} onChange={handleSortChange}>
                    <option value="">Select Sort Option</option>
                    <option value="title">Coupon's Title</option>
                    <option value="start">Coupon's Start Date</option>
                    <option value="end">Coupon's End Date</option>
                </select>

            </div>
            {display}
        </div>
    );
}

export default UserCoupons;