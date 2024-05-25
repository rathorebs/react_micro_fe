import React, { useState, useRef, FormEvent, KeyboardEvent } from "react";

import SearchIcon from "Assets/icon-search.svg";

import styles from "./index.module.scss";

const MIN_SEARCH_QUERY_LENGTH = 3;
const MAX_SEARCH_QUERY_LENGTH = 100;

interface SearchProps {
  searchQuery: string;
  onSubmitSearchQuery: (value: string) => void;
  autoFocus?: boolean;
}

export const Search = ({
  searchQuery,
  onSubmitSearchQuery,
  autoFocus,
}: SearchProps) => {
  const formRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const doneTypingInterval = 500;

  const handleTyping = (e: KeyboardEvent<HTMLInputElement>) => {
    clearTimeout(typingTimeoutRef.current);

    const value = formRef.current.search.value;
    if (!value.length || value.length >= MIN_SEARCH_QUERY_LENGTH) {
      typingTimeoutRef.current = setTimeout(() => {
        onSubmitSearchQuery(value);
      }, doneTypingInterval);
    }
  };

  const handleSubmitSearchQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    clearTimeout(typingTimeoutRef.current);

    onSubmitSearchQuery(e.currentTarget.search.value);
  };

  return (
    <div className={styles["search-container"]}>
      <form ref={formRef} onSubmit={handleSubmitSearchQuery}>
        <i>
          <img src={SearchIcon} alt="Magnifying glass icon" />
        </i>
        <input
          autoFocus={autoFocus}
          autoComplete="off"
          type="search"
          name="search"
          minLength={MIN_SEARCH_QUERY_LENGTH}
          maxLength={MAX_SEARCH_QUERY_LENGTH}
          placeholder="Search"
          defaultValue={searchQuery}
          onKeyUp={handleTyping}
        />
      </form>
    </div>
  );
};

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmitSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return {
    searchQuery,
    onSubmitSearchQuery: handleSubmitSearchQuery,
  };
};
