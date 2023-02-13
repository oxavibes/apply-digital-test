import { DateTime } from "luxon";
import { shallow } from "zustand/shallow";

import { MouseEvent } from "react";

import { Icon } from "@iconify/react";

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
  const { allNews, favNews, activeTab, addFavourite, toggleFavourite, removeFavourite } = useNewsStore(
    (state) => ({
      allNews: state.allNews,
      favNews: state.favNews,

      activeTab: state.activeTab,

      addFavourite: state.addFavourite,
      toggleFavourite: state.toggleFavourite,
      removeFavourite: state.removeFavourite,
    }),
    shallow
  );

  const formattedDate = DateTime.fromISO(created_at).toRelative();

  const handleClickLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const favExists = favNews.find((news) => story_id === news.story_id);

    if (!favExists) {
      const index = allNews.findIndex((news) => story_id === news.story_id);

      const favourite = { ...allNews[index], isFavourite: true };

      addFavourite(favourite);

      toggleFavourite(index, true);
    } else {
      const index = allNews.findIndex((news) => story_id === news.story_id);

      removeFavourite(favExists);

      //findIndex returns -1 if the items doesn't exists
      if (index !== -1) toggleFavourite(index, false);
    }
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
