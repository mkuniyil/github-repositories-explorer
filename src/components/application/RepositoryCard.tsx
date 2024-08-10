import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { MappedRepositoryDataProps } from "../../api/mappers/mapRespositoryData";
import { TEST_IDS } from "../../constants";

type RepositoryCardProps = Omit<MappedRepositoryDataProps, "gitUrl">;

export const RepositoryCard: FC<RepositoryCardProps> = ({
  name,
  description,
  starCount = 0,
}) => {
  return (
    <div
      className="flex items-start min-h-24 bg-gray-300 p-3 rounded"
      data-testid={TEST_IDS.REPOSITORY_CARD}
    >
      <div className="flex-1 break-words overflow-hidden">
        <div className="font-semibold">{name}</div>
        <div className="text-sm">{description}</div>
      </div>
      <div className="w-10 flex gap-1 items-center">
        <div className="text-sm font-semibold">{starCount}</div>
        <FaStar />
      </div>
    </div>
  );
};
