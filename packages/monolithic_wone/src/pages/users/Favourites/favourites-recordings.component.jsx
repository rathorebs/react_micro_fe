import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { USER_FAVORITES_RECORDINGS } from "../../../utility/graphQl/query";
import SearchBox from "../../../components/commons/search-box/search-box.component";
import { CardList } from "../../../components/commons/card-list/card-list.component";
import "./favourites.styles.scss";

const FavouritesRecordings = (props) => {
  const [recordings, setRecordings] = useState([]);
  const [filteredRecordings, setFilteredRecordings] = useState([]);
  const [filteredRecordingsLength, setFilteredRecordingsLength] = useState("");
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("FavouritesRecordings");

  const [getFavouriteRecording] = useLazyQuery(USER_FAVORITES_RECORDINGS, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      setRecordings(response.userFavourites.recordings);
      setFilteredRecordings(response.userFavourites.recordings);
      setLoading(false);
    },
    onError(error) {
      console.log("load user_favorites_recordings error", error);
      setLoading(false);
    },
  });

  const handleChange = (event) => {
    setSearchField(event.target.value);
    if (event.target.value.length >= 3) {
      const filteredData = recordings.filter((recording) => {
        return (
          recording.teacher.userdetailObj.userObj.firstName
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          recording.groupSession.name
            .toLowerCase()
            .includes(searchField.toLowerCase())
        );
      });

      setFilteredRecordings(filteredData);
      setFilteredRecordingsLength(filteredData);
      setListName("FavouritesRecordingsSearch");
    } else {
      setFilteredRecordings(recordings);
      setFilteredRecordingsLength("");
      setListName("FavouritesRecordings");
    }
  };

  useEffect(() => {
    setLoading(true);
    getFavouriteRecording();
  }, [getFavouriteRecording]);

  return (
    <div className="favourites-body-container">
      <SearchBox placeholder="Search" handleChange={handleChange} />
      {loading ? (
        ""
      ) : (
        <>
          {!!filteredRecordingsLength && (
            <p className="filtered-result">
              {filteredRecordingsLength.length} result(s) matching your search
            </p>
          )}

          {filteredRecordings.length === 0 ? (
            !filteredRecordingsLength && (
              <p className="filtered-result">
                You have no favourite recordings yet. Have a look at our
                recordings to add your first one!
              </p>
            )
          ) : (
            <CardList recordings={filteredRecordings} listName={listName} />
          )}
        </>
      )}
    </div>
  );
};

export default FavouritesRecordings;
