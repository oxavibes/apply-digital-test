import { useState } from "react";

import AppNewsBox from "../components/common/AppNewsBox";

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
        <>
          <section className="news-selector">
            <select className="news-select">
              <option value="angular"> Angular</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
            </select>
          </section>

          <section className="news-list">
            <div className="news-list__container"></div>
            <p className="news-list__no-data">There is no data to show</p>
          </section>
        </>
      )}

      {activeTab === "favs" && (
        <section className="news-list">
          <div className="news-list__container">
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
      )}
    </div>
  );
}
