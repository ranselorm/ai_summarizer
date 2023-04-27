import React, { useState, useEffect } from "react";
import { copy, linkIcon, tick, loader } from "../assets";
import { AiOutlineEnter } from "react-icons/ai";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const options = {
    method: "GET",
    url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
    params: {
      url: article.url,
      length: "3",
    },
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "2d8686a441msh21c52df64215f8ap1df6a2jsn66e6d9f7c3f6",
      "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setArticles(articlesFromLocalStorage);
      setIsLoading(false);
    }
  }, []);

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const response = await axios.request(options);
      if (response?.data.summary) {
        const newArticle = { url: article.url, summary: response.data.summary };
        const updatedAllArticles = [newArticle, ...articles];
        setArticle(newArticle);
        setArticles(updatedAllArticles);
        setIsLoading(false);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
      console.log(article);
      console.log(articles);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col gap-2 w-full">
        <form
          className="relative flex justify center items-center"
          onSubmit={submitHandler}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Paste your article link"
            className="url_input peer"
            value={article.url}
            required
            onChange={(e) => {
              setArticle({ url: e.target.value });
            }}
          />
          <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            <AiOutlineEnter />
          </button>
        </form>
        {/* Browsr history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {articles.map((item, index) => (
            <div
              key={`link ${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-sm truncated font-medium text-blue-700">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display results */}
      <div className="flex justify-center items-center my-10 max-w-full">
        {isLoading ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Your <span className="blue_gradient">Summary</span>
              </h2>

              <div className="summary_box">
                <p className="font-inter text-sm font-medium text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
