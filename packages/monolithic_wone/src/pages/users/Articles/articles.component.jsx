import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ARTICLES } from "../../../utility/graphQl/query";
import SearchBox from "../../../components/commons/search-box/search-box.component";
import { CardList } from "../../../components/commons/card-list/card-list.component";
import "./articles.styles.scss";

const Articles = (props) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filteredArticlesLength, setFilteredArticlesLength] = useState("");
  const [searchField, setSearchField] = useState("");
  const [listName, setListName] = useState("Articles");

  useQuery(ARTICLES, {
    fetchPolicy: "no-cache",
    /* variables: { id: localStorage.getItem('companyID') }, */
    onCompleted(response) {
      setArticles(response.recordingsAndArticles.articles);
      setFilteredArticles(response.recordingsAndArticles.articles);
    },
    onError(error) {
      console.log("load recordings error", error);
    },
  });

  const handleChange = (event) => {
    setSearchField(event.target.value);
    if (event.target.value.length >= 3) {
      const filteredArticleData = articles.filter((article) => {
        return (
          article.author.toLowerCase().includes(searchField.toLowerCase()) ||
          article.title.toLowerCase().includes(searchField.toLowerCase())
        );
      });

      setFilteredArticles(filteredArticleData);
      setFilteredArticlesLength(filteredArticleData);
      setListName("ArticlesSearch");
    } else {
      setFilteredArticles(articles);
      setFilteredArticlesLength("");
      setListName("Articles");
    }
  };

  return (
    <div className="tsession-container corporate-container">
      <div className="articles">
        <h1> Engage and learn</h1>
        <p>Take control of your wellbeing</p>
        <SearchBox placeholder="Search" handleChange={handleChange} />
        {!!filteredArticlesLength && (
          <p className="filtered-result">
            {filteredArticlesLength.length === 0
              ? "0 result(s) matching your search"
              : `${filteredArticlesLength.length} result(s) matching your search`}{" "}
          </p>
        )}
        <CardList articles={filteredArticles} listName={listName} />
      </div>
    </div>
  );
};

export default Articles;
