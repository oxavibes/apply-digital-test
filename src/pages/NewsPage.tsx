import AppNewsBox from "../components/common/AppNewsBox";

import "./NewsPage.css";

export default function NewsPage() {
  return (
    <div className="container">
      <main>
        <section className="news-selector">
          <select className="news-select">
            <option value="">Select your news</option>
            <option value="angular"> Angular</option>
            <option value="react">React</option>
            <option value="vue">Vue</option>
          </select>
        </section>

        <section className="news-list">
          <div className="news-list-container">
            <AppNewsBox />
            <AppNewsBox />
            <AppNewsBox />
            <AppNewsBox />
            <AppNewsBox />
            <AppNewsBox />
            <AppNewsBox />
            <AppNewsBox />
          </div>
        </section>
      </main>
    </div>
  );
}
