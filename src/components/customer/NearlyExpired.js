import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "../../store/User-Slice";
import { uiActions } from "../../store/Ui-Slice";
import CouponList from "../couopon/CouponList";
import { toast } from 'react-toastify';
import "../../UI/card/Card.css"
import pageImage from "../../UI/assets/expired.png"
import { Card, CardBody, CardText, CardTitle, CardImg } from "reactstrap";


const NearlyExpired = () => {
    const errorMessage = useSelector(state => state.ui.errorMessage)
    const token = useSelector((state) => state.auth.token)
    const [userCoupons, setUserCoupons] = useState([])
    const dispatch = useDispatch()
    let display = " "

    useEffect(() => {
        toast.promise(fetchAboutToExpireCoupons(token),
            { error: errorMessage });
    }, [token])

    if (userCoupons.length < 1) {
        display =
            <Card>
                <CardImg alt={'expired'} src={pageImage} />
                <CardBody>
                    <CardTitle> You're All Good, </CardTitle>
                    <CardText> None Of Your Coupons Are About To Expire</CardText>
                </CardBody>
            </Card>
    } else {
        display =
            <CouponList coupons={userCoupons} />
    }

    async function fetchAboutToExpireCoupons(token) {
        const response = await fetch(`http://localhost:8086/api/customer/all/nearly-expired/${token}`)
        if (!response.ok) {
            const error = await response.json();
            console.log(error)
            dispatch(uiActions.loadError(error.message))
            throw new Error(error.message)
        }
        const data = await response.json();
        dispatch(userActions.loadUserCoupons(data));
        console.log(data)
        setUserCoupons(data)
        return data;
    };

    return (
        <div className="nearly-expired">
            {display}
        </div>

    );
}

export default NearlyExpired;