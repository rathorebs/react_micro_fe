import React from "react";
import { useQuery } from "@apollo/client";

import appInfo from "utility/app-info";
import { LEARNER_SCREEN_PROFILE } from "utility/graphQl/query";

import ProfileHero from "./components/profile-hero";
import ProfileContentLists from "./components/profile-content-lists";
import {
  PageContainer,
  PageHeader,
  PageContent,
  PageLoading,
  PageError,
} from "apps/user/learner/components/page-container";

const ProfilePage = () => {
  const { loading, error, data } = useQuery(LEARNER_SCREEN_PROFILE, {
    fetchPolicy: "cache-and-network",
    onError(error) {
      console.error("Error while fetching profile page", error);
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
          <PageError />
        </PageContent>
      </PageContainer>
    );
  }

  const {
    fullName,
    photoUrl,
    screens: {
      profile: { journey, favourites, contentLists },
    },
  } = data.learner;

  return (
    <PageContainer>
      <PageContent maxWidth="lg">
        <ProfileHero
          fullName={fullName}
          photoUrl={photoUrl}
          journeyData={journey}
          favourites={favourites}
        />
        <ProfileContentLists contentLists={contentLists} />
      </PageContent>
    </PageContainer>
  );
};

export default ProfilePage;
