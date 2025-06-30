import React from 'react';
import styles from "../../styles/components/userDetails/user-details-body.module.scss"
import type {User} from "../../constants/constants.ts";

interface Props {
    user: User;
}

const UserDetailsBody: React.FC<Props> = ({ user }) => {
    return (
        <div className={styles["user-details-main"]}>
            <div className={styles["user-info-card"]}>
                <h2>Personal Information</h2>
                <div className={styles["user-info-main"]}>
                    <div>
                        <p>FULL NAME</p>
                        <p>{`${user?.fullName}`}</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <p>{user?.phoneNumber}</p>
                    </div>
                    <div>
                        <p>Email Address</p>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <p>Bvn</p>
                        <p>{user?.bvn}</p>
                    </div>
                    <div>
                        <p>Gender</p>
                        <p>{user?.gender}</p>
                    </div>
                    <div>
                        <p>Marital status</p>
                        <p>Single</p>
                    </div>
                    <div>
                        <p>Children</p>
                        <p>None</p>
                    </div>
                    <div>
                        <p>Type of residence</p>
                        <p>Parent’s Apartment</p>
                    </div>
                </div>
            </div>

            <div className={styles["user-info-card"]}>
                <h2>Education and Employment</h2>
                <div className={styles["user-info-main"]}>
                    <div>
                        <p>level of education</p>
                        <p>{user?.educationAndEmployment?.levelOfEducation}</p>
                    </div>
                    <div>
                        <p>employment status</p>
                        <p>{user?.educationAndEmployment?.employmentStatus}</p>
                    </div>
                    <div>
                        <p>sector of employment</p>
                        <p>{user?.educationAndEmployment?.sectorOfEmployment}</p>
                    </div>
                    <div>
                        <p>Duration of employment</p>
                        <p>{user?.educationAndEmployment?.durationOfEmployment}</p>
                    </div>
                    <div>
                        <p>office email</p>
                        <p>{user?.educationAndEmployment?.officeEmail}</p>
                    </div>
                    <div>
                        <p>Monthly income</p>
                        <p>{`${user?.educationAndEmployment?.monthlyIncome} to ${user?.educationAndEmployment?.monthlyIncome}`}</p>
                    </div>
                    <div>
                        <p>loan repayment</p>
                        <p>{user?.educationAndEmployment?.loanRepayment}</p>
                    </div>
                </div>
            </div>

            <div className={styles["user-info-card"]}>
                <h2>Socials</h2>
                <div className={styles["user-info-main"]}>
                    <div>
                        <p>Twitter</p>
                        <p>{user?.socials?.twitter}</p>
                    </div>
                    <div>
                        <p>Facebook</p>
                        <p>{user?.socials?.facebook}</p>
                    </div>
                    <div>
                        <p>Instagram</p>
                        <p>{user?.socials?.instagram}</p>
                    </div>
                </div>
            </div>

            <div className={styles["user-info-card"]}>
                <h2>Guarantor</h2>
                <div className={styles["user-info-main"]}>
                    <div>
                        <p>full Name</p>
                        <p>{`${user?.guarantor?.fullName}`}</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <p>{user?.guarantor?.phoneNumber}</p>
                    </div>
                    <div>
                        <p>Address</p>
                        <p>{user?.guarantor?.address}</p>
                    </div>
                    <div>
                        <p>Relationship</p>
                        <p>Sister</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsBody;