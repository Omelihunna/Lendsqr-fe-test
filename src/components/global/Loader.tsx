import {ClipLoader} from "react-spinners";
import React from "react";
import styles from "../../styles/base/loader.module.scss"

const Loader: React.FC = () => {
    return (
        <div data-testid="loader" className={styles["loader"]}>
            <ClipLoader/>
        </div>
    )
}

export default Loader;