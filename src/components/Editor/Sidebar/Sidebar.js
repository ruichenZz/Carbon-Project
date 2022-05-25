import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../../shared/config";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import axios from "axios";

import downIcon from "../images/move up button.svg"; // Naming issue here, ignore it
import upIcon from "../images/move down button.svg";

import { components } from "../../../shared/components";
import { useEffect } from "react";

// Component declaration

const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
  },
};

export default function Sidebar(props) {
  const { component } = props;
  const { id } = useParams();
  const [addComponentsModalOpen, setAddComponentsModalOpen] = useState(false);
  const { isOpen, appendComponentToContent } = props;

  const componentsLabelToArray = () => {
    let labels = [];
    for (const key in components) {
      labels.push(components[key].label);
    }
    return labels;
  };

  const updateProject = () => {
    axios.put(`http://localhost:3000/api/projects/${id}`, {});
  };

  return (
    <Container isOpen={isOpen}>
      <Title>Carbon</Title>

      <BackButton> <Link to="/" style={{textDecoration: 'none', color:'white'}}>Return to Main Dashboard</Link> </BackButton>

      <AddComponentsButton onClick={() => setAddComponentsModalOpen(true)}>
        + Add Components
      </AddComponentsButton>

      {/* This modal handles adding components */}
      <Modal
        isOpen={addComponentsModalOpen}
        onRequestClose={() => setAddComponentsModalOpen(false)}
        style={modalCustomStyles}
        ariaHideApp={false}
      >
        {/* TODO : Change the cancel button into the close button like the sidebar */}
        <button onClick={() => setAddComponentsModalOpen(false)}>Cancel</button>
        <h3>Select from the following components:</h3>
        {/* TODO : change color from black to gray*/}
        <ComponentsSelectContainer>
          {componentsLabelToArray().map((label, index) => (
            <ComponentsSelection
              key={index}
              onClick={() => {
                appendComponentToContent(label);
                setAddComponentsModalOpen(false);
              }}
            >
              + {label}
            </ComponentsSelection>
          ))}
        </ComponentsSelectContainer>
      </Modal>

      {component && (
        <>
          <Header>
            <PageName>{components[component].label}</PageName>
            <div style={{ display: "flex", gap: "15px" }}>
              <img src={upIcon} alt="up"></img>
              <img src={downIcon} alt="down"></img>
            </div>
          </Header>

          <FunctionContainer>
            {components[component].attributes.map((e) => (
              <div key={e.id}>
                <div>{e.label}</div>
                <SelectBox placeholder="random place holder"></SelectBox>
              </div>
            ))}
          </FunctionContainer>
          <ButtonContainer>
            <DeleteButton>Delete</DeleteButton>
            <SaveButton>
              <div onClick={updateProject}>Save</div>
            </SaveButton>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

// Styled components Declaration

const Container = styled.div`
  background: ${colors.gray4};
  position: relative;
  width: ${(props) => (props.isOpen ? "270px;" : "0px")};
  min-width: ${(props) => (props.isOpen ? "270px;" : "0px")};
  left: ${(props) => (props.isOpen ? "0px;" : "-300px")};
  padding: ${(props) => (props.isOpen ? "15px" : "15px 0")};
  transition: left 0.25s ease, width 0.25s ease;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  color: ${colors.white};
`;

const Header = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
`;

const AddComponentsButton = styled.button`
  width: 100%;
  text-align: center;
  font-size: 1em;
  margin: 2em 0 1.5em 0;
`;

const ComponentsSelection = styled(AddComponentsButton)`
  margin: 0.5em 0;
`;

const ComponentsSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PageName = styled.div`
  text-transform: uppercase;
  color: ${colors.white};
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  color: #ffffff;
`;

const FunctionContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 25px;
  color: ${colors.white};
  gap: 15px;
`;

const SelectBox = styled.input`
  height: 25px;
  background: #ffffff;
  border-radius: 7px;
  color: black;
  padding-left: 3px;
  width: 95%;
  &::placeholder {
    color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  transform: translateY(200px);
  margin-right: 50px;
`;

const DeleteButton = styled.button`
  width: 100px;
  height: 44px;
  background: ${colors.red1};
  border-radius: 7px;
  color: ${colors.white};
  border: 0;
  outline: none;
  font-size: 20px;
  line-height: 30px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const SaveButton = styled(DeleteButton)`
  background: ${colors.gray2};
`;

const BackButton = styled.button`
  height: 40px;
  margin-top: 10%;
  font-size: 15px;
  background: ${colors.red1};
`;
