import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";

import {
  LEARNER_FAVOURITE,
  LEARNER_UN_FAVOURITE,
} from "utility/graphQl/mutation";

import appInfo from "utility/app-info";

interface FavourableItem {
  id: string;
  isFavourite: boolean;
  __typename: "LearnerArticle" | "LearnerRecording" | "LearnerPractitioner";
}

const useFavorite = () => {
  const [learnerFavourite, { loading: isFavouriteLoading }] =
    useMutation(LEARNER_FAVOURITE);
  const [learnerUnFavourite, { loading: isUnFavouriteLoading }] =
    useMutation(LEARNER_UN_FAVOURITE);

  const handleFavourite = (item: FavourableItem) => {
    const { id, isFavourite, __typename } = item;

    if (isFavourite) {
      learnerUnFavourite({
        variables: {
          id,
          typename: __typename,
          appInfo,
        },
      }).catch((error) => {
        toast.error(
          `Sorry! We couldn't remove from favourites the moment. Please try again.`
        );
        console.error("Error while trying to remove from favourites", error);
      });
    } else {
      learnerFavourite({
        variables: {
          id,
          typename: __typename,
          appInfo,
        },
      }).catch((error) => {
        toast.error(
          `Sorry! We couldn't add to favourites at the moment. Please try again.`
        );
        console.error("Error while trying to add to favourites", error);
      });
    }
  };

  return {
    onFavourite: handleFavourite,
    loading: isFavouriteLoading || isUnFavouriteLoading,
  };
};

export default useFavorite;
