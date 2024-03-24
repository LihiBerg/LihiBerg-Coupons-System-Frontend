import { Button, Form, Input, Label, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { login, findType } from '../../store/Auth-Slice';
import { uiActions } from "../../store/Ui-Slice"
import { useRef } from "react";
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
    const errorMessage = useSelector(state => state.ui.errorMessage)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const dispatch = useDispatch()

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        const token = await toast.promise(performLogin(email, password), { error: errorMessage });
        console.log(token)
        if (token) {
            dispatch(login(token));
        }

        const type = await findUserType(email, password)
        console.log(type)
        if (type) {
            dispatch(findType(type));
        }
    }

    async function performLogin(email, password) {
        const response = await fetch(`http://localhost:8086/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error)
            dispatch(uiActions.loadError(error.message))
            throw new Error(error.message)
        }
        toast.success("Logged In Successfully!")
        const data = response.text();
        return data;
    }

    async function findUserType(email, password) {
        const response = await fetch(`http://localhost:8086/api/login/type`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error)
            dispatch(uiActions.loadError(error.message))
            throw new Error(error.message)
        }
        const data = response.text();
        return data;
    }

    return (
        <main className="auth">
            <Form onSubmit={handleLoginSubmit}>
                <FormGroup className="hidden">
                    <Label for="email">Enter Email</Label>
                    <Input id="email" type="email" placeholder="Email" innerRef={emailRef} />
                </FormGroup>
                <FormGroup className="hidden">
                    <Label for="password">Enter Password </Label>
                    <Input id="password" type="password" placeholder="Password" innerRef={passwordRef} />
                </FormGroup>
                <Button type="submit"> Submit</Button>
            </Form>
        </main >
    );
}

export default Login;