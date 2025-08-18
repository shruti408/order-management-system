import Header from "../components/Header";
import OrderForm from '../components/OrderForm';

function CreateOrder() {

    return (
        <>
            <Header />
            <div className="container col-md-8 col-lg-8 mt-4">
                <h3 className="p-2" >Create New Order </h3>
                <OrderForm />
            </div>

        </>

    )

}
export default CreateOrder;