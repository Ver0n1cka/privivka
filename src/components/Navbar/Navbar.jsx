import "./navbar.css"
import {NavLink} from 'react-router-dom'
import { useState } from "react";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const activeLinc = 'nav-list__link nav-list__link--active';
    const normalLinc = 'nav-list__link';

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="container">

                <div 
                    className={`burger-menu ${isMenuOpen ? 'open' : ''}`} 
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>


                <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
                    <li className="nav-list__item">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? activeLinc : normalLinc}
                            onClick={closeMenu}
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className="nav-list__item">
                        <NavLink 
                            to="/calculate" 
                            className={({ isActive }) => isActive ? activeLinc : normalLinc}
                            onClick={closeMenu}
                        >
                            Вычислить календарь
                        </NavLink>
                    </li>
                    <li className="nav-list__item">
                        <NavLink 
                            to="/ansvers" 
                            className={({ isActive }) => isActive ? activeLinc : normalLinc}
                            onClick={closeMenu}
                        >
                            Вопросы
                        </NavLink>
                    </li>
                    <li className="nav-list__item">
                        <NavLink 
                            to="/articles" 
                            className={({ isActive }) => isActive ? activeLinc : normalLinc}
                            onClick={closeMenu}
                        >
                            Статьи
                        </NavLink>
                    </li>
                </ul>


                <div 
                    className={`overlay ${isMenuOpen ? 'open' : ''}`} 
                    onClick={closeMenu}
                ></div>
            </div>
        </div>
    );
};

export default Navbar;