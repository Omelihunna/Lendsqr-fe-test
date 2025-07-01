import React from 'react';
import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {getRandomStatus, type User, type UserModel} from "../../constants/constants"
import FilterModal from "./modals/FilterModal.tsx";
import OptionsModal from "./modals/OptionsModal.tsx";
import styles from "../../styles/components/dashboard/users-table.module.scss"

interface Props {
    users: User[];
    loading: boolean;
}

const tableHeaders = ['Organization', 'Username', 'Email', 'Phone number', 'Date joined', 'Status', ''];

const UsersTable: React.FC<Props> = ({ users }) => {
    const [isFilterOpen, setIsFilterOpen] = useState<null | number>(null);
    const [isOptionsOpen, setIsOptionsOpen] = useState<null | number>(null);

    return (
        <div data-testid="user-table" className={styles["users-table"]}>
            <table>
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => {
                        return (
                            <th key={index}>
                                <div>
                                    <span>{header}</span>
                                    {header && (
                                        <img
                                            src="/images/icons/filter-icon.svg"
                                            alt="filter-icon"
                                            onClick={() => (isFilterOpen === index ? setIsFilterOpen(null) : setIsFilterOpen(index))}
                                        />
                                    )}
                                </div>
                                {isFilterOpen === index ? <FilterModal /> : ''}
                            </th>
                        );
                    })}
                </tr>
                </thead>

                <tbody>
                {users.map((user: any, index: number) => {
                    const status = getRandomStatus();
                    return (
                        <tr key={index}>
                            <td>
                                <Link to={`/dashboard/users/${user?.id}`}>{user?.organization}</Link>
                            </td>
                            <td>{user?.username}</td>
                            <td>{user?.email}</td>
                            <td>{user?.phoneNumber}</td>
                            <td>{moment(user?.createdAt).format('MMM D, YYYY h:mm a')}</td>
                            <td>
                                <span className={styles[`status-${status.toLowerCase()}`]}>{status}</span>
                            </td>
                            <td>
                                <img
                                    src="/images/icons/more-icon.svg"
                                    alt="more"
                                    onClick={() => (isOptionsOpen === index ? setIsOptionsOpen(null) : setIsOptionsOpen(index))}
                                />

                                {isOptionsOpen === index ? <OptionsModal /> : ''}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable