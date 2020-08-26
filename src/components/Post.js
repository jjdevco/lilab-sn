import React, { useState, useEffect, useContext } from "react";

import { getPostComments } from "../api";

import { Context } from "../state";
import { CLOSE_POST_MODAL } from "../state/types";

import PostCard from "./PostCard";
import Comment from "./Comment";

import InfiniteScroll from "react-infinite-scroll-component";
import { Eclipse, DualRing } from "react-loading-io";
import Modal from "@bit/react-bootstrap.react-bootstrap.modal";
import ReactBootstrapStyle from "@bit/react-bootstrap.react-bootstrap.internal.style-links";
import { Flex, Box, Card, Heading } from "rebass";

export default (props) => {
  const {
    state: { open, post },
    dispatch,
  } = useContext(Context);

  const id = post ? post.id : null;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(false);

  const handleClose = () => dispatch({ type: CLOSE_POST_MODAL });

  const setAllData = (data, page, limit, total) => {
    setComments((posts) => posts.concat(data));
    setCurrentPage(page);
    setTotalPages(Math.ceil(total / limit));
  };

  const fetchMoreComments = async () => {
    try {
      const { data, page, limit, total } = await getPostComments(
        currentPage + 1,
        id
      );
      setAllData(data, page, limit, total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      setComments([]);
      setLoading(true);
      try {
        const { data, page, limit, total } = await getPostComments(0, id);
        setAllData(data, page, limit, total);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetcher();
  }, [id]);

  return (
    <>
      <ReactBootstrapStyle />
      <Modal dialogClassName="dialog" show={open} onHide={handleClose}>
        <Flex flexDirection="column">
          {open && <PostCard data={post} height="200px" comments={false} />}
          <Card
            sx={{
              borderRadius: 10,
            }}
            p={3}
            mx={10}
          >
            {loading && (
              <Flex flex="1 1 auto" justifyContent="center" alignItems="center">
                <Eclipse color="#acb8b4" size={100} width={2} />
              </Flex>
            )}

            {open && !loading && comments.length > 0 && (
              <InfiniteScroll
                style={{ overflow: "hidden" }}
                dataLength={comments.length}
                next={fetchMoreComments}
                hasMore={currentPage < totalPages}
                loader={
                  <Flex justifyContent="center" alignItems="center">
                    <DualRing color="#acb8b4" size={64} width={2} />
                  </Flex>
                }
              >
                {comments.map((comment, index) => (
                  <>
                    <Comment key={comment.id} data={comment} />

                    {index + 1 < comments.length && <Divider />}
                  </>
                ))}
              </InfiniteScroll>
            )}

            {open && !loading && comments.length === 0 && (
              <Heading color="darkgray" textAlign="center">
                No Comments
              </Heading>
            )}
          </Card>
        </Flex>
      </Modal>
    </>
  );
};

const Divider = () => (
  <Box
    sx={{
      borderBottom: "1px solid lightgray",
    }}
    mx={2}
    my={3}
  ></Box>
);
