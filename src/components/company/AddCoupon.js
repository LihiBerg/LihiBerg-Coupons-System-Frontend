import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../category/CategoryList";
import { Button, Form, Input, Label, FormGroup } from 'reactstrap';
import "./AddCoupon.css";
import { toast } from "react-toastify";
import { userActions } from "../../store/User-Slice";
import uiActions from '../../store/Ui-Slice'
import DatePicker from "react-datepicker";

const AddCoupon = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(undefined);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const errorMessage = useSelector(state => state.ui.errorMessage)
    const token = useSelector(state => state.auth.token)
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const amountRef = useRef(null)
    const priceRef = useRef(null)
    const imageUrlRef = useRef(null)
    const dispatch = useDispatch();


    const handleCategorySelect = (categoryId) => {
        if (categoryId != undefined) {
            setSelectedCategoryId(categoryId);
        }
        setSelectedCategoryId(14); //Default Category: 'Other'
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        const coupon = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            category: selectedCategoryId,
            startDate: startDate,
            endDate: endDate,
            amount: amountRef.current.value,
            price: priceRef.current.value,
            imageUrl: imageUrlRef.current.value,
        }

        toast.promise(handelAddCoupon(coupon),
            { success: `Coupon ${coupon.title} Added Successfully!`, error: errorMessage });
    }

    async function handelAddCoupon(coupon) {
        const response = await fetch(`http://localhost:8086/api/company/create/${token}`, {
            method: 'POST',
            headers: { "Content-Type": "application/Json" },
            body: JSON.stringify(coupon)
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            dispatch(uiActions.loadError(error.message));
            throw new Error(error.message);
        }
        const data = await response.json();
        dispatch(userActions.loadUserCoupons(data));
        console.log(data);
    };

    return (
        <>
            <main className="container">
                <Form onSubmit={submitHandler}>
                    <h1>Insert New Coupon</h1>
                    <FormGroup className="form-group">
                        <Label htmlFor="category-select">Select a category:</Label>
                        <CategoryList onSelect={handleCategorySelect} />
                    </FormGroup>
                    <FormGroup className="form-group">
                        Start Date:
                        <DatePicker className="datePicker"
                            dateFormat="yyyy/MM/dd"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            fixedHeight
                        />
                        End Date:
                        <DatePicker className="datePicker"
                            dateFormat="yyyy/MM/dd"
                            selected={endDate}
                            minDate={startDate}
                            onChange={(date) => setEndDate(date)}
                            fixedHeight
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="title">Title</Label>
                        <Input id="title" type="title" innerRef={titleRef} />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="description">Description</Label>
                        <Input id="description" type="description" innerRef={descriptionRef} />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="amount">Amount</Label>
                        <Input id="amount" type="amount" innerRef={amountRef}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="price">Price</Label>
                        <Input id="price" type="price" innerRef={priceRef} />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="image">Add Image Url Here: </Label>
                        <Input id="image" type="imageUrl" innerRef={imageUrlRef} />
                    </FormGroup>

                    <Button type="submit"> Submit </Button>
                </Form>
            </main>
        </>
    );
}

export default AddCoupon;