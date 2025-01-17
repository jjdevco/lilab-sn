import axios from "axios";

const instanceApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "app-id": process.env.REACT_APP_API_KEY,
    "Access-Control-Allow-Origin": "*",
  },
});

const instanceScraper = axios.create({
  baseURL: process.env.REACT_APP_SCRAPER_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const getPosts = (page) =>
  instanceApi
    .get("/post", {
      params: {
        page,
      },
    })
    .then(({ data }) => data);

export const getPostsByTag = (page, tag) =>
  instanceApi
    .get(`/tag/${tag}/post`, {
      params: {
        page,
      },
    })
    .then(({ data }) => data);

export const getPostComments = (page, post) =>
  instanceApi
    .get(`/post/${post}/comment/`, {
      params: {
        page,
      },
    })
    .then(({ data }) => data);

export const getUserInfo = (user) =>
  instanceApi.get(`/user/${user}`).then(({ data }) => data);

export const getLinkInfo = (url) =>
  instanceScraper.post("", {
    url,
  });
