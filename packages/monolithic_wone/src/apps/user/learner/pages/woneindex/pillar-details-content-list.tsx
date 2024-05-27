import React from "react";

import ContentListPreview from "apps/user/learner/components/content-list/preview";

import { LearnerContentList } from "apps/user/learner/api/types";

interface PillarDetailsContentListProps {
  contentLists: LearnerContentList[];
}

const PillarDetailsContentList = ({
  contentLists,
}: PillarDetailsContentListProps) => {
  return (
    <>
      {contentLists.map((list) => (
        <ContentListPreview featured key={list.id} data={list} limit={3} />
      ))}
    </>
  );
};

export default PillarDetailsContentList;
