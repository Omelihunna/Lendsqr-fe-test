import React from "react";
import styles from "../../../styles/components/dashboard/user-stats-card.module.scss"

interface IItem {
    id: string;
    icon: string;
    title: string;
    count: string;
}

interface  UserStatCardProps {
    item: IItem
}

const UserStatCard: React.FC<UserStatCardProps> = ({ item }) => {
    return (
        <div key={item.id} className={styles["users-stats-box"]}>
            <img src={item.icon} alt="stat" />
            <p>{item.title}</p>
            <p>{item.count}</p>
        </div>
    )
}

export default UserStatCard;