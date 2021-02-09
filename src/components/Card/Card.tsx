import React from "react";
import clsx from "clsx";

import styles from "./Card.module.scss";

import { GitHubLogo } from "icons/index";

type Props = {
  className?: string;
  avatarUrl?: string;
  infoToShow: { label: string; value: string }[];
};

const Card: React.FunctionComponent<Props> = ({
  className,
  children,
  avatarUrl,
  infoToShow,
}) => (
  <div className={clsx(styles["container"], className)}>
    {avatarUrl ? (
      <img src={avatarUrl} alt="Avatar" className={styles["avatar"]} />
    ) : (
      <GitHubLogo className={styles["avatar"]} />
    )}
    <div className={styles["info-blocks-wrapper"]}>
      {infoToShow.map((infoBlock) => (
        <div
          className={clsx(styles["info-block"], {
            [styles["info-block-last-child"]]:
              infoToShow.indexOf(infoBlock) === infoToShow.length - 1,
          })}
          key={`${infoBlock.value}-${infoToShow.indexOf(infoBlock)}`}
        >
          <span className={styles["info-label"]}>{`${infoBlock.label}: `}</span>
          <span>{`${infoBlock.value}`}</span>
        </div>
      ))}
    </div>
    {children}
  </div>
);

export default Card;
