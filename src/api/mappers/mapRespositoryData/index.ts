interface RepositoryDataProps {
  name: string;
  description: string | null;
  git_url: string;
  stargazers_count: number;
}

export interface MappedRepositoryDataProps {
  name: string;
  description: string | null;
  gitUrl: string;
  starCount: number;
}

export const mapRepositoryData = ({
  name,
  description,
  git_url,
  stargazers_count,
}: RepositoryDataProps): MappedRepositoryDataProps => {
  return {
    name,
    description,
    gitUrl: git_url,
    starCount: stargazers_count,
  };
};
