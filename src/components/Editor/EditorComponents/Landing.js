import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../../../shared/config";

const Box = styled("div")`
  height: 50vh;
  object-fit: cover;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  position: relative;
  ${mediaQueries.notTablet} {
    height: 100vh;
  }
  ${(props) =>
    props.selected &&
    `
    box-shadow: inset 0 0 10px #0f0;
  `}
  &:hover {
    box-shadow: ${(props) =>
      props.selected ? "inset 0 0 10px #0f0" : "inset 0 0 10px #f2ff00"};
  }
  cursor: pointer;
`;

const Credits = styled("div")`
  position: absolute;
  bottom: 30px;
  right: 15px;
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: ${(props) => props.font_size};
  font-family: ${(props) => props.font_family};
`;

export default function Landing(props) {
  const {
    image_link,
    image_credits,
    credits_font_family,
    credits_font_size,
    credits_font_color,
  } = props.content;

  return (
    // TODO : Both the hovering container and image container should be separated.
    <Box
      url={image_link}
      selected={props.selected}
      onClick={() => props.setIndexFromChild(props.index)}
    >
      <Credits
        color={credits_font_color}
        font_family={credits_font_family}
        font_size={credits_font_size}
      >
        {image_credits}
      </Credits>
    </Box>
  );
}
