import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LEARNER_SCREEN_INDEX } from "utility/graphQl/query";
import appInfo from "utility/app-info";
import styles from "./index.module.scss";
import IndexScore from "apps/user/common/components/index-score";

import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";
import PillarDetailsContentList from "./pillar-details-content-list";

const PillarDetails = () => {
  const { woneindexType } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(LEARNER_SCREEN_INDEX, {
    onError(error) {
      console.error("Error while fetching wone index data", error);
    },
    variables: {
      appInfo,
    },
  });

  const wondIndexPillar =
    data?.learner?.screens?.index?.breakdown[woneindexType];

  if (
    woneindexType !== "activity" &&
    woneindexType !== "energy" &&
    woneindexType !== "resilience"
  ) {
    navigate("/user/woneindex");
  }

  if (loading) {
    return (
      <PageContainer>
        <PageHeader
          showBackButton
          backTo={"/user/woneindex"}
          title="YOUR INDEX"
        />
        <PageContent maxWidth="lg">
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader
          showBackButton
          backTo={"/user/woneindex"}
          title="YOUR INDEX"
        />
        <PageContent maxWidth="lg">
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        showBackButton
        backTo={"/user/woneindex"}
        title="YOUR INDEX"
      />

      <PageContent maxWidth="lg">
        <div className={styles["index-score-sec"]}>
          {wondIndexPillar?.score?.labelHtml && (
            <span
              className={styles["index-score-desc"]}
              dangerouslySetInnerHTML={{
                __html: wondIndexPillar?.score?.labelHtml,
              }}
            />
          )}
          {wondIndexPillar && (
            <IndexScore indexScoreData={wondIndexPillar?.score} size={"big"} />
          )}
        </div>
        <div className={styles["wone-index-details"]}>
          <h2>{wondIndexPillar?.pillarLabel}</h2>
          <p>{wondIndexPillar?.descriptionHtml}</p>
        </div>
        <PillarDetailsContentList
          contentLists={wondIndexPillar?.contentLists}
        />
      </PageContent>
    </PageContainer>
  );
};

export default PillarDetails;
