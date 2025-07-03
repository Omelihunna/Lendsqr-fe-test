import React from 'react';
import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {getRandomStatus, type UserModel} from "../../constants/constants"
import FilterModal from "./modals/FilterModal.tsx";
import OptionsModal from "./modals/OptionsModal.tsx";
import styles from "../../styles/components/dashboard/users-table.module.scss"

interface Props {
    users: UserModel[];
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
                                {isFilterOpen === index ? <FilterModal index={index} /> : ''}
                            </th>
                        );
                    })}
                </tr>
                </thead>

                <tbody>
                {validUsers.map((user: User) => {
                    return (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/dashboard/users/${user?.id}`}>{user?.organization}</Link>
                            </td>
                            <td>{user?.username}</td>
                            <td>{user?.email}</td>
                            <td>{user?.phoneNumber}</td>
                            <td>{user?.createdAt}</td>
                            <td>
                                <span className={styles[`status-${user.status.toLowerCase()}`]}>{user.status}</span>
                            </td>
                            <td>
                                <img
                                    src="/images/icons/more-icon.svg"
                                    alt="more"
                                    onClick={() => (isOptionsOpen === user?.id ? setIsOptionsOpen(null) : setIsOptionsOpen(user.id))}
                                />

                                {isOptionsOpen === user?.id ? <OptionsModal id={user?.id} /> : ''}
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