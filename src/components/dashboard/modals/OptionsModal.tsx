import React from 'react';
import styles from "../../../styles/components/dashboard/options-modal.module.scss"
import { Link } from 'react-router-dom';

interface OptionsModalProps {
    id: string;
}

const OptionsModal: React.FC<OptionsModalProps> = ({id}) => {
    return (
        <div className={styles["options-dropdown"]}>
            <ul>
                <li>
                    <Link to={`/dashboard/users/${id}`}>
                        <img src="/images/icons/eye-icon.svg" alt="eye icon" /> <span>View Details</span>
                    </Link>
                </li>
                <li>
                    <img src="/images/icons/user-x-icon.svg" alt="eye icon" /> <span>Blacklist User</span>
                </li>
                <li>
                    <img src="/images/icons/user-check-icon.svg" alt="eye icon" /> <span>Activate User</span>
                </li>
            </ul>
        </div>
    );
};

export default OptionsModal;