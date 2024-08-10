import { FC } from "react";
import { useGetUserRepositories } from "../../../api/hooks/useGetUserRepositories";
import { MappedRepositoryDataProps } from "../../../api/mappers/mapRespositoryData";
import { RepositoryCard } from "../RepositoryCard";

interface AccordionContentProps {
  title: string;
  reposUrl: string;
}

export const AccordionContent: FC<AccordionContentProps> = ({
  title,
  reposUrl,
}) => {
  const { data, isLoading, error } = useGetUserRepositories(reposUrl);

  if (isLoading)
    return (
      <div className="w-full text-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="w-full text-center">
        <p>Error fetching the user repositories</p>
      </div>
    );

  if (data.length === 0)
    return (
      <div className="w-full text-center">
        <p>{`No repositories available for "${title}"`}</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 ml-3 md:mr-3">
      {data.map(
        ({
          name,
          description,
          gitUrl,
          starCount,
        }: MappedRepositoryDataProps) => (
          <RepositoryCard
            key={gitUrl}
            name={name}
            description={description}
            starCount={starCount}
          />
        ),
      )}
    </div>
  );
};
