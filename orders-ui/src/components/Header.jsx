import { Link } from "react-router-dom"

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">OMS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav  ">
                        <li className="nav-item me-5">
                            <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link active" aria-current="page" to="/orders/:id">OrderDetail</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/create">CreateOrder</Link>
                        </li>
                     </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;