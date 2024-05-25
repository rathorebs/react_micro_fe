import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageContext = createContext(null);

export const PAGE_TITLE_CORE = "WONE";
export const PAGE_TITLE_SEPARATOR = "|";

interface PageProviderProps {
  title: string;
  children: React.ReactNode;
  waitForPrefix?: boolean;
}

const PageProvider = ({
  title,
  children,
  waitForPrefix,
}: PageProviderProps) => {
  const location = useLocation();

  const handleChangeTitle = (nextTitle: string) => {
    if (nextTitle !== document.title) {
      document.title = nextTitle;
    }
  };

  const handlePrefixTitle = (titlePrefix: string) => {
    let nextTitle = title
      ? `${title} ${PAGE_TITLE_SEPARATOR} ${PAGE_TITLE_CORE}`
      : PAGE_TITLE_CORE;

    if (titlePrefix) {
      nextTitle = `${titlePrefix} ${PAGE_TITLE_SEPARATOR} ${nextTitle}`;
    } else if (location?.state?.pageTitlePrefix) {
      // Fallback to state if titlePrefix is not provided
      // This may happen after we click on a card and go to
      // the content details page. At that point we may do a
      // request to the server to fetch the content details.
      // In the meantime, the title prefix should be made
      // available in the location state.
      nextTitle = `${location.state.pageTitlePrefix} ${PAGE_TITLE_SEPARATOR} ${nextTitle}`;
    }

    handleChangeTitle(nextTitle);
  };

  useEffect(() => {
    if (waitForPrefix) return;

    let nextTitle = title
      ? `${title} ${PAGE_TITLE_SEPARATOR} ${PAGE_TITLE_CORE}`
      : PAGE_TITLE_CORE;

    handleChangeTitle(nextTitle);
  }, [title, waitForPrefix]);

  return (
    <PageContext.Provider
      value={{ title, onPrefixPageTitle: handlePrefixTitle }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);

export default PageProvider;
