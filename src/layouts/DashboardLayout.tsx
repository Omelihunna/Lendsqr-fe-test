import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import SideBar from '../components/dashboard/SideBar';
import TopNav from '../components/dashboard/TopNav';
import styles from "../styles/layouts/dashboard-layout.module.scss"

const DashboardLayout: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className={styles["dashboard-layout"]}>
            <TopNav setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>
            <div className={styles['dashboard-container']}>
                <SideBar isMenuOpen={isMenuOpen}/>

                <div className={styles["dashboard"]}>
                    <div className={styles['dashboard-main']}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;