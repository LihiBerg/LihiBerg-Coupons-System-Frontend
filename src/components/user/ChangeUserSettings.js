import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Label, FormGroup } from 'reactstrap';
import customerImg from "../../UI/assets/customerProfile.png"
import companyImg from "../../UI/assets/companyProfile.png"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { userActions } from "../../store/User-Slice";
import { Card, CardBody, CardText, CardTitle, CardImg } from "reactstrap";
import Button from 'react-bootstrap/Button';
import EdiText from 'react-editext';
import "../../UI/card/Card.css"

const ChangeUserSettings = ({ email, password }) => {
    const token = useSelector(state => state.auth.token)
    const type = useSelector(state => state.auth.type)
    const errorMessage = useSelector((state) => state.ui.errorMessage)
    const [updatedEmail, setUpdatedEmail] = useState(email);
    const [updatedPassword, setUpdatedPassword] = useState(password);
    const dispatch = useDispatch()

    const handleEmailSave = (updatedEmail) => {
        console.log(updatedEmail)
        setUpdatedEmail(updatedEmail)
    }

    const handlePasswordSave = (updatedPassword) => {
        console.log(updatedPassword)
        setUpdatedPassword(updatedPassword)
    }


    const handleUpdateSubmit = async (event) => {
        event.preventDefault()

        console.log(updatedEmail)
        console.log(updatedPassword)

        const newDetails = await toast.promise(updateAccountSettings(type, token, updatedEmail, updatedPassword),
            { pending: ' ', success: 'Account details have been successfully updated!', error: errorMessage });
        if (newDetails) {
            dispatch(userActions.loadUserDetails(newDetails));
        }
    }

    async function updateAccountSettings(type, token, email, password) {
        const response = await fetch(`http://localhost:8086/api/${type}/update-account-settings/${token}?email=${email}&password=${password}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const error = await response.json();
            toast.error(error.message);
            console.log(error)
            dispatch(userActions.loadUserError(error.message))
            throw new Error(error.message)
        }
        const data = await response.json();
        console.log(data)
        return data;
    };


    return (
        <>
            <li className="update-settings">
                <ToastContainer />
                <Form onSubmit={handleUpdateSubmit}>
                    <Card>
                        <CardTitle> Change Settings </CardTitle>
                        <CardImg alt={type} src={type === "customer" ? customerImg : companyImg} />
                        <CardBody>
                            <CardText>
                                <FormGroup>
                                    <Label for="email"></Label>
                                    <EdiText
                                        value={email}
                                        type="text"
                                        saveButtonContent="Apply"
                                        cancelButtonContent={<strong>Cancel</strong>}
                                        editButtonContent="Edit"
                                        onSave={handleEmailSave}
                                    />
                                </FormGroup>
                            </CardText>

                            <CardText>
                                <FormGroup>
                                    <Label for="password"> </Label>
                                    <EdiText
                                        value={password}
                                        type="text"
                                        saveButtonContent="Apply"
                                        cancelButtonContent={<strong>Cancel</strong>}
                                        editButtonContent="Edit"
                                        onSave={handlePasswordSave}
                                    />
                                </FormGroup>
                            </CardText>
                        </CardBody>
                        <Button variant="dark" type="Submit">Submit</Button>
                    </Card>

                </Form>
            </li >
        </>
    );
}

export default ChangeUserSettings;