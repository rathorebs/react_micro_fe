import React, { useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { usePatternBackground } from "providers/pattern-background";

import ArrowLeftBlackIcon from "Assets/iconChevron.svg";
import ArrowLeftWhiteIcon from "Assets/iconChevronLeft.svg";

import styles from "apps/user/learner/styles/common.module.scss";

export const PageLoading = () => {
  return (
    <div className={styles["common-loading"]}>
      <div className={clsx("spinner-border", styles["spinner"])} />
    </div>
  );
};

interface PageErrorProps {
  children?: React.ReactNode;
  className?: string;
}

export const PageError = ({ children, className }: PageErrorProps) => {
  return (
    <div className={clsx(styles["common-error"], className && className)}>
      {children ? children : "Something went wrong. Please try again."}
    </div>
  );
};

interface PageContentProps {
  maxWidth: "sm" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const PageContent = ({
  maxWidth,
  children,
  className,
}: PageContentProps) => {
  let innerClassName = styles["common-content"];
  if (maxWidth === "sm") {
    innerClassName = clsx(innerClassName, styles["common-content-sm"]);
  } else if (maxWidth === "lg") {
    innerClassName = clsx(innerClassName, styles["common-content-lg"]);
  }

  return <div className={clsx(innerClassName, className)}>{children}</div>;
};

interface PageBaseHeaderProps {
  transparent?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const PageBaseHeader = ({
  transparent,
  children,
  className,
}: PageBaseHeaderProps) => {
  return (
    <div
      className={clsx(
        styles["common-header"],
        !transparent && styles["common-header-filled"],
        className
      )}
    >
      <div className={styles["common-title-div"]}>{children}</div>
    </div>
  );
};

interface PageHeaderProps extends PageBaseHeaderProps {
  title?: string;
  backTo?: string;
  showBackButton?: boolean;
  id?: string;
}

export const PageHeader = ({
  title,
  transparent,
  showBackButton,
  backTo,
  children,
  className,
  id,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  const Icon = transparent ? ArrowLeftWhiteIcon : ArrowLeftBlackIcon;

  return (
    <PageBaseHeader transparent={transparent} className={className}>
      {showBackButton && (
        <span
          onClick={handleClickBack}
          className={styles["back-icon-container"]}
        >
          <img
            className={styles["back-icon"]}
            src={Icon}
            alt="Arrow pointing left"
          />
        </span>
      )}
      {title && <h1 className={styles["common-title"]}>{title}</h1>}
      {children && (
        <span className={styles["common-children"]}>{children}</span>
      )}
    </PageBaseHeader>
  );
};

interface PageContainerProps {
  children: React.ReactNode;
  background?: "white" | "transparent";
  className?: string;
}

export const PageContainer = ({
  background = "transparent",
  children,
  className,
}: PageContainerProps) => {
  const { onChangeBackgroundColor } = usePatternBackground();

  useEffect(
    () => onChangeBackgroundColor(background),
    [onChangeBackgroundColor, background]
  );

  let innerClassName = styles["common-page"];

  if (background === "white") {
    innerClassName = clsx(innerClassName, styles["common-page-white"]);
  }

  return (
    <div className={clsx("corporate-container", className)}>
      <div className={innerClassName}>{children}</div>
    </div>
  );
};

export default PageContainer;
