import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { usePage } from "providers/page";
import appInfo from "utility/app-info";
import InfoIcon from "Assets/icon/icon_Information.svg";
import { toPascalCase } from "utility/Function";
import { LEARNER_CONTENT_LIST } from "utility/graphQl/query";
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

import { LearnerContentList } from "../../api/types";
import { ContentListPreview } from "apps/user/learner/components/content-list/preview";

import styles from "apps/user/learner/styles/common.module.scss";

interface ResultProps {
  searchQuery: string;
  landingContentLists: LearnerContentList[];
  filteredContentList: LearnerContentList;
}

const Result = ({
  searchQuery,
  landingContentLists,
  filteredContentList,
}: ResultProps): any | any[] => {
  const shouldShowFilteredContentList =
    searchQuery ||
    filteredContentList?.filters?.some((filter) =>
      filter?.options?.some((option) => option.selected)
    );

  if (shouldShowFilteredContentList && filteredContentList.items.length) {
    return (
      <ContentListPreview
        seeMore
        hideHeading
        key={filteredContentList.id}
        data={filteredContentList}
      />
    );
  } else if (
    shouldShowFilteredContentList &&
    !filteredContentList.items.length
  ) {
    return (
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
      <ContentListPreview seeMore hideHeading key={list.id} data={list} />
    ))
  );
};

const defaultFilters = {
  services: [],
  practitioners: [],
  durations: [],
  pillarLabels: [],
};

const ContentList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { onPrefixPageTitle } = usePage();

  const pascalCaseId = toPascalCase(id);

  const { searchQuery, onSubmitSearchQuery } = useSearch();
  const {
    filters,
    // isFilterDialogOpen,
    // onClickFilterButton,
    // onSubmitFiltersInput,
    // onClearFiltersInput,
  } = useFilters(defaultFilters);

  const { loading, error, data } = useQuery(LEARNER_CONTENT_LIST, {
    // fetchPolicy: "no-cache",
    fetchPolicy: "cache-and-network",
    onError(error) {
      console.error("Error while fetching recordings landing page", error);
    },
    variables: {
      id: pascalCaseId,
      searchQuery,
      filters,
      appInfo,
    },
  });

  onPrefixPageTitle(data?.learnerContentList?.label);

  let title = state && state.pageTitlePrefix ? state.pageTitlePrefix : "";

  if (loading && !data) {
    return (
      <PageContainer>
        <PageHeader showBackButton title={title} />
        <PageContent maxWidth="lg">
          <div className={styles["common-search-and-filter"]}>
            {id !== "learner-biometrics-sessions-history" && (
              <div className={styles["common-searchbox"]}>
                <Search
                  searchQuery={searchQuery}
                  onSubmitSearchQuery={onSubmitSearchQuery}
                  autoFocus={!data}
                />
                {/* <FilterButton /> */}
              </div>
            )}
          </div>
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader showBackButton title={title} />
        <PageContent maxWidth="lg">
          <div className={styles["common-search-and-filter"]}>
            {data?.learnerContentList?.id !==
              "LearnerBiometricsSessionsHistory" && (
              <div className={styles["common-searchbox"]}>
                <Search
                  searchQuery={searchQuery}
                  onSubmitSearchQuery={onSubmitSearchQuery}
                />
                {/* <FilterButton /> */}
              </div>
            )}
          </div>
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }

  const { learnerContentList } = data;

  title = learnerContentList.label;

  const handleClickUrl = () => {
    navigate("/user/profile/settings/how-it-works");
  };
  return (
    <PageContainer>
      <PageHeader showBackButton title={title} id={learnerContentList?.id}>
        {data?.learnerContentList?.id ===
          "LearnerBiometricsSessionsHistory" && (
          <img
            src={InfoIcon}
            alt="How it works"
            onClick={handleClickUrl}
            style={{ marginLeft: "auto", cursor: "pointer" }}
          />
        )}
      </PageHeader>
      <PageContent maxWidth="lg">
        <div className={styles["common-search-and-filter"]}>
          {learnerContentList?.id !== "LearnerBiometricsSessionsHistory" && (
            <div className={styles["common-searchbox"]}>
              <Search
                searchQuery={searchQuery}
                onSubmitSearchQuery={onSubmitSearchQuery}
                autoFocus={!data}
              />
              {/* <FilterButton onClick={onClickFilterButton} /> */}
            </div>
          )}
          {/* <FilterPills
            filters={learnerContentList.filters}
            onSubmitFiltersInput={onSubmitFiltersInput}
          /> */}
        </div>
        <Result
          searchQuery={searchQuery}
          landingContentLists={[learnerContentList]}
          filteredContentList={learnerContentList}
        />
      </PageContent>
      {/* <FilterDialog
        isOpen={isFilterDialogOpen}
        filters={learnerContentList.filters}
        onSubmitFiltersInput={onSubmitFiltersInput}
        onClearFiltersInput={onClearFiltersInput}
      ></FilterDialog> */}
    </PageContainer>
  );
};

export default ContentList;
