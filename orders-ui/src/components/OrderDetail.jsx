import { Link } from "react-router-dom";

function OrderDetail({ order, url }) {
    return (
        <>
            <div className="card" >
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-subtitle">Order Id</h5>
                        <p className="card-text ">
                            {order.$id}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-subtitle"> CustomerName</h5>
                        <p className="card-title ">
                            {order.customerName}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-subtitle"> Amount</h5>
                        <p className="card-text ">
                            Rs.{order.orderAmount}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-subtitle"> Date</h5>
                        <p className="card-text ">
                            {new Date(order.orderDate).toLocaleString()}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-subtitle">Invoice pdf</h5>
                        <Link
                            to={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-dark"
                            download="invoice.pdf"
                        >
                            Download Invoice
                        </Link>
                    </div>
                </div>
            </div>


        </>

    )

}
export default OrderDetail;