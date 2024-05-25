import React from "react";
import {
  PageContainer,
  PageHeader,
  PageContent,
} from "apps/user/learner/components/page-container";
import "./terms.styles.scss";

const Terms = ({ children }) => {
  return (
    <PageContainer background="white">
      <PageHeader showBackButton />
      <PageContent maxWidth="lg">{children}</PageContent>
    </PageContainer>
  );
};
export default Terms;
