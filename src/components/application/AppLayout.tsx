import { SearchContainer } from "./SearchContainer";
import { UsersList } from "./UsersList";

export const AppLayout = () => {
  return (
    <>
      <div className="flex flex-col gap-8 m-8 max-w-[1024px] lg:mx-auto">
        <SearchContainer />
        <UsersList />
      </div>
    </>
  );
};
