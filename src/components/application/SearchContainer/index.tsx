import { ChangeEvent, FormEvent, useState } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { Button } from "../../core/Button";
import { Input } from "../../core/Input";

export const SearchContainer = () => {
  const { onSearch } = useAppContext();
  const [value, setValue] = useState<string>("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4"
    >
      <Input
        value={value}
        required={true}
        placeholder="Enter username"
        onChange={onInputChange}
      />
      <div className="md:w-40">
        <Button text="Search" type="submit" />
      </div>
    </form>
  );
};
