import { Card, CardBody, CardText, CardTitle, CardImg } from "reactstrap";
import profileImage from '../../UI/assets/customerProfile.png'
import '../../UI/card/Card.css'

const Customer = ({ id, first_name, last_name, email, password }) => {
    const type = "customer"
    return (
        <li className='customer'>

            <Card>
                <h1> Welcome Back, {first_name}!</h1>
                <CardImg alt={type} src={profileImage} />

                <CardBody>
                    <CardTitle> {first_name}{" "}{last_name} </CardTitle>
                    <CardText> Email:  {email}</CardText>
                    <CardText> Password: {password}</CardText>
                    <CardText> Coupon-System-Id: {id}</CardText>
                </CardBody>
            </Card>
        </li >
    );
};


export default Customer;