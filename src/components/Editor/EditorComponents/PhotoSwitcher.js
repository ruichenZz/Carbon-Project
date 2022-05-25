import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {mediaQueries} from '../../../shared/config';

import left from "../images/left.svg";
import right from "../images/right.svg"

/**
 * Component declaration
 */
export default function PhotoSwitcher(props) {
  const { font_family, 
      font_size, 
      font_color, 
      photo_background_color, 
      text_background_color, 
      images } = props.content;

  const NUM_IMAGES = images.length;

  const  [ selected, setSelected ] = useState(0);

  function updateState(val) {
      if (selected === 0 && val === -1) {
          setSelected(NUM_IMAGES - 1);
      }
      else if (selected === NUM_IMAGES - 1 && val === 1) {
          setSelected(0);
      } else {
          setSelected(selected + val);
      }
  }
  
  return(
    <Container>
      {/* <Img  
          selected={selected}
          src={images[selected].image_link}
      /> */}
      <ImgContainer
          backgroundColor={photo_background_color}>
          <Img  
              selected={selected}
              src={images[selected].image_link}
          />
      </ImgContainer>
      <Info>
          <ButtonContainer>
              <SwitchButton 
                  src={left}
                  onClick={() => updateState(-1)}/>
              <SwitchButton 
                  src={right} 
                  onClick={() => updateState(1)}
              />
          </ButtonContainer>   
          <Text
              font_color={font_color} 
              font_family={font_family}
              font_size={font_size}
              backgroundColor={text_background_color}>
                  {selected !== 0 && <Header>{images[selected].image_header}</Header>}
                  {images[selected].image_text}
          </Text>
                    
      </Info>
    </Container>
  )
}


/**
 * Styled components declaration
 */
const Container = styled.div`
  width: 100%;
`
const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.photo_background_color};
  border-radius: 25px 25px 0px 0px;
`

const Img = styled.img`
  height: auto;
  max-width: 100%;
`

const Info = styled.div`
  background: #FFFFFF;
  border-radius: 0px 0px 25px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 56px 44px;
`

const SwitchButton = styled.img`
  cursor: pointer;
  height: 50%;
  width: 50%;
  padding: 0 0.5em;
`

const Text = styled.div`
  width: calc(100% - 150px);
  font-size: ${(props) => props.font_size};
  font-family: ${(props) => props.font_family};
  color: ${(props) => props.font_color};
  margin: 32px 24px;
  text-align: center;
  ${props => props.isMain && `
      display: flex;
      align-items: center;
      justify-content: center;
  `}
`

const Header = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`

