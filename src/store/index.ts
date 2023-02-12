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
  toggleFavourite(index: number): void,
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
    toggleFavourite: (index: number) => set(produce(state => { state.allNews[index].isFavourite = !state.allNews[index]?.isFavourite }))
  }),
  {
    name: 'news-storage', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  }
));
