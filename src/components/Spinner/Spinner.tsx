import React from "react";
import ReactLoading from "react-loading";
import clsx from "clsx";

import styles from "./Spinner.module.scss";

const Spinner: React.FunctionComponent<SpinnerProps> = ({ className }) => (
  <ReactLoading
    className={clsx(styles["spinner"], className)}
    type="spin"
    color="black"
  />
);

type SpinnerProps = {
  className?: string;
};

export default Spinner;
