import { useGetUsers } from "../../../api/hooks/useGetUsers";
import { MappedUserDataProps } from "../../../api/mappers/mapUserData";
import { useAppContext } from "../../../hooks/useAppContext";
import { Accordion } from "../../core/Accordion";
import { AccordionContent } from "../AccordionContent";

export const UsersList = () => {
  const { searchStr } = useAppContext();
  const { data, isLoading, error } = useGetUsers(searchStr);

  if (isLoading)
    return (
      <div className="w-full text-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="w-full text-center">
        <p>Error fetching the user data</p>
      </div>
    );

  if (data.totalCount === 0) {
    return (
      <div className="w-full text-left md:text-center">
        <p>{`No users available with username "${searchStr}"`}</p>
      </div>
    );
  }

  return (
    <>
      {data.totalCount && (
        <div className="w-full text-left md:text-center">
          <p>{`Showing users for "${searchStr}"`}</p>
        </div>
      )}
      <div className="flex flex-col gap-y-3">
        {data.items.map(({ userName, reposUrl }: MappedUserDataProps) => (
          <Accordion key={reposUrl} title={userName}>
            <AccordionContent reposUrl={reposUrl} title={userName} />
          </Accordion>
        ))}
      </div>
    </>
  );
};
