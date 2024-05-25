import React from "react";
import { CardNew } from "../card-new/card-new.component";

export const CardList = (props) => {
  return (
    <div className="row">
      {props &&
        props.recordings &&
        props.recordings.map((recording, index) => (
          <CardNew
            key={recording.id}
            recording={recording}
            listName={props.listName}
            listPosition={index + 1}
          />
        ))}
      {props &&
        props.articles &&
        props.articles.map((article, index) => (
          <CardNew
            key={article.id}
            article={article}
            listName={props.listName}
            listPosition={index + 1}
          />
        ))}
    </div>
  );
};
