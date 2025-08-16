import { Link } from 'react-router'

export function Nav() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <a href="/" className="nav-brand"><i className="bi bi-cup-hot"></i> CoffeeShop</a>
                        <ul className="nav-links">
                            <Link to={'/'} className="nav-link active">Home</Link>
                            <Link to={'/dashboard'} className="nav-link">Dashboard</Link>
                            <Link to={'/product'} className="nav-link">Products</Link>
                            <Link to={'/contact'} className="nav-link">Contact</Link>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}