import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import * as React from "react";
import {navItems} from "../../constants/constants.ts";
import styles from "../../styles/components/dashboard/sidebar.module.scss"

interface Props {
    isMenuOpen: boolean;
}

const SideBar: React.FC<Props> = ({ isMenuOpen }) => {
    const pathname: string = useLocation().pathname;
    const navigate = useNavigate();

    const isRouteActive = (route: string) => {
        if (pathname === '/dashboard' && route === '/dashboard') {
            return true;
        }
        const path = route.split('/')[2];
        return Boolean(pathname.includes(path));
    };

    return (
        <div className={`${styles['side-nav']} ${isMenuOpen ? styles['nav-active'] : ''}`}>
            <div className="">
                <ul className={styles['side-nav-menu']}>
                    {navItems.map((item) => {
                        return (
                            <div key={item.id}>
                                {!item.header ? (
                                    <Link to={`${item.link}`}>
                                        <li className={`${styles['side-nav-menu-item']} ${isRouteActive(item.link) ? styles.active : ''}`}>
                                            {!item.header && <img src={item.icon} alt={item.title} />}

                                            <span>{item.title}</span>
                                            {item.id === 1 && (
                                                <span>
                                        <img src="/images/icons/down-arrow.svg" alt="" />
                                     </span>
                                            )}
                                        </li>
                                    </Link>
                                ) : (
                                    <li className={styles['nav-item-header']}>
                                        <span>{item.title}</span>
                                    </li>
                                )}
                            </div>
                        );
                    })}
                </ul>

                <div className={styles.logout} onClick={() => navigate('/')}>
                    <div>
                        <img src="/images/icons/logout-icon.svg" alt="logout icon" />
                        <span>Logout</span>
                    </div>

                    <span className={styles.version}>v1.2.0</span>
                </div>
            </div>
        </div>
    );
};

export default SideBar;