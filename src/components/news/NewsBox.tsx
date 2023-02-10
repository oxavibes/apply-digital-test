import { Icon } from "@iconify/react";

import "./NewsBox.css";

export default function NewsBox() {
  return (
    <div className="news-box">
      <div className="news-box__body">
        <p className="news-box__date">
          <Icon icon="ic:baseline-access-time" color="#606060" width="16" height="16" />
          <span className="news-box__time">3 hours ago by author</span>
        </p>
        <p className="news-box__title">Yes, React is taking over front-end development. The question is why.</p>
      </div>
      <div className="news-box__action">
        <button type="button" className="news-box__button">
          {/* <Icon icon="ion:heart" color="#dd0031" width="24" height="22" /> */}
          <Icon icon="mdi:cards-heart-outline" color="#dd0031" width="24" height="22" />
        </button>
      </div>
    </div>
  );
}
