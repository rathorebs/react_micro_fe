import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { USER_FAVORITES_ARTICLES } from "../../../utility/graphQl/query";
import SearchBox from "../../../components/commons/search-box/search-box.component";
import { CardList } from "../../../components/commons/card-list/card-list.component";
import "./favourites.styles.scss";

const FavouritesArticles = (props) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filteredArticlesLength, setFilteredArticlesLength] = useState("");
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("FavouritesArticles");

  const [getFavouriteArticle] = useLazyQuery(USER_FAVORITES_ARTICLES, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      setArticles(response.userFavourites.articles);
      setFilteredArticles(response.userFavourites.articles);
      setLoading(false);
    },
    onError(error) {
      console.log("load user_favorites_articles error", error);
      setLoading(false);
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
      setListName("FavouritesArticlesSearch");
    } else {
      setFilteredArticles(articles);
      setFilteredArticlesLength("");
      setListName("FavouritesArticles");
    }
  };
  useEffect(() => {
    setLoading(true);
    getFavouriteArticle();
  }, [getFavouriteArticle]);
  return (
    <div className="favourites-body-container">
      <SearchBox placeholder="Search" handleChange={handleChange} />
      {loading ? (
        ""
      ) : (
        <>
          {!!filteredArticlesLength && (
            <p className="filtered-result">
              {filteredArticlesLength.length} result(s) matching your search
            </p>
          )}
          {filteredArticles.length === 0 ? (
            !filteredArticlesLength && (
              <p>
                You have no favourite articles yet. Have a look at our articles
                to add your first one!
              </p>
            )
          ) : (
            <CardList articles={filteredArticles} listName={listName} />
          )}
        </>
      )}
    </div>
  );
};

export default FavouritesArticles;
