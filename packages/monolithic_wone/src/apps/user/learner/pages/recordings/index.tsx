import React from "react";
import { useQuery } from "@apollo/client";
import { LEARNER_SCREEN_RECORDINGS } from "utility/graphQl/query";
import { FilterTags } from "apps/user/common/components/filter-tags";
import appInfo from "utility/app-info";
import { useSearch, Search } from "apps/user/common/components/search";
import {
  useFilters,
  // FilterDialog,
  // FilterButton,
  // FilterPills,
} from "apps/user/common/components/filter";

import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";
import { ContentListPreview } from "apps/user/learner/components/content-list/preview";

import styles from "apps/user/learner/styles/common.module.scss";

interface ResultProps {
  searchQuery: string;
  landingContentLists: any[];
  filteredContentList: any;
  servicesSelected: any[];
  durationsSelected: any[];
  filterTagsSelected: any[];
}

const Result = ({
  searchQuery,
  landingContentLists,
  filteredContentList,
  servicesSelected,
  durationsSelected,
  filterTagsSelected,
}: ResultProps): any | any[] => {
  const shouldShowFilteredContentList = searchQuery;

  if (shouldShowFilteredContentList || filterTagsSelected.length) {
    const filteredItems = filteredContentList.items
      .filter((item) => {
        return (
          (servicesSelected.length === 0 ||
            servicesSelected.some((service) => item.service === service)) &&
          (durationsSelected.length === 0 ||
            durationsSelected.some(
              (duration) => item.sessionDuration === duration
            ))
        );
      })
      .filter((card) => {
        const sanitizedSearchQuery = searchQuery.replace(/\s+/g, " ").trim();
        return (
          card.title
            .toLowerCase()
            .includes(sanitizedSearchQuery.toLowerCase()) ||
          card.subtitle
            .toLowerCase()
            .includes(sanitizedSearchQuery.toLowerCase())
        );
      });

    const items = {
      id: filteredContentList.id,
      items: filteredItems,
      __typename: filteredContentList.__typename,
      label: "Filtered Recordings",
      filters: [],
    };

    return filteredItems?.length ? (
      <ContentListPreview
        seeMore
        hideHeading
        key={filteredContentList.id}
        data={items}
      />
    ) : (
      <div className={styles["common-no-results"]}>
        <h3>NO RESULTS FOUND</h3>
        <p>Please try:</p>
        <p>Searching again with different words</p>
        <p>Removing your filters</p>
      </div>
    );
  }

  return (
    landingContentLists.length > 0 &&
    landingContentLists.map((list) => (
      <ContentListPreview seeMore key={list.id} data={list} limit={3} />
    ))
  );
};

const defaultFilters = {
  services: [],
  practitioners: [],
  durations: [],
};

const Recordings = () => {
  const { searchQuery, onSubmitSearchQuery } = useSearch();
  const [filterTagsSelected, setFilterTagsSelected] = React.useState([]);
  const {
    filters,
    // isFilterDialogOpen,
    // onClickFilterButton,
    // onSubmitFiltersInput,
    // onClearFiltersInput,
  } = useFilters(defaultFilters);

  const { loading, error, data } = useQuery(LEARNER_SCREEN_RECORDINGS, {
    // fetchPolicy: "no-cache",
    fetchPolicy: "cache-and-network",
    onError(error) {
      console.error("Error while fetching recordings landing page", error);
    },
    variables: {
      filters,
      appInfo,
    },
  });

  if (loading && !data) {
    return (
      <PageContainer>
        <PageHeader title="RECORDINGS" />
        <PageContent maxWidth="lg">
          <div className={styles["common-search-and-filter"]}>
            <div className={styles["common-searchbox"]}>
              <Search
                searchQuery={searchQuery}
                onSubmitSearchQuery={onSubmitSearchQuery}
                autoFocus={!data}
              />
              {/* <FilterButton /> */}
            </div>
          </div>
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader title="RECORDINGS" />
        <PageContent maxWidth="lg">
          <div className={styles["common-search-and-filter"]}>
            <div className={styles["common-searchbox"]}>
              <Search
                searchQuery={searchQuery}
                onSubmitSearchQuery={onSubmitSearchQuery}
              />
              {/* <FilterButton /> */}
            </div>
          </div>
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }

  const { landingContentLists, filteredContentList } =
    data?.learner?.screens?.recordings;

  const servicesSelected = filterTagsSelected.filter((tag) =>
    filteredContentList.services.includes(tag)
  );

  const durationsSelected = filterTagsSelected.filter((tag) =>
    filteredContentList.durations.includes(tag)
  );

  return (
    <PageContainer>
      <PageHeader title="RECORDINGS" />
      <PageContent maxWidth="lg">
        <div className={styles["common-searchbox"]}>
          <Search
            searchQuery={searchQuery}
            onSubmitSearchQuery={onSubmitSearchQuery}
            autoFocus={!data}
          />
          {/* <FilterButton onClick={onClickFilterButton} /> */}

          {/* <FilterPills
            filters={filteredContentList.filters}
            onSubmitFiltersInput={onSubmitFiltersInput}
          /> */}
        </div>
        <div style={{ marginBottom: "1.75rem" }}>
          <FilterTags
            filterTags={filteredContentList?.filterTags}
            onChange={(data) => setFilterTagsSelected(data)}
          />
        </div>

        <Result
          searchQuery={searchQuery}
          landingContentLists={landingContentLists}
          filteredContentList={filteredContentList}
          servicesSelected={servicesSelected}
          durationsSelected={durationsSelected}
          filterTagsSelected={filterTagsSelected}
        />
        {/* <FilterDialog
          isOpen={isFilterDialogOpen}
          filters={filteredContentList.filters}
          onSubmitFiltersInput={onSubmitFiltersInput}
          onClearFiltersInput={onClearFiltersInput}
        ></FilterDialog> */}
      </PageContent>
    </PageContainer>
  );
};

export default Recordings;
