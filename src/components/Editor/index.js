import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { colors } from "../../shared/config";
import styled from "styled-components";
import axios from "axios";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { components, setContentInitialValues } from "../../shared/components";
import { dummy_content } from "./DummyContent";

// components import
import Sidebar from "./Sidebar/Sidebar";

const Editor = (props) => {
  const [contents, setContents] = useState(dummy_content);
  const [isOpen, setOpen] = useState(true);
  const [selectedIndex, setIndex] = useState(0);
  const { id } = useParams();

  const setIndexFromChild = (index) => {
    setIndex(index);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/projects/${id}`)
      .then((res) => {
        setContents((prevContent) => [...prevContent, ...res.data.content]);
      })
      .catch((err) => alert(err.message));
    console.log(contents[selectedIndex]);
  }, []);

  /**
   * Handles adding component to the express backend.
   * @param {*} componentLabel the label of the component
   */
  const appendComponentToContent = (componentLabel) => {
    for (const key in components) {
      if (components[key].label === componentLabel) {
        let newContent = [
          ...contents,
          {
            type: components[key].id,
            content: setContentInitialValues(components[key].attributes),
          },
        ];
        axios
          .put(`http://localhost:3000/api/projects/${id}`, newContent)
          .then((res) => setContents(newContent))
          .catch((err) => alert(err.message));
      }
    }
  };

  return (
    <Wrapper>
      {/* TODO : connect the menu button to the ref on the sidebar so that
			the positioning is consistent */}
      <MenuButton
        isOpen={isOpen}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <IconWrapper>
          {isOpen ? (
            <CloseIcon style={{ color: colors.white }} />
          ) : (
            <MenuIcon style={{ color: colors.white }} />
          )}
        </IconWrapper>
      </MenuButton>
      <Sidebar
        appendComponentToContent={appendComponentToContent}
        isOpen={isOpen}
        component={contents[selectedIndex].type}
      />
      <Container isContentAvailable={contents.length} isOpen={isOpen}>
        {contents.length === 0 ? (
          <NoComponentMessage style={{ color: "white" }}>
            There are currently no components. Start adding your components on
            the sidebar.
          </NoComponentMessage>
        ) : (
          contents.map((block, index) => {
            return components[block.type].component(
              block.content,
              selectedIndex === index,
              index,
              setIndexFromChild
            );
          })
        )}
      </Container>
    </Wrapper>
  );
};

// Styled components declaration

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  transition: width 0.5s ease;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  text-align: left;
  overflow-y: scroll;
  background: ${(props) => (props.isContentAvailable ? "none" : "#333333")};
  display: ${(props) => (props.isContentAvailable ? "block" : "flex")};
  align-items: center;
  justify-content: center;
`;

const NoComponentMessage = styled.h1`
  color: white;
  text-align: center;
  padding: 2em;
`;

const MenuButton = styled.div`
  position: absolute;
  left: ${(props) => (props.isOpen ? "249px" : "15px")};
  top: 15px;
  transition: left 0.5s;
  background: ${colors.gray3};
  border-radius: 7px;
  z-index: 999;
  cursor: pointer;
  &:hover {
    background: ${colors.gray2};
  }
  display: flex;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`;
export default withRouter(Editor);
