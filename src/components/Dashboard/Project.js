import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import styled from 'styled-components'
import Modal from 'react-modal'
import {mediaQueries} from '../../shared/config'

import axios from "axios"

/**
 * Component Declaration
 */
export default function Project(props) {
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const history = useHistory();

  const modalCustomStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
  };

  const {data} = props;

  const handleDeleteProject = (id) => {
      axios.delete(`http://localhost:3000/api/projects/${id}`)
          .then(res => {
              alert(res.data)
              props.handleUpdateProject()
              setDeleteProjectModalOpen(false)
          })
          .catch(err => alert(err.message))
  }

  return (
      <ProjectContainer>
          <button onClick={() => setDeleteProjectModalOpen(true)}>Delete</button>
          <button onClick={() => history.push(`/edit/${data["_id"]}`)}>Edit</button>
          <Modal
              isOpen={deleteProjectModalOpen}
              onRequestClose={() => setDeleteProjectModalOpen(false)}
              ariaHideApp = {false}
              style={modalCustomStyles}
          >
              <p>Are you sure you want to delete this project?</p>
              <button onClick={() => setDeleteProjectModalOpen(false)}>Cancel</button>
              <button onClick={() => handleDeleteProject(data["_id"])}>Delete</button>
          </Modal>
          <TestPreview>
              <h1>Preview</h1>
          </TestPreview>
          <Description>
              <h3>{data.name}</h3>
              <h3>Status: {data.status}</h3>
          </Description>
      </ProjectContainer>
  )
}

/**
 * Styled components declaration
 */
 const ProjectContainer = styled.div`
    width: 80%;
    margin: auto;
    ${mediaQueries.tablet} {
        width: 90%;
    }
    ${mediaQueries.mobile} {
        width: 80%;
    }
`

const TestPreview = styled.div`
    height: 400px;
    background: #BBBBBB;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 5px 0 0;
    color: gray;
`

const Description = styled.div`
    border-radius: 0 0 5px 5px;
    color: white;
    padding: 0.5em 1em 1.5em 1em;
    background: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between
`