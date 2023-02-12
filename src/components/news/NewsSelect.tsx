import { ChangeEvent } from "react";

import { useNewsStore } from "../../store";

import "./NewsSelect.css";

export default function NewsSelector() {
  const activeQuery = useNewsStore((state) => state.activeQuery);
  const setProp = useNewsStore((state) => state.setProp);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setProp("allNews", []);
    setProp("activeQuery", e.target.value);
  };

  return (
    <select className="news-select" defaultValue={activeQuery} onChange={handleOnChange}>
      <option value="none" disabled hidden>
        Select your news
      </option>
      <option value="angular"> Angular</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </select>
  );
}
