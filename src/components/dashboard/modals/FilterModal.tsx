import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { closeFilterModal, updateFilterValues, resetFilters, type FilterValues } from '../../../store/user/userSlice';
import styles from "../../../styles/components/dashboard/filter-modal.module.scss"

interface FilterModalProps {
    index?: number;
}

const FilterModal: React.FC<FilterModalProps> = ({ index = 0 }) => {
    const dispatch = useDispatch();
    const { isFilterOpen, filterValues } = useSelector((state: RootState) => state.users);
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFilterOpen && firstInputRef.current) {
            firstInputRef.current.focus();
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') dispatch(closeFilterModal());
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFilterOpen, dispatch]);

    if (!isFilterOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && e.target === modalRef.current) {
            dispatch(closeFilterModal());
        }
    };

    const handleSubmit = (values: FilterValues) => {
        dispatch(updateFilterValues(values));
        dispatch(closeFilterModal());
    };

    const formClassName = index === 0
        ? `${styles["filter-form"]} ${styles["left-align"]}`
        : styles["filter-form"];

    return (
        <Formik
            initialValues={filterValues}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleSubmit, handleReset, values }) => (
                <Form className={formClassName} data-testid="filter-form">
                    <div className={styles["form-group"]}>
                        <label htmlFor="organization">Organization</label>
                        <Field
                            as="select"
                            name="organization"
                            id="organization"
                            onChange={handleChange}
                            value={values.organization}
                            innerRef={firstInputRef}
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
                            onChange={handleChange}
                            value={values.username}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={values.email}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="date">Date</label>
                        <Field
                            type="date"
                            name="date"
                            id="date"
                            placeholder="Date"
                            onChange={handleChange}
                            value={values.date}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="phone">Phone Number</label>
                        <Field
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            value={values.phone}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="status">Status</label>
                        <Field
                            as="select"
                            name="status"
                            id="status"
                            onChange={handleChange}
                            value={values.status}
                        >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                            <option value="Inactive">Inactive</option>
                        </Field>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <button type="button" onClick={() => { handleReset(); handleReset(); }}>Reset</button>
                        <button type="submit">Filter</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FilterModal;