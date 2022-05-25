import React from 'react';
import styled from 'styled-components';
import {mediaQueries, colors} from '../../../shared/config';

const Box = styled.div`
  ${props => props.selected && `
    box-shadow: inset 0 0 10px #0f0;
  `}
  &:hover {
    box-shadow: ${props => props.selected ? 'inset 0 0 10px #0f0' : 'inset 0 0 10px #f2ff00'};
  }
  cursor: pointer;
`;

const Text = styled.div`
  color: ${props => props.text_color};
  font-family: ${props => props.text};
  font-size: ${props => props.text_size};
  line-height : ${props => props.spacing};
  margin: 0 ${props => props.margins};
  padding-bottom: 20px;
  text-align: left;
`
export default function Paragraph(props) {
   const {paragraph_content, font_family, font_size, font_color, line_spacing, margin} = props.content
   return (
      <Box selected={props.selected} 
            onClick={() => props.setIndexFromChild(props.index)}>
         <Text 
            text = {font_family}
            text_size = {font_size}
            text_color = {font_color}
            spacing = {line_spacing}
            margins = {margin} >
               {paragraph_content}
         </Text>
      </Box>
   )
}

