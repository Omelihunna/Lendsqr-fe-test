import { Link } from 'react-router-dom';
import React from "react";
import styles from "../../styles/components/dashboard/top-navigation.module.scss"

interface Props {
    setIsMenuOpen: (value: boolean) => void;
    isMenuOpen: boolean;
}

const TopNav: React.FC<Props> = ({ setIsMenuOpen, isMenuOpen }) => {
    return (
        <div className={styles['top-nav']}>
            <div>
                <div className={styles['top-nav-main']}>
                    <div className={styles["left"]}>
                    <img src="/images/logo.svg" alt="logo" className={styles.logo} />
                    <div className={styles['search-input']}>
                        <input type="search" placeholder="Search for anything" />
                        <button>
                            <img src="/images/icons/search-icon.svg" alt="search" />
                        </button>
                    </div>
                </div>
                    <div className={styles['top-nav-right']}>
                        <Link to="#">Docs</Link>
                        <img src="/images/icons/bell-icon.svg" alt="notify" />
                        <div className={styles['top-nav-profile']}>
                            <img src="/images/avatar.svg" alt="avatar" />
                            <p>Adedeji</p>
                            <img src="/images/icons/dropdown-icon.svg" alt="Avatar" />
                        </div>
                    </div>
                    <div onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles['menu-icon']}>
                        <img src={`/images/icons/${isMenuOpen ? "close-icon" : "menu"}.svg`} alt="menu icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNav;