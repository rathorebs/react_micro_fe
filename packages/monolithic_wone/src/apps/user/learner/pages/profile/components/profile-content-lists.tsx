import React from "react";

import ContentListPreview from "apps/user/learner/components/content-list/preview";

import { LearnerContentList } from "apps/user/learner/api/types";

interface ProfileContentListsProps {
  contentLists?: LearnerContentList[];
}

const ProfileContentLists = ({ contentLists }: ProfileContentListsProps) => {
  return (
    <>
      {contentLists &&
        contentLists.map((list) => (
          <ContentListPreview
            seeMore
            featured
            key={list.id}
            data={list}
            limit={3}
          />
        ))}
    </>
  );
};

export default ProfileContentLists;
