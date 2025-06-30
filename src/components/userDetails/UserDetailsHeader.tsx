import React from 'react';
import { Link } from 'react-router-dom';
import {type User, userNavItems} from "../../constants/constants.ts";
import styles from "../../styles/components/userDetails/user-details-header.module.scss"

interface Props {
    user: User;
}

const UserDetailsHeader: React.FC<Props> = ({user}) => {
    return (
        <div className={styles["user-header"]}>
            <div className={styles["user-header-info"]}>
                <div>
                    <div className={styles["user-avatar"]}>
                        <img src={user?.avatar || '/images/user-avatar.svg'} alt="avatar" />
                    </div>
                    <div>
                        <p>{`${user?.fullName}`}</p>
                        <p>{user?.bvn}</p>
                    </div>
                </div>

                <div className={styles["user-tier"]}>
                    <p>User’s Tier</p>
                    <div className="star-rating">
                        <img src="/images/icons/star-filled.svg" alt="star" />
                        <img src="/images/icons/star-outline.svg" alt="star" />
                        <img src="/images/icons/star-outline.svg" alt="star" />
                    </div>
                </div>

                <div>
                    <p>₦{user?.accountBalance ?? "0.00"}</p>
                    <p>{user?.accountNumber ?? "1234567890"}/Providus Bank</p>
                </div>
            </div>
            <div className={styles["user-header-nav"]}>
                {userNavItems.map((item, index) => {
                    return (
                        <Link key={index} to="#">
                            <div>{item}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default UserDetailsHeader;