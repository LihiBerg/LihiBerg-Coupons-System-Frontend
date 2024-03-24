import { Card, CardBody, CardText, CardTitle, CardImg } from "reactstrap";
import profileImage from '../../UI/assets/companyProfile.png'
import '../../UI/card/Card.css'

const Company = ({ id, name, email, password }) => {
    const type = "company"
    return (
        <>
            <li className='company'>
                <Card>
                    <h1> Welcome Back, {name}!</h1>
                    <CardImg alt={type} src={profileImage} />

                    <CardBody>
                        <CardTitle> {name} </CardTitle>
                        <CardText> Email:  {email}</CardText>
                        <CardText> Password: {password}</CardText>
                        <CardText> Coupon-System-Id: {id}</CardText>
                    </CardBody>
                </Card>
            </li >
        </>

    );
};


export default Company;
