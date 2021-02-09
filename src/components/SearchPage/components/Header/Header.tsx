import React from "react";
import clsx from "clsx";

import styles from "./Header.module.scss";

import { GitHubLogo } from "icons";

const infoContainerItems = {
  heading: "GitHub Searcher",
  subHeading: "Search users or repositories below",
};

const { heading, subHeading } = infoContainerItems;

const Header: React.FunctionComponent<HeaderProps> = ({ className }) => {
  return (
    <div className={clsx(styles["container"], className)}>
      <div className={styles["logo-container"]}>
        <GitHubLogo className={styles["logo"]} />
      </div>
      <div className={styles["info-container"]}>
        <div className={styles["heading"]}>{heading}</div>
        <div className={styles["sub-heading"]}>{subHeading}</div>
      </div>
    </div>
  );
};

type HeaderProps = {
  className?: string;
};

export default Header;
