import React, { useState, useEffect } from "react";

import { getPosts, getPostsByTag } from "../api";

import InfiniteScroll from "react-infinite-scroll-component";
import { Eclipse, DualRing } from "react-loading-io";
import { Flex } from "rebass";

import PostCard from "./PostCard";

export default ({ match, ...props }) => {
  const {
    params: { tag },
  } = match;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(false);

  const setAllData = (data, page, limit, total) => {
    setPosts((posts) => posts.concat(data));
    setCurrentPage(page);
    setTotalPages(Math.ceil(total / limit));
  };

  const fetchMorePosts = async () => {
    try {
      const { data, page, limit, total } = tag
        ? await getPostsByTag(currentPage + 1, tag)
        : await getPosts(currentPage + 1);
      setAllData(data, page, limit, total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      setPosts([]);
      try {
        const { data, page, limit, total } = tag
          ? await getPostsByTag(0, tag)
          : await getPosts(0);
        setAllData(data, page, limit, total);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetcher();
  }, [tag]);

  return (
    <Flex
      sx={{
        maxWidth: ["100%", "600px"],
        overflowY: "hidden",
      }}
      flex="1 1 auto"
      flexDirection="column"
      p={2}
      mx="auto"
      bg="transparent"
    >
      {loading ? (
        <Flex flex="1 1 auto" justifyContent="center" alignItems="center">
          <Eclipse color="#acb8b4" size={120} width={4} />
        </Flex>
      ) : (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={currentPage < totalPages}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          loader={
            <Flex justifyContent="center" alignItems="center">
              <DualRing color="#acb8b4" size={64} width={2} />
            </Flex>
          }
        >
          {posts.map((post, index) => (
            <PostCard key={post.id} data={post} height="300px" />
          ))}
        </InfiniteScroll>
      )}
    </Flex>
  );
};
