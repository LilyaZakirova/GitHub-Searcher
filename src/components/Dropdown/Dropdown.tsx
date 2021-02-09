import React from "react";
import clsx from "clsx";
import ReactDropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";

import styles from "./Dropdown.module.scss";

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  options,
  className,
  onChange,
  value,
}) => {
  return (
    <ReactDropdown
      options={options}
      placeholder="Select an option"
      className={clsx(styles["wrapper"], className)}
      controlClassName={styles["control"]}
      arrowClassName={styles["arrow"]}
      placeholderClassName={styles["placeholder"]}
      menuClassName={styles["menu"]}
      onChange={onChange}
      value={value}
    />
  );
};

type DropdownProps = {
  options: any;
  className?: string;
  onChange: (value: Option) => void;
  value?: string;
};

export default Dropdown;
