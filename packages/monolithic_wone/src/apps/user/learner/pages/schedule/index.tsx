import React from "react";
import { useQuery } from "@apollo/client";

import appInfo from "utility/app-info";
import { LEARNER_SCREEN_SCHEDULE } from "utility/graphQl/query.jsx";

import SessionTile from "../../components/session-tile";
import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

import { useSearch, Search } from "apps/user/common/components/search";
import { FilterTags } from "apps/user/common/components/filter-tags";

import calendarIcon from "Assets/icon-calendar.svg";

import styles from "./index.module.scss";

const PAGE_TITLE = "MY SCHEDULE";

const Schedule = () => {
  const { searchQuery, onSubmitSearchQuery } = useSearch();
  const [filterTagsSelected, setFilterTagsSelected] = React.useState([]);
  const { loading, error, data } = useQuery(LEARNER_SCREEN_SCHEDULE, {
    // fetchPolicy: "no-cache",
    fetchPolicy: "cache-and-network",
    onError(error) {
      console.error("Error while fetching learner schedule", error);
    },
    variables: {
      appInfo,
    },
  });

  if (loading && !data) {
    return (
      <PageContainer>
        <PageHeader transparent />
        <PageContent maxWidth="lg">
          <div className={styles["page-title"]}>
            <img src={calendarIcon} alt="calendar" />
            <h1 className={styles["heading"]}>{PAGE_TITLE}</h1>
          </div>
          <div className={styles["search-container"]}>
            <Search
              searchQuery={searchQuery}
              onSubmitSearchQuery={onSubmitSearchQuery}
              autoFocus={!data}
            />
          </div>
          <div className={styles["filters-container"]}>
            <FilterTags
              filterTags={[]}
              onChange={(data) => setFilterTagsSelected(data)}
            />
          </div>
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader transparent />
        <PageContent maxWidth="lg">
          <div className={styles["page-title"]}>
            <img src={calendarIcon} alt="calendar" />
            <h1 className={styles["heading"]}>{PAGE_TITLE}</h1>
          </div>
          <div className={styles["search-container"]}>
            <Search
              searchQuery={searchQuery}
              onSubmitSearchQuery={onSubmitSearchQuery}
            />
          </div>
          <div className={styles["filters-container"]}>
            <FilterTags
              filterTags={[]}
              onChange={(data) => setFilterTagsSelected(data)}
            />
          </div>
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }

  const { contentLists } = data.learner.screens.schedule;
  const contentList = contentLists[0];

  const filterTags = [...contentList.services, ...contentList.durations];
  const servicesSelected = filterTagsSelected.filter((tag) =>
    contentList.services.includes(tag)
  );
  const durationsSelected = filterTagsSelected.filter((tag) =>
    contentList.durations.includes(tag)
  );
  const filteredItems = contentList.items
    .filter((item) => {
      if (!filterTagsSelected.length) {
        return true;
      } else {
        return (
          (servicesSelected.length === 0 ||
            servicesSelected.some((service) => item.service === service)) &&
          (durationsSelected.length === 0 ||
            durationsSelected.some((duration) => item.duration === duration))
        );
      }
    })
    .filter((item) => {
      const sanitizedSearchQuery = searchQuery.replace(/\s+/g, " ").trim();
      const {
        practitioner: { fullName },
        title,
      } = item;

      return (
        fullName.toLowerCase().includes(sanitizedSearchQuery.toLowerCase()) ||
        title.toLowerCase().includes(sanitizedSearchQuery.toLowerCase())
      );
    });

  return (
    <PageContainer>
      <PageHeader transparent />
      <PageContent maxWidth="lg">
        <div className={styles["page-title"]}>
          <img src={calendarIcon} alt="calendar" />
          <h1 className={styles["heading"]}>{PAGE_TITLE}</h1>
        </div>
        <div className={styles["search-container"]}>
          <Search
            searchQuery={searchQuery}
            onSubmitSearchQuery={onSubmitSearchQuery}
            autoFocus={!data}
          />
        </div>
        <div className={styles["filters-container"]}>
          <FilterTags
            filterTags={filterTags}
            onChange={(data) => setFilterTagsSelected(data)}
          />
        </div>
        {contentList.items.length && !filteredItems.length ? (
          <PageError>
            <div className={styles["no-results"]}>
              <h3>NO RESULTS FOUND</h3>
              <p>Please try:</p>
              <p>Searching again with different words</p>
              <p>Removing your filters</p>
            </div>
          </PageError>
        ) : (
          filteredItems.map((item, index) => (
            <SessionTile
              key={item.id}
              session={item}
              listName={contentLists[0].id}
              listPosition={index + 1}
            />
          ))
        )}
      </PageContent>
    </PageContainer>
  );
};

export default Schedule;
