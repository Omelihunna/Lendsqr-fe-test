import React from 'react';
import { Formik, Form, Field } from 'formik';
import styles from "../../../styles/components/dashboard/filter-modal.module.scss"

interface FilterModalValues {
    organization: string;
    username: string;
    email: string;
    date: string;
    phone: string;
    status: string;
}

const FilterModal: React.FC = () => {
    const initialValues: FilterModalValues = {
        organization: '',
        username: '',
        email: '',
        date: '',
        phone: '',
        status: '',
    };

    const onSubmit = (values: FilterModalValues) => {
        if (values) {
            // console.log(values);
        }
    };

    const handleReset = (resetForm: () => void) => {
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ resetForm }) => (
                <Form className={styles["filter-form"]}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="organization">Organization</label>
                        <Field
                            as="select"
                            name="organization"
                            id="organization"
                        >
                            <option value="">Select</option>
                        </Field>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="username">Username</label>
                        <Field
                            type="text"
                            name="username"
                            id="username"
                            placeholder="User"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="date">Date</label>
                        <Field
                            type="date"
                            name="date"
                            id="date"
                            placeholder="Date"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="phone">Phone Number</label>
                        <Field
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="status">Status</label>
                        <Field
                            as="select"
                            name="status"
                            id="status"
                        >
                            <option value="">Select</option>
                        </Field>
                    </div>
                    <div>
                        <button type="button" onClick={() => handleReset(resetForm)}>Reset</button>
                        <button type="submit">Filter</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FilterModal;