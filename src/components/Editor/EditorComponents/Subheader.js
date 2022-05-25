import React from "react";
import styled from "styled-components";
import { mediaQueries } from "../../../shared/config";

const Container = styled("div")`
  width: 50vw;
  max-width: 800px;
  box-sizing: border-box;
  text-align: left;
  font-weight: 400;

  margin-left: ${(props) => props.margin};
  ${mediaQueries.notTablet} {
    padding: 15px 30px;
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

const Title = styled("div")`
  line-height: ${(props) => props.line_spacing};
  color: ${(props) => props.color};

  font-size: ${(props) => props.font_size};
  font-family: ${(props) => props.font_family};
`;

export default function Subheader(props) {
  const {
    font_family,
    font_size,
    font_color,
    line_spacing,
    content,
    side_margin,
  } = props.content;

  return (
    <Container
      margin={side_margin}
      selected={props.selected}
      onClick={() => props.setIndexFromChild(props.index)}
    >
      <Title
        line_spacing={line_spacing}
        font_family={font_family}
        font_size={font_size}
        color={font_color}
      >
        {content}
      </Title>
    </Container>
  );
}
