import React, { useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import appInfo from "utility/app-info";
import { LEARNER_ARTICLE } from "utility/graphQl/query";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";
import { LearnerArticle } from "apps/user/learner/api/types";

import { usePage } from "providers/page";

import useReportArticleEngagement from "./hooks/use-report-article-engagement";
import useFavorite from "apps/user/learner/hooks/use-favourite";
import FavouriteIcon from "apps/user/learner/components/favourite-icon";
import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

import styles from "./index.module.scss";

const ArticleDetail = () => {
  const location = useLocation();
  const { onPrefixPageTitle } = usePage();
  const { articleId } = useParams();

  const isViewSentRef = useRef(false);

  const { onOpen } = useReportArticleEngagement(articleId);
  const { onFavourite, loading: isFavouriteLoading } = useFavorite();

  const { loading, error, data } = useQuery(LEARNER_ARTICLE, {
    onCompleted() {
      onOpen();
    },
    onError(error) {
      console.error("Error while fetching article detail", error);
    },
    variables: {
      id: articleId,
      appInfo,
    },
  });

  useEffect(() => {
    if (!isViewSentRef.current && data?.learnerArticle) {
      let listName, listPosition;

      if (location.state?.listName) {
        listName = location.state.listName;
      }

      if (location.state?.listPosition) {
        listPosition = location.state.listPosition;
      }

      const userId = localStorage.getItem("userID");
      const companyName = localStorage.getItem("companyName") || "NA";

      const { id, title } = data.learnerArticle as LearnerArticle;

      logAnalyticsEvent("article_view", {
        user_id: userId,
        user_id_wone: userId,
        user_company_name: companyName,
        article_id: id,
        article_title: title,
        list_name: listName,
        list_position: listPosition,
        page_title: document.title,
        page_path: window.location.pathname,
      });

      isViewSentRef.current = true;
    }
  }, [data, location]);

  onPrefixPageTitle(data?.learnerArticle?.title);

  if (loading) {
    return (
      <PageContainer background="white">
        <PageHeader showBackButton />
        <PageContent maxWidth="sm">
          <PageLoading />
        </PageContent>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer background="white">
        <PageHeader showBackButton />
        <PageContent maxWidth="sm">
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }

  const { title, subtitle, imageUrl, contentHtml, isFavourite } =
    data.learnerArticle;

  return (
    <PageContainer background="white">
      <PageHeader showBackButton>
        <FavouriteIcon
          style={{ marginLeft: "auto" }}
          status={isFavourite}
          loading={isFavouriteLoading}
          onClick={() => onFavourite(data.learnerArticle)}
        />
      </PageHeader>
      <PageContent maxWidth="sm">
        <div className={styles["detail-page-main"]}>
          <div className={styles["detail-page-content"]}>
            <h1 className={styles["detail-page-main-heading"]}>{title}</h1>
            <p className={styles["detail-page-author"]}> {subtitle}</p>

            <img
              className={styles["detail-page-image"]}
              src={imageUrl}
              alt="detail-page-icon"
            />
            <article
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              className={styles["detail-page-details"]}
            ></article>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default ArticleDetail;
