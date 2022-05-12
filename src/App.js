import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  var postsPerPage = 4;

  // Use useState to hold the posts being rendered to the screen
  // Create the array of posts to map to render

  const [data, setData] = useState([...Array(postsPerPage).keys()]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setData(res.data));
  }, []);

  var postNumber = postsPerPage;

  function handleScroll() {
    var isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom) {
      // Load next posts
      postNumber += postsPerPage;

      setData([...Array(postNumber).keys()]);
    }
  }

  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <div
        className="card"
        style={{ display: "grid", gridTemplateColumns: "repeat(2,40%)" }}
      >
        {data.map((el) => {
          return (
            <div>
              <img width="200px" src={el.image} alt="img" />
            </div>
          );
        })}
      </div>
    </>
  );
}
