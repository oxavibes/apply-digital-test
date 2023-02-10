import "./NewsSelect.css";

export default function NewsSelector() {
  return (
    <select className="news-select">
      <option value="none" selected disabled hidden>
        Select your news
      </option>
      <option value="angular"> Angular</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </select>
  );
}
