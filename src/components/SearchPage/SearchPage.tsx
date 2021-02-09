import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";

import {
  updateInputValue,
  updateDropdownValue,
  fetchData,
  clearData,
} from "actions/searchActions";
import { getEndpoint } from "api/endpoints";
import {
  FETCH_USERS,
  FETCH_REPOS,
  CLEAR_USERS,
  CLEAR_REPOS,
} from "actions/actionTypes";

import { FetchActionType } from "actions/types";
import { SearchStateType } from "reducers/searchReducer";

import SearchInput from "components/SearchInput";
import Dropdown from "components/Dropdown";
import Header from "./components/Header";
import Spinner from "components/Spinner";
import Card from "components/Card";

import styles from "./SearchPage.module.scss";
import "react-toastify/dist/ReactToastify.css";

const searchDropdownOptions = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "repository",
    label: "Repository",
  },
];

const dropdownValueToActionTypeMapper: {
  [key: string]: any;
} = {
  user: FETCH_USERS,
  repository: FETCH_REPOS,
};

type SearchPageProps = {
  inputValue: string;
  dropdownValue: string;
  users: any[];
  repositories: any[];
  error: any;
  updateInputValue: any;
  updateDropdownValue: any;
  fetchData: (
    endpoint: string,
    fetchActionType: FetchActionType
  ) => Promise<any>;
  clearData: (clearActionType: any) => any;
  isLoading: boolean;
};

const SearchPage: React.FunctionComponent<SearchPageProps> = ({
  inputValue,
  dropdownValue,
  users,
  repositories,
  updateInputValue,
  updateDropdownValue,
  fetchData,
  clearData,
  isLoading,
  error,
}) => {
  const showCards = repositories.length !== 0 || users.length !== 0;
  const minNumberOfCharactersToSearch = 3;

  const onSearchInputChange = (e: any) => {
    const targetValue = e.target.value;
    updateInputValue(targetValue);

    (!targetValue || targetValue.length < minNumberOfCharactersToSearch) &&
      users.length !== 0 &&
      clearData(CLEAR_USERS);
    (!targetValue || targetValue.length < minNumberOfCharactersToSearch) &&
      repositories.length !== 0 &&
      clearData(CLEAR_REPOS);

    e.persist();
    targetValue.length >= minNumberOfCharactersToSearch &&
      dropdownValue &&
      fetchData(
        getEndpoint(e.target.value, dropdownValue),
        dropdownValueToActionTypeMapper[dropdownValue]
      );
  };

  const onDropdownValueChange = (option: any) => {
    const optionValue = option.value;
    optionValue === "user" &&
      clearData(CLEAR_REPOS);
    optionValue === "repository" &&
      clearData(CLEAR_USERS);

    updateDropdownValue(optionValue);
    inputValue.length >= minNumberOfCharactersToSearch &&
      fetchData(
        getEndpoint(inputValue, optionValue),
        dropdownValueToActionTypeMapper[optionValue]
      );
  };

  return (
    <>
      <div
        className={clsx(styles["page-container"], {
          [styles["page-container-with-cards"]]: showCards,
        })}
      >
        <ToastContainer />
        <div
          className={clsx(styles["searcher-container"], {
            [styles["searcher-container-with-cards-on-page"]]: showCards,
          })}
        >
          <Header className={styles["header-block"]} />
          <div className={styles["controls-container"]}>
            <SearchInput
              className={styles["search-input"]}
              value={inputValue}
              onChange={onSearchInputChange}
              placeholder={"Start typing to search..."}
            />
            <Dropdown
              options={searchDropdownOptions}
              onChange={onDropdownValueChange}
              value={dropdownValue}
            />
          </div>
          <div className={styles["notification"]}>
            Please, be informed, that search will run only if more than three
            symbols were entered.
          </div>
        </div>
        {isLoading && <Spinner />}

        {users.length !== 0 && (
          <div className={styles["cards-block"]}>
            {users.map((user) => {
              const {
                avatar_url: avatarUrl,
                login,
                type,
                html_url: htmlUrl,
                id,
              } = user;

              return (
                <Card
                  avatarUrl={avatarUrl}
                  key={id}
                  className={clsx(
                    styles["card"],
                    styles["user-card"],
                    {
                      [styles["card-each-third"]]:
                        users.indexOf(user) % 3 === 2 ||
                        users.indexOf(user) === 2,
                    },
                    {
                      [styles["card-each-second"]]:
                        users.indexOf(user) % 2 === 1 ||
                        users.indexOf(user) === 1,
                    }
                  )}
                  infoToShow={[
                    {
                      label: "Login",
                      value: login,
                    },
                    {
                      label: "Type",
                      value: type,
                    },
                    {
                      label: "Link",
                      value: htmlUrl,
                    },
                  ]}
                />
              );
            })}
          </div>
        )}

        {repositories.length !== 0 && (
          <div className={styles["cards-block"]}>
            {repositories.map((repository) => {
              const {
                name: repositoryName,
                id: repositoryId,
                owner,
                created_at: createdAt,
                updated_at: updatedAt,
                stargazers_count: starsNumber,
              } = repository;

              const { login, avatar_url: avatarUrl } = owner;
              return (
                <Card
                  avatarUrl={avatarUrl}
                  key={repositoryId}
                  className={clsx(styles["card"], styles["repository-card"], {
                    [styles["card-each-third"]]:
                      repositories.indexOf(repository) % 3 === 2 ||
                      repositories.indexOf(repository) === 2,
                  })}
                  infoToShow={[
                    {
                      label: "Repository Name",
                      value: repositoryName,
                    },
                    {
                      label: "Author",
                      value: login,
                    },
                    {
                      label: "Stars",
                      value: starsNumber,
                    },
                    {
                      label: "Created At",
                      value: new Date(createdAt).toLocaleDateString(),
                    },
                    {
                      label: "Updated At",
                      value: new Date(updatedAt).toLocaleDateString(),
                    },
                  ]}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: SearchStateType) => ({
  inputValue: state.search.inputValue,
  dropdownValue: state.search.dropdownValue,
  isLoading: state.search.isLoading,
  users: state.search.users,
  repositories: state.search.repositories,
  error: state.search.error,
});

export default connect(mapStateToProps, {
  updateInputValue,
  updateDropdownValue,
  fetchData,
  clearData,
})(SearchPage);
