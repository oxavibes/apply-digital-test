import { useState } from "react";

import NewsBox from "../components/news/NewsBox";
import NewsSelect from "../components/news/NewsSelect";

import "./NewsPage.css";

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container">
      <div className="tabs">
        <nav className="tabs__nav">
          <ul className="tabs__ul">
            <li className={activeTab === "all" ? "tabs__nav-active" : ""} onClick={() => setActiveTab("all")}>
              All
            </li>
            <li className={activeTab === "favs" ? "tabs__nav-active" : ""} onClick={() => setActiveTab("favs")}>
              My favs
            </li>
          </ul>
        </nav>
      </div>

      {activeTab === "all" && (
        <section className="news-selector">
          <NewsSelect></NewsSelect>
        </section>
      )}

      <section className="news-list">
        <div className="news-list__container">
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
        </div>
      </section>
    </div>
  );
}
