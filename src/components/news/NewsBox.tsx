import { MouseEvent } from "react";

import { Icon } from "@iconify/react";
import { formatTimeAgo } from "../utils";

import { INewsType } from "../../types/news";

import { useNewsStore } from "../../store";

import "./NewsBox.css";

export default function NewsBox({
  author,
  story_id,
  story_title,
  story_url,
  created_at,
  isFavourite,
  innerRef,
}: INewsType) {
  const allNews = useNewsStore((state) => state.allNews);
  const toggleFavourite = useNewsStore((state) => state.toggleFavourite);

  const formattedDate = formatTimeAgo(new Date(created_at));

  const handleClickLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const index = allNews.findIndex((news) => story_id === news.story_id);

    toggleFavourite(index);
  };

  return (
    <div className="news-box" ref={innerRef}>
      <div className="news-box__body">
        <a className="news-box__link" href={story_url} target="_blank">
          <p className="news-box__date">
            <Icon icon="ic:baseline-access-time" color="#606060" width="16" height="16" />
            <span className="news-box__time">
              {formattedDate} by {author}
            </span>
          </p>
          <p className="news-box__title">{story_title}</p>
        </a>
      </div>
      <div className="news-box__action">
        <button type="button" className="news-box__button" onClick={handleClickLike}>
          {isFavourite && <Icon icon="ion:heart" color="#dd0031" width="24" height="22" />}
          {!isFavourite && <Icon icon="mdi:cards-heart-outline" color="#dd0031" width="24" height="22" />}
        </button>
      </div>
    </div>
  );
}
