import React, { ChangeEvent } from "react";
import clsx from "clsx";

import styles from "./SearchInput.module.scss";

import { SearchIcon } from "icons";

const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  value,
  id,
  name,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <div className={clsx(styles["search-box"], className)}>
      <input
        value={value}
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={styles["search"]}
      />
      <SearchIcon className={styles["search-icon"]} />
    </div>
  );
};

type SearchInputProps = {
  value: string;
  id?: string;
  name?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default SearchInput;
