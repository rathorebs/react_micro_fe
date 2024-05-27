import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  RECORDINGS,
  LEARNER_SCREEN_RECORDINGS,
} from "../../../utility/graphQl/query";
import appInfo from "utility/app-info";
import SearchBox from "../../../components/commons/search-box/search-box.component";
import { CardList } from "../../../components/commons/card-list/card-list.component";
import Recordingss from "../../../apps/user/learner/pages/recordings.tsx";
import "./recordings.styles.scss";

const Recordings = (props) => {
  const [recordings, setRecordings] = useState([]);
  const [learnerRecordings, setLearnerRecordings] = useState([]);
  const [filteredRecordings, setFilteredRecordings] = useState([]);
  const [filteredRecordingsLength, setFilteredRecordingsLength] = useState("");
  const [searchField, setSearchField] = useState("");
  const [listName, setListName] = useState("Recordings");
  const [loading, setLoading] = useState(false);
  useQuery(RECORDINGS, {
    fetchPolicy: "no-cache",
    /* variables: { id: localStorage.getItem('companyID') }, */
    onCompleted(responce) {
      setRecordings(responce.recordingsAndArticles.recordings);
      setFilteredRecordings(responce.recordingsAndArticles.recordings);
    },
    onError(error) {
      console.log("load recordings error", error);
    },
  });

  const [learnerScreenRecordings] = useLazyQuery(LEARNER_SCREEN_RECORDINGS, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      setLearnerRecordings(response.learner.screens.recordings);
      setLoading(false);
    },
    onError(error) {
      console.log("learnerScreenRecordings error", error);
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
      setListName("RecordingsSearch");
    } else {
      setFilteredRecordings(recordings);
      setFilteredRecordingsLength("");
      setListName("Recordings");
    }
  };
  useEffect(() => {
    setLoading(true);
    learnerScreenRecordings({
      variables: {
        appInfo,
      },
    });
  }, [learnerScreenRecordings]);
  return (
    <div className="tsession-container corporate-container">
      <div className="recordings">
        <h1> Engage and learn</h1>
        <p>Take control of your wellbeing</p>
        <SearchBox placeholder="Search" handleChange={handleChange} />
        <Recordingss learnerRecordings={learnerRecordings} loading={loading} />
        {!!filteredRecordingsLength && (
          <p className="filtered-result">
            {filteredRecordingsLength.length === 0
              ? "0 result(s) matching your search"
              : `${filteredRecordingsLength.length} result(s) matching your search`}{" "}
          </p>
        )}
        <CardList recordings={filteredRecordings} listName={listName} />
      </div>
    </div>
  );
};
export default Recordings;
