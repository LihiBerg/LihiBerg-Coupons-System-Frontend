import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import CompanyContainer from "../company/CompanyContainer"
import CustomerContainer from "../customer/CustomerContainer";
import { userActions } from "../../store/User-Slice";
import { uiActions } from "../../store/Ui-Slice";
import { logout } from '../../store/Auth-Slice';

const GetUser = () => {
    let display = "";
    const errorMessage = useSelector(state => state.ui.errorMessage)
    const token = useSelector(state => state.auth.token)
    const type = useSelector(state => state.auth.type)
    const dispatch = useDispatch()

    const [userDetails, setDetails] = useState([])

    useEffect(() => {
        if (type) {
            toast.promise(fetchUserByTypeAndToken(type, token),
                { error: errorMessage, success: "Great To Have You Back!" });
        }
    }, [token, type])

    switch (type) {
        case "customer":
            display = <CustomerContainer details={userDetails} />
            break;
        case "company":
            display = <CompanyContainer details={userDetails} />
            break;
    }

    async function fetchUserByTypeAndToken(type, token) {
        const response = await fetch(`http://localhost:8086/api/${type}/${token}`);
        if (!response.ok) {
            const error = await response.json();
            if (response.status == 401) { //dealing with expired token 
                dispatch(logout())
                console.log(error)
            }
            console.log(error)
            dispatch(uiActions.loadError(error.message))
            throw new Error(error.message)
        }
        const data = await response.json();
        dispatch(userActions.loadUserDetails(data));
        console.log(data)
        setDetails(data)
        return data;
    };


    return (
        <>
            <div className='get-user'>
                <ToastContainer />
                {display}
            </div >
        </>
    );
}
export default GetUser;
