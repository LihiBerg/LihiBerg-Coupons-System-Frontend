import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, CardImg } from "reactstrap";
import '../../UI/card/Card.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { userActions } from "../../store/User-Slice";
import uiActions from "../../store/Ui-Slice"

const Coupon = ({ id, title, description, category, startDate, endDate, amount, price, imageUrl }) => {
    const token = useSelector(state => state.auth.token)
    const type = useSelector(state => state.auth.type)
    const purchaseVisibility = useSelector(state => state.ui.purchaseVisibility)
    const [showCustomerButton, setShowCustomerButton] = useState(false)
    const [showCompanyButton, setShowCompanyButton] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (type) {
            switch (type) {
                case "customer":
                    setShowCustomerButton(true)
                    break;
                case "company":
                    setShowCompanyButton(true)
                    break;
            }
        }
    }, [type])

    async function handlePurchase() {
        const response = await fetch(`http://localhost:8086/api/customer/purchase/${token}?uuid=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            const error = await response.json();
            toast.error(error.message);
            console.log(error);
            dispatch(uiActions.loadError(error.message));
            throw new Error(error.message);
        }
        const data = await response.json();
        toast.success(`Purchase Succeed! Enjoy Your Coupon!`)
        dispatch(userActions.loadUserCoupons(data));
        console.log(data);
        return data;
    }

    async function handleDelete() {
        const response = await fetch(`http://localhost:8086/api/company/delete/${token}?uuid=${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        })
        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            dispatch(uiActions.loadError(error.message));
            throw new Error(error.message);
        }
        dispatch(uiActions.toggleDeleteVisibility(true));
        toast.success(`Coupon has been deleted successfully!`)
    }


    return (
        <li className="coupon">
            <ToastContainer />
            <Card>
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardSubtitle>{description}</CardSubtitle>
                    <CardImg alt={title} src={imageUrl} />
                    <CardText>Available from:&ensp;{startDate}</CardText><CardText className="end-date">&emsp; until:&ensp;{endDate}</CardText>
                    <CardText>Only {amount} Coupons Left!</CardText>
                    <CardText>Category: &ensp;{category}</CardText>
                    {!showCustomerButton && <CardText className="price"> Price: {price} ₪ </CardText>}
                </CardBody>
                {purchaseVisibility && showCustomerButton && <Button onClick={handlePurchase}>Purchase: {price} ₪ </Button>}
                {showCompanyButton && <Button onClick={handleDelete}> Delete Coupon </Button>}
            </Card>
        </li>
    );
}

export default Coupon;