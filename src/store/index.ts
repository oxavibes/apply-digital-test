import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'

import produce from 'immer';

import { INewsType } from './../types/news.d';

type State = {
  allNews: Array<INewsType>;
  favNews: Array<INewsType>;

  activeTab: "all" | "favs";
  activeQuery: "angular" | "react" | "vue" | "none";

  page: number;
  hitsPerPage: number;

  loadedNews: number;
  isLoading: boolean;
}

type Action = {
  setProp: (key: string, value: any) => void,
  toggleFavourite(index: number, value: boolean): void,
  addFavourite(item: INewsType): void,
  removeFavourite(item: INewsType): void,
  checkFavouriteNews(): void,
}


export const useNewsStore = create<State & Action>()(persist(
  (set) => ({
    allNews: [],
    favNews: [],

    activeTab: "all",
    activeQuery: "none",

    page: 0,
    hitsPerPage: 20,

    loadedNews: 0,
    isLoading: false,

    setProp: (key: string, value: any) => set(produce(state => { state[key] = value })),
    toggleFavourite: (index, value: boolean) => set(produce(state => { state.allNews[index].isFavourite = value })),
    addFavourite: (item: INewsType) => set(produce(state => { state.favNews = [...state.favNews, item] })),
    checkFavouriteNews: () => set(produce(state => {
      state.allNews = state.allNews.map((current: INewsType) => {
        if (state.favNews.find((item: INewsType) => item.story_id === current.story_id)) {
          current.isFavourite = true;
        }

        return current
      })
    })),
    removeFavourite: (item: INewsType) => set(produce(state => { state.favNews = state.favNews.filter((fav: INewsType) => fav.story_id !== item.story_id) })),
  }),
  {
    name: 'news-storage', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  }
));
