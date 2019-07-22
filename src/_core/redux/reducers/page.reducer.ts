import { PageAction, SET_PAGE_ROUTE, PageStore } from "../types";
import qs from "qs";
import { parseHash } from "../../helpers/parseHash";

const pageState: PageStore = {
  data: { title: "", url: "", param: {}, hash: [] }
};

export function reducerPages(state = pageState, action: PageAction) {
  switch (action.type) {
    case SET_PAGE_ROUTE:
      const { title, location } = action.payload;

      document.title = title;

      const newPageStore = {
        title: title,
        url: location.pathname,
        params: location.search
          ? qs.parse(location.search, {
              ignoreQueryPrefix: true
            })
          : null,
        hash: parseHash(location.hash)
      };

      return {
        ...state,
        data: newPageStore
      };

    default:
      return state;
  }
}
