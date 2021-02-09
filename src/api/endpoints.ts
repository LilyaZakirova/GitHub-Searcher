const BASE_URL = "https://api.github.com/search";

export const getEndpoint = (searchValue: string, dropdownValue: string) => {
  const dropdownValueToEndpointMapper: any = {
    user: `${BASE_URL}/users?q=${searchValue}+in:login`,
    repository: `${BASE_URL}/repositories?q=${searchValue}+in:name`,
  };
  return dropdownValueToEndpointMapper[dropdownValue];
};
