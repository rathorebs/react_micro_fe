import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { logAnalyticsEvent } from "../../../utility/FirebaseAnalytics";
import constant from "../../../Constant";
import ReacrdingThumbPH from "../../../Assets/images/reacrdingThumbPH.jpg";
import {
  ARTICLE_DETAILS,
  USER_FAVORITES_ARTICLE,
} from "../../../utility/graphQl/query";

import {
  REPORT_ARTICLE_OPEN,
  REPORT_ARTICLE_SCROLL_START,
  REPORT_ARTICLE_SCROLL_PROGRESS,
  REPORT_ARTICLE_SCROLL_END,
} from "../../../utility/graphQl/mutation";

import Favourite from "../../../components/commons/favourite/favourite.component";
import "./article-detail.styles.scss";
import NotFound from "../../../components/NotFound";
import Page from "../../Page";

function getScrollPercent() {
  // source: https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
  const h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";

  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

const PROGRESS_REPORT_DELAY_MS = 3000;

const ArticleDetail = (props) => {
  const [articleDetail, setArticleDetail] = useState([]);
  const [favouriteStatus, setFavouriteStatus] = useState(false);
  const [isPageFound, setPageFound] = useState(true);

  const groupUuidRef = useRef(null);
  const isScrollStartedRef = useRef(false);
  const progressReportRef = useRef({
    10: false,
    25: false,
    50: false,
    75: false,
    95: false,
  });
  const progressReportTimeoutRef = useRef(null);
  const { articleId } = useParams();
  const userID = localStorage.getItem("userID");
  const companyName = localStorage.getItem("companyName") || "NA";
  const articleTitle = articleDetail?.article?.title;
  const listName = props?.location?.state?.listName;
  const listPosition = props?.location?.state?.listPosition;

  const CREATE_UPDATE_USER_FAVOURITES = gql`
    mutation CreateUpdateUserFavourites($input: UserFavouritesInput!) {
      createUpdateUserFavourites(input: $input) {
        ok
        userFavorites {
          id
          articles {
            id
          }
        }
      }
    }
  `;

  const [reportArticleOpen] = useMutation(REPORT_ARTICLE_OPEN, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      groupUuidRef.current = response.reportArticleOpen.groupUuid;
    },
    onError(error) {
      console.log("reportArticleOpen error", error);
    },
  });

  const [reportArticleScrollStart] = useMutation(REPORT_ARTICLE_SCROLL_START);

  const [reportArticleScrollProgress] = useMutation(
    REPORT_ARTICLE_SCROLL_PROGRESS
  );

  const [reportArticleScrollEnd] = useMutation(REPORT_ARTICLE_SCROLL_END);

  const handleOpen = useCallback(() => {
    reportArticleOpen({
      variables: {
        articleId,
        at: new Date().getTime(),
        platform: constant.APP_PLATFORM,
      },
    }).then((result) => {
      const percentage = getScrollPercent();

      if (isNaN(percentage)) {
        reportArticleScrollEnd({
          variables: {
            articleId,
            at: new Date().getTime(),
            platform: constant.APP_PLATFORM,
            groupUuid: result.data.reportArticleOpen.groupUuid,
          },
        });

        progressReportRef.current = {
          ...progressReportRef.current,
          10: true,
          25: true,
          50: true,
          75: true,
          95: true,
        };

        isScrollStartedRef.current = true;
      }
    });
  }, [articleId, reportArticleOpen, reportArticleScrollEnd]);

  const handleScrollProgress = useCallback(() => {
    if (!groupUuidRef.current) return;

    if (!isScrollStartedRef.current) {
      reportArticleScrollStart({
        variables: {
          articleId,
          at: new Date().getTime(),
          platform: constant.APP_PLATFORM,
          groupUuid: groupUuidRef.current,
        },
      });

      isScrollStartedRef.current = true;
    }

    const percentage = getScrollPercent();

    if (progressReportTimeoutRef.current) {
      clearTimeout(progressReportTimeoutRef.current);
      progressReportTimeoutRef.current = null;
    }

    if (!progressReportRef.current[10] && percentage >= 10 && percentage < 25) {
      progressReportTimeoutRef.current = setTimeout(() => {
        reportArticleScrollProgress({
          variables: {
            articleId,
            at: new Date().getTime(),
            platform: constant.APP_PLATFORM,
            groupUuid: groupUuidRef.current,
            percentage,
          },
        });

        progressReportRef.current = {
          ...progressReportRef.current,
          10: true,
        };
      }, PROGRESS_REPORT_DELAY_MS);
    } else if (
      !progressReportRef.current[25] &&
      percentage >= 25 &&
      percentage < 50
    ) {
      progressReportTimeoutRef.current = setTimeout(() => {
        reportArticleScrollProgress({
          variables: {
            articleId,
            at: new Date().getTime(),
            platform: constant.APP_PLATFORM,
            groupUuid: groupUuidRef.current,
            percentage,
          },
        });

        progressReportRef.current = {
          ...progressReportRef.current,
          10: true,
          25: true,
        };
      }, PROGRESS_REPORT_DELAY_MS);
    } else if (
      !progressReportRef.current[50] &&
      percentage >= 50 &&
      percentage < 75
    ) {
      progressReportTimeoutRef.current = setTimeout(() => {
        reportArticleScrollProgress({
          variables: {
            articleId,
            at: new Date().getTime(),
            platform: constant.APP_PLATFORM,
            groupUuid: groupUuidRef.current,
            percentage,
          },
        });

        progressReportRef.current = {
          ...progressReportRef.current,
          10: true,
          25: true,
          50: true,
        };
      }, PROGRESS_REPORT_DELAY_MS);
    } else if (
      !progressReportRef.current[75] &&
      percentage >= 75 &&
      percentage < 95
    ) {
      progressReportTimeoutRef.current = setTimeout(() => {
        reportArticleScrollProgress({
          variables: {
            articleId,
            at: new Date().getTime(),
            platform: constant.APP_PLATFORM,
            groupUuid: groupUuidRef.current,
            percentage,
          },
        });

        progressReportRef.current = {
          ...progressReportRef.current,
          10: true,
          25: true,
          50: true,
          75: true,
        };
      }, PROGRESS_REPORT_DELAY_MS);
    } else if (!progressReportRef.current[95] && percentage >= 95) {
      progressReportTimeoutRef.current = setTimeout(() => {
        reportArticleScrollEnd({
          variables: {
            articleId,
            at: new Date().getTime(),
            platform: constant.APP_PLATFORM,
            groupUuid: groupUuidRef.current,
          },
        });

        progressReportRef.current = {
          ...progressReportRef.current,
          10: true,
          25: true,
          50: true,
          75: true,
          95: true,
        };
      }, PROGRESS_REPORT_DELAY_MS);
    }
  }, [
    articleId,
    reportArticleScrollEnd,
    reportArticleScrollProgress,
    reportArticleScrollStart,
  ]);

  useEffect(() => {
    window.onscroll = handleScrollProgress;
    return () => (window.onscroll = null);
  }, [handleScrollProgress]);

  useEffect(() => {
    if (articleTitle) {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;

      logAnalyticsEvent("article_view", {
        user_id: userID,
        user_id_wone: userID,
        article_id: articleId,
        user_company_name: companyName,
        article_title: articleTitle,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
  }, [articleTitle, listName, listPosition, articleId, companyName, userID]);

  useQuery(ARTICLE_DETAILS, {
    fetchPolicy: "no-cache",
    variables: { id: articleId },
    onCompleted(response) {
      setArticleDetail(response);
      getFavouriteArticle();
      handleOpen();
    },
    onError(error) {
      setPageFound(false);
      console.log("load article error", error);
    },
  });

  const [getFavouriteArticle] = useLazyQuery(USER_FAVORITES_ARTICLE, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      if (response.userFavourites.articles.length > 0) {
        const favouriteStatus = response.userFavourites.articles.filter(
          (e) => e.id === articleId
        );
        setFavouriteStatus(!!favouriteStatus.length ? true : false);
      }
    },
    onError(error) {
      console.log("load user_favorites error", error);
    },
  });
  const [userFavourites] = useMutation(CREATE_UPDATE_USER_FAVOURITES);

  const handleClick = (e) => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;

    e.preventDefault();
    !favouriteStatus &&
      logAnalyticsEvent("article_add_to_favourites_click", {
        user_id: userID,
        user_id_wone: userID,
        article_id: articleId,
        user_company_name: companyName,
        article_title: articleTitle,
        list_name: listName ?? undefined,
        list_position: listPosition ?? undefined,
        page_title: pageTitle,
        page_path: pagePath,
      });
    userFavourites({
      variables: {
        input: {
          articles: articleId,
          remove: favouriteStatus,
        },
      },
    })
      .then((res) => {
        setFavouriteStatus(!favouriteStatus);
        !favouriteStatus &&
          logAnalyticsEvent("article_added_to_favourites", {
            user_id: userID,
            user_id_wone: userID,
            article_id: articleId,
            user_company_name: companyName,
            article_title: articleTitle,
            list_name: listName ?? undefined,
            list_position: listPosition ?? undefined,
            page_title: pageTitle,
            page_path: pagePath,
          });
      })
      .catch((error) => {
        // errors["UserFavourire"] = "load UserFavourire error";
        console.log("load user_favorites error", error);
      });
  };

  if (!isPageFound) {
    return <NotFound />;
  }

  return (
    articleDetail &&
    !!articleDetail.article && (
      <Page title={`${articleDetail.article.title} - Articles`}>
        <div className="tsession-container corporate-container">
          <div className="article-detail">
            <div className="row">
              <div className="col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <h4
                  dangerouslySetInnerHTML={{
                    __html: articleDetail.article.title,
                  }}
                ></h4>
                <h6>
                  by{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: articleDetail.article.author,
                    }}
                  ></span>
                </h6>
                <div className="fav-container">
                  <Favourite
                    handleClick={handleClick}
                    status={favouriteStatus}
                  />{" "}
                </div>
                <span className="img-container">
                  <img
                    height="290"
                    src={
                      articleDetail.article.photo == null
                        ? ReacrdingThumbPH
                        : articleDetail.article.photo
                    }
                    alt="Article Detail"
                    className="img-fluid"
                    loading="lazy"
                  />
                </span>
                {articleDetail.article.content && (
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                      __html: articleDetail.article.content,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  );
};

export default ArticleDetail;
