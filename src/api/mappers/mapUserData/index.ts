interface UserDataProps {
  login: string;
  repos_url: string;
}

export interface MappedUserDataProps {
  userName: string;
  reposUrl: string;
}

export const mapUsersData = ({
  login,
  repos_url,
}: UserDataProps): MappedUserDataProps => {
  return {
    userName: login,
    reposUrl: repos_url,
  };
};
