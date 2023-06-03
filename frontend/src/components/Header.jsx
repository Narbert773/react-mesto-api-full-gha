import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ title, email, route, onClick }) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип шапки" />
            <p className='header__email'>{email}</p>
            <Link to={route} className="header__button" type="button" onClick={onClick}>{title}</Link>
        </header>
    );
}

export default Header;