import { Link } from "react-router-dom";

function OrderTable({ orders }) {
 
    return (
        <>
            <div className="container mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col"> Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Invoice</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <th scope="row"  >
                                    <Link to={`/orders/${order.$id}`} className="nav-link"  >
                                        {order.$id}
                                    </Link>
                                </th>

                                <td>{order.customerName}</td>
                                <td>{order.orderAmount}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>
                                    <Link className="nav-link" to={order.invoiceFileUrl} target="_blank" rel="noopener noreferrer" >
                                        invoice_link
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>

    )

}
export default OrderTable;