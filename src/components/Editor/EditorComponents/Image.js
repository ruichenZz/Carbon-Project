import React from 'react';
import styled from 'styled-components';
import {mediaQueries} from '../../../shared/config';

const Box = styled("div")`
  /* background-image: url(${(props) => props.url});
  background-position: center;
  background-size:cover; */
  position: relative;
  width: calc(100% - ${(props) => props.side_margin} - ${(props) => props.side_margin});
  height: auto;
  margin: auto;

  ${props => props.selected && `
    box-shadow: inset 0 0 10px #0f0;
  `}
  &:hover {
    box-shadow: ${props => props.selected ? 'inset 0 0 10px #0f0' : 'inset 0 0 10px #f2ff00'};
  }
  cursor: pointer;
`;

const Img = styled("img")`
  width: 100%;
  z-index: -1;
  position: relative;
  border-radius: 15px;
`;

const Credits = styled("div")`
  position: absolute;
  bottom: 20px;
  right: 5px;
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 14px;
  font-family: ${(props) => props.font_family};
`;

const Caption = styled("div")`
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 14px;
  font-family: ${(props) => props.font_family};
`;


export default function Image(props) {
    const { image_link, image_credits, font_family, image_caption, side_margin, credits_font_color, caption_font_color } = props.content;

    return (
      <Box side_margin = {side_margin} selected={props.selected} onClick={() => props.setIndexFromChild(props.index)}>
        <Img src={image_link} />
        
        <Credits
        color={credits_font_color}
        font_family={font_family}   
        >
        {image_credits}
        </Credits>

        <Caption
          color={caption_font_color}
          font_family={font_family}  
        >
          {image_caption}
        </Caption>
      </Box>
            
    )
}