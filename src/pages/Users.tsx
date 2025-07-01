import {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import UsersTable from "../components/dashboard/UsersTable.tsx";
import UserStatCard from "../components/dashboard/cards/UserStatCard.tsx";
import {usersStats} from "../constants/constants.ts";
import {useGetUsersQuery} from "../store/user/userApi.ts";
import styles from "../styles/pages/users/users-page.module.scss"
import Loader from "../components/global/Loader.tsx";


const Users = () => {
    const {data: users = [], isLoading: loading} = useGetUsersQuery();
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, users]);

    // When user clicks on pagination
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    return (
        <section className={styles["users"]}>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div data-testid="users-stats" className={styles["users-stats"]}>
                        {usersStats.map((item, index) => {
                            return (
                                <UserStatCard item={{...item, id: index.toString()}} key={index}/>
                            );
                        })}
                    </div>
                    <>
                        <UsersTable users={currentItems} loading={loading}/>
                        <div className={styles["users-paginate"]}>
                            <div className={styles["user-page-info"]}>
                                <p>
                                    Showing{' '}
                                    <span>
										{itemOffset + itemsPerPage} <img src="/images/icons/down-arrow.svg"
                                                                         alt="down arrow"/>
									</span>{' '}
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
                                // renderOnZeroPageCount={null}
                            />
                        </div>
                    </>
                </div>
            )}
        </section>
    );
};

export default Users;