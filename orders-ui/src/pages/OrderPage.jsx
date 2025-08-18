import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById, getFileById } from '../services/orders-api';
import { toast } from 'react-toastify';
import OrderDetail from '../components/OrderDetail';

function OrderPage() {
    const { id } = useParams();
    const [order, setOrder] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {

                // get order by id 
                const orderById = await getOrderById(id);
                setOrder(orderById.data);

                // get invoice-file by file-id 
                const binarydata = await getFileById(id);

                // Create a Blob from the decoded binary data
                const blob = new Blob([binarydata.data], { type: 'application/pdf' });

                // Create a temporary URL for the Blob
                setUrl(URL.createObjectURL(blob));

            } catch (error) {
                toast.error('Failed to fetch order details.');
                console.error('Error fetching order details:', error);
            }
        };
        fetchOrder();
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="container col-md-8 col-lg-8 mt-4 ">
                <h3 className="p-2" >Order Details </h3>
                <OrderDetail order={order} url={url} />
            </div>
        </>
    );
}
export default OrderPage;