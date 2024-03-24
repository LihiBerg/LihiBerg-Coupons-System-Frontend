import Customer from "./Customer";

const CustomerContainer = ({ details }) => {

    return (
        <Customer id={details.id}
            first_name={details.first_name}
            last_name={details.last_name}
            email={details.email}
            password={details.password}
        />

    );
}
export default CustomerContainer;
