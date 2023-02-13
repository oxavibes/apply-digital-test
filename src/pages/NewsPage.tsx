import { useEffect, useCallback, useRef } from "react";

import { useNewsStore } from "../store/";
import { shallow } from "zustand/shallow";

import { INewsType } from "../types/news";

import NewsBox from "../components/news/NewsBox";
import NewsSelect from "../components/news/NewsSelect";

import "./NewsPage.css";

export default function NewsPage() {
  const { allNews, favNews, activeQuery, activeTab, page, hitsPerPage, isLoading, checkFavouriteNews, setProp } =
    useNewsStore(
      (state) => ({
        allNews: state.allNews,
        favNews: state.favNews,

        activeTab: state.activeTab,
        activeQuery: state.activeQuery,

        page: state.page,
        hitsPerPage: state.hitsPerPage,

        loadedNews: state.loadedNews,
        isLoading: state.isLoading,

        setProp: state.setProp,
        checkFavouriteNews: state.checkFavouriteNews,
      }),
      shallow
    );

  let lastItemRef = useRef(null);

  const fetchNews = useCallback(() => {
    const url = new URL("https://hn.algolia.com/api/v1/search_by_date");

    url.searchParams.set("query", activeQuery);
    url.searchParams.set("page", String(page));
    url.searchParams.set("hitsPerPage", String(hitsPerPage));

    setProp("isLoading", true);

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => {
        let hits: Array<INewsType> = data.hits
          .filter(
            ({ author, story_id, story_title, story_url, created_at }: INewsType) =>
              !!author && !!story_title && !!story_url && !!created_at
          )
          .map(({ author, story_id, story_title, story_url, created_at, objectID }: INewsType) => ({
            author,
            story_id,
            story_url,
            story_title,
            created_at,
            objectID,
          }));

        //The API is returning duplicated posts
        const uniqueHits = hits.reduce(
          (accumulator: INewsType[], current: INewsType) => {
            if (accumulator.find((item: INewsType) => item.story_id === current.story_id)) return accumulator;
            return [...accumulator, current];
          },
          [...allNews]
        );

        setProp("allNews", uniqueHits);

        checkFavouriteNews();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setProp("isLoading", false);
      });
  }, [page, activeQuery]);

  useEffect(() => {
    if (activeQuery !== "none" && isLoading === false) {
      const timeoutId = setTimeout(() => {
        fetchNews();
      }, 400);
      return () => clearTimeout(timeoutId);
    }
  }, [fetchNews]);

  useEffect(() => {
    if (lastItemRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProp("page", page + 1);
          }
        });
      });

      observer.observe(lastItemRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [lastItemRef.current]);

  return (
    <div className="container">
      <div className="tabs">
        <nav className="tabs__nav">
          <ul className="tabs__ul">
            <li className={activeTab === "all" ? "tabs__nav-active" : ""} onClick={() => setProp("activeTab", "all")}>
              All
            </li>
            <li className={activeTab === "favs" ? "tabs__nav-active" : ""} onClick={() => setProp("activeTab", "favs")}>
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
          {activeTab === "all" &&
            allNews.map(({ author, story_id, story_title, story_url, isFavourite, created_at }: INewsType, index) => {
              const lastElement = index === allNews.length - 1;

              return (
                <NewsBox
                  key={story_id}
                  author={author}
                  story_id={story_id}
                  story_url={story_url}
                  story_title={story_title}
                  isFavourite={isFavourite}
                  created_at={created_at}
                  innerRef={lastElement ? lastItemRef : null}
                ></NewsBox>
              );
            })}

          {activeTab === "favs" &&
            favNews.map(({ author, story_id, story_title, story_url, isFavourite, created_at }: INewsType) => {
              return (
                <NewsBox
                  key={story_id}
                  author={author}
                  story_id={story_id}
                  story_url={story_url}
                  story_title={story_title}
                  isFavourite={isFavourite}
                  created_at={created_at}
                ></NewsBox>
              );
            })}
        </div>

        {(activeQuery === "none" ||
          (activeTab === "all" && allNews.length === 0) ||
          (activeTab === "favs" && favNews.length === 0)) && (
          <p className="news-list__no-data">There is no data to show</p>
        )}
      </section>
    </div>
  );
}
