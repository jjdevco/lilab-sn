import React, { useState, useEffect, useContext, useRef } from "react";

import format from "date-fns/format";

import { getUserInfo } from "../api";

import { Context } from "../state";

import { Flex, Image, Text } from "rebass";
import { Eclipse } from "react-loading-io";

import Popover from "@bit/react-bootstrap.react-bootstrap.popover";
import Overlay from "@bit/react-bootstrap.react-bootstrap.overlay";
import ReactBootstrapStyle from "@bit/react-bootstrap.react-bootstrap.internal.style-links";
import { CLOSE_PROFILE } from "../state/types";

export default (props) => {
  const wrapperRef = useRef();
  const {
    state: { openProfile, profileTarget, profileId },
    dispatch,
  } = useContext(Context);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      try {
        const userData = await getUserInfo(profileId);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (profileId) fetcher();
  }, [profileId]);

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (wrapperRef.current && !wrapperRef.current.contains(evt.target))
        dispatch({ type: CLOSE_PROFILE });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <>
      <ReactBootstrapStyle />

      <Overlay
        show={openProfile}
        target={profileTarget}
        placement="bottom"
        container={this}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          {loading && (
            <Flex flex="1 1 auto" justifyContent="center" alignItems="center">
              <Eclipse color="#acb8b4" size={100} width={2} />
            </Flex>
          )}

          <div ref={wrapperRef}>
            {user && !loading && (
              <>
                <Flex flexDirection="row">
                  <Image
                    src={user.picture}
                    sx={{
                      height: 48,
                      minWidth: 48,
                      borderRadius: 9999,
                      border: "2px solid darkgray",
                      cursor: "pointer",
                    }}
                    mr={2}
                  />

                  <Flex
                    flexDirection="column"
                    sx={{ height: 48 }}
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Text fontWeight={500}>
                      {user.title.charAt(0).toUpperCase() + user.title.slice(1)}
                      . {user.firstName} {user.lastName}
                    </Text>

                    <Text
                      sx={{
                        cursor: "pointer",
                        fontWeight: 400,
                        transition: "all 100ms ease-out",
                        color: "#2687c2",
                        ":hover": {
                          color: "#1e6997",
                        },
                      }}
                    >
                      @{`${user.firstName}_${user.lastName}`}
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDirection="column" p={1}>
                  <Flex
                    flexDirection="row"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <i
                      style={{
                        color: "#1c6b65",
                      }}
                      className="material-icons-outlined"
                    >
                      email
                    </i>
                    &nbsp;
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Flex>

                  <Flex
                    flexDirection="row"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <i
                      style={{
                        color: "#1c6b65",
                      }}
                      className="material-icons-outlined"
                    >
                      people
                    </i>
                    &nbsp;
                    {user.gender}
                  </Flex>

                  <Flex
                    flexDirection="row"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <i
                      style={{
                        color: "#1c6b65",
                      }}
                      className="material-icons-outlined"
                    >
                      local_phone
                    </i>
                    &nbsp;
                    {user.phone}
                  </Flex>

                  <Flex
                    flexDirection="row"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <i
                      style={{
                        color: "#1c6b65",
                      }}
                      className="material-icons-outlined"
                    >
                      location_on
                    </i>
                    &nbsp;
                    {user.location.street}, {user.location.city}.
                  </Flex>

                  <Flex
                    flexDirection="row"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <i
                      style={{
                        color: "#1c6b65",
                      }}
                      className="material-icons-outlined"
                    >
                      emoji_flags
                    </i>
                    &nbsp;
                    {user.location.state} - {user.location.country}.
                  </Flex>

                  <Flex flexDirection="row" alignItems="center">
                    <Text fontWeight={500}>Register on:&nbsp;</Text>
                    {format(
                      new Date(user.registerDate).getTime(),
                      "MMM io, yyyy"
                    )}
                    .
                  </Flex>
                </Flex>
              </>
            )}
          </div>
        </Popover>
      </Overlay>
    </>
  );
};
