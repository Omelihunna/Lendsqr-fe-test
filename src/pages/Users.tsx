import { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import UsersTable from "../components/dashboard/UsersTable.tsx";
import UserStatCard from "../components/dashboard/cards/UserStatCard.tsx";
import { usersStats } from "../constants/constants.ts";
import { useGetUsersQuery } from "../store/user/userApi.ts";
import styles from "../styles/pages/users/users-page.module.scss";
import Loader from "../components/global/Loader.tsx";

const Users = () => {
    const { data: users = [], isLoading: loading } = useGetUsersQuery();

    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const options = useMemo(() => [10, 20, 30, 50], []);

    const pageCount = useMemo(() => Math.ceil(users.length / itemsPerPage), [users.length, itemsPerPage]);

    const currentItems = useMemo(() => {
        const endOffset = itemOffset + itemsPerPage;
        return users.slice(itemOffset, endOffset);
    }, [users, itemOffset, itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10);
        setItemsPerPage(value);
        setItemOffset(0);
    };

    return (
        <section className={styles["users"]}>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div data-testid="users-stats" className={styles["users-stats"]}>
                        {usersStats.map((item, index) => (
                            <UserStatCard item={{ ...item, id: index.toString() }} key={index} />
                        ))}
                    </div>

                    <UsersTable users={currentItems} loading={loading} />

                    <div className={styles["users-paginate"]}>
                        <div className={styles["user-page-info"]}>
                            <p>
                                Showing{' '}
                                <span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                        className={styles["items-per-page-select"]}
                                    >
                                        {options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>{' '}
                                </span>
                                out of {users.length}
                            </p>
                        </div>

                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="<"
                            pageClassName={styles["page-item"]}
                            pageLinkClassName={styles["page-link"]}
                            previousClassName={styles["arrow"]}
                            nextClassName={styles["arrow"]}
                            breakLabel="..."
                            containerClassName={styles["pagination"]}
                            activeClassName={styles["active"]}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Users;
