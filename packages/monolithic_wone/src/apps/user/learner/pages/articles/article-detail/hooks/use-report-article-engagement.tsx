import { useCallback, useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";

import constant from "Constant";
import {
  REPORT_ARTICLE_OPEN,
  REPORT_ARTICLE_SCROLL_START,
  REPORT_ARTICLE_SCROLL_PROGRESS,
  REPORT_ARTICLE_SCROLL_END,
} from "utility/graphQl/mutation";

function getScrollPercent() {
  // source: https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
  const h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";

  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

const PROGRESS_REPORT_DELAY_MS = 3000;

const useReportArticleEngagement = (articleId: string) => {
  const [isOpened, setIsOpened] = useState(false);

  const groupUuidRef = useRef(null);
  const progressReportRef = useRef({
    10: false,
    25: false,
    50: false,
    75: false,
    95: false,
  });
  const progressReportTimeoutRef = useRef(null);
  const isScrollStartedRef = useRef(false);

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

  const handleOpen = () => {
    if (!isOpened) {
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

      setIsOpened(true);
    }
  };

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

  return {
    onOpen: handleOpen,
  };
};

export default useReportArticleEngagement;
