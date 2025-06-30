import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { useGetUserByIdQuery } from "../store/user/userApi";
import { selectUser, clearSelectedUser } from "../store/user/userSlice";
import UserDetailsHeader from "../components/userDetails/UserDetailsHeader.tsx";
import UserDetailsBody from "../components/userDetails/UserDetailsBody.tsx";
import styles from "../styles/pages/userDetails/user-details-page.module.scss";
// import type {RootState} from "../store";

const UserDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    // const { selectedUserId } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (id) {
            dispatch(selectUser(id));
        }

        // Clean up selected user when component unmounts
        return () => {
            dispatch(clearSelectedUser());
        };
    }, [id, dispatch]);

    const {
        data: user,
        isLoading: loading,
        error,
        isError
    } = useGetUserByIdQuery(id!, {
        skip: !id, // Skip query if no ID is provided
    });

    // Handle error state
    if (isError) {
        return (
            <section className={styles["user-details"]}>
                <Link to="/dashboard/users" className="back">
                    <img src="/images/icons/back-icon.svg" alt="back" />
                    <span>Back to Users</span>
                </Link>
                <div className="error-container">
                    <h2>Error Loading User</h2>
                    <p>
                        {error && 'data' in error
                            ? (error.data as any)?.message || 'Failed to load user details'
                            : 'Failed to load user details'
                        }
                    </p>
                    <button onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    // Handle case where no ID is provided
    if (!id) {
        return (
            <section className={styles["user-details"]}>
                <Link to="/dashboard/users" className="back">
                    <img src="/images/icons/back-icon.svg" alt="back" />
                    <span>Back to Users</span>
                </Link>
                <div className="error-container">
                    <h2>No User ID Provided</h2>
                    <p>Please select a user from the users list.</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles["user-details"]}>
            <Link to="/dashboard/users" className="back">
                <img src="/images/icons/back-icon.svg" alt="back" />
                <span>Back to Users</span>
            </Link>

            <div className={styles["header-btns"]}>
                <h1>User Details</h1>
                <div className="">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            // Handle blacklist user action
                            console.log('Blacklist user:', id);
                        }}
                    >
                        BLACKLIST USER
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            // Handle activate user action
                            console.log('Activate user:', id);
                        }}
                    >
                        ACTIVATE USER
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <ClipLoader
                        color="#3B82F6"
                        loading={loading}
                        size={50}
                        aria-label="Loading User Details"
                    />
                    <p>Loading user details...</p>
                </div>
            ) : user ? (
                <div>
                    <UserDetailsHeader user={user} />
                    <UserDetailsBody user={user} />
                </div>
            ) : (
                <div className="no-data-container">
                    <h2>User Not Found</h2>
                    <p>The requested user could not be found.</p>
                </div>
            )}
        </section>
    );
};

export default UserDetailsPage;