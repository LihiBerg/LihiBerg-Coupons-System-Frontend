import Coupon from "./Coupon";

const CouponList = ({ coupons }) => {

    return (
        <>
            {coupons.map((coupon) => {
                return <Coupon key={coupon.id}
                    id={coupon.id}
                    title={coupon.title}
                    description={coupon.description}
                    category={coupon.category}
                    startDate={coupon.startDate}
                    endDate={coupon.endDate}
                    amount={coupon.amount}
                    price={coupon.price}
                    imageUrl={coupon.imageUrl} />
            })}
        </>
    );
}
export default CouponList;
