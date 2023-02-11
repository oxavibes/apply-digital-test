import "./NewsSelect.css";

export default function NewsSelector() {
  return (
    <select className="news-select" defaultValue="none">
      <option value="none" disabled hidden>
        Select your news
      </option>
      <option value="angular"> Angular</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </select>
  );
}
