import Company from "./Company";

const CompanyContainer = ({ details }) => {

    return (
        <>
            <Company
                id={details.id}
                name={details.name}
                email={details.email}
                password={details.password}
            />
        </>
    );
}
export default CompanyContainer;