import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { mediaQueries } from '../../shared/config';
import config from '../../config';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

//material UI components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


// Component declaration

const AdminProjects = (props) => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    function getProject() {
      axios
        .get(config.SERVER_URL + '/api/projects/')
        .then((res) => setProjects(res.data))
        .catch((err) => console.log(err));
    }
    function getUsers() {
        axios
          .get(config.SERVER_URL + '/api/admin/users/')
          .then((res) => setUsers(res.data))
          .catch((err) => console.log(err));
      }
    getProject();
    getUsers();
  }, []);

  const handleUpdateProject = () => {
    setProjects(projects.map());
  };


  return (
    <div>
      <Header>
        {projects.length !== 0 && (
          <>
           
          </>
        )}
      </Header>

      {projects.length === 0 ? (
        <NoProjectContainer>
          {/* <h1>You haven't created any projects</h1> */}
        </NoProjectContainer>
      ) : (
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ProjectName</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Approve</TableCell>
                  <TableCell>Deny</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project, index) => {
                  return (
                    <Project
                      key={index}
                      data={project}
                      handleUpdateProject={handleUpdateProject}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </div>
  );
};

// styled components declaration

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.button`
  background-color: white;
  color: black;
  padding: 2em;
  cursor: pointer;
`;

const Container = styled.div`
  ${
    '' /* background: #444444;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 2em 0;
  row-gap: 2em;
  min-height: 80vh;
  ${mediaQueries.mobile} {
    grid-template-columns: 100%; */
  }
  }
`;

const NoProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 20vh);
`;
export default AdminProjects;

/**
 * Component Declaration
 */
function Project(props) {
    //const [ApproveProjectModalOpen, setApproveProjectModalOpen] = useState(false);
    const history = useHistory();
  
    const modalCustomStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
  
    const { data } = props;
  
    const handleApproveProjects = (id) => {
      axios
        .post(config.SERVER_URL + `/api/admin/approve`, {
            id: id,
          })
        .then((res) => {
          alert(res.data);
          window.location.reload();
          //props.handleUpdateProject();
          //setApproveProjectModalOpen(false);
        })
        .catch((err) => alert(err.message));
    };

    const handleDenyProjects = (id) => {
        axios
          .post(config.SERVER_URL + `/api/admin/deny`, {
              id: id,
            })
          .then((res) => {
            alert(res.data);
            window.location.reload();
            //props.handleUpdateProject();
            //setApproveProjectModalOpen(false);
          })
          .catch((err) => alert(err.message));
      };
  
    return (
      <>
        {/* <TableContainer component={Paper}>
        <Table  aria-label="simple table"> */}
  
        <TableRow>
          <TableCell>{data.name}</TableCell>
          <TableCell>{data.status}</TableCell>
          <TableCell>
            
            <Button size="small" variant="outlined" onClick={() => history.push(`/edit/${data['_id']}`)}>
              View
            </Button>
  
  
          </TableCell>
          <TableCell>
            {data.isApproved ? 
                <Button size="small" color="error" variant="outlined" disabled>
                    Approve
                </Button> : 
                <Button size="small" color="error" variant="outlined" onClick={() => handleApproveProjects(data['_id'])}>
                    Approve
                </Button> 
              }
          </TableCell>
          <TableCell>
            {data.isApproved ? 
                <Button size="small" color="error" variant="outlined" onClick={() => handleDenyProjects(data['_id'])}>
                    Deny
                </Button> : 
                <Button size="small" color="error" variant="outlined" disabled>
                    Deny
                </Button> 
              }
          </TableCell>
        </TableRow>
        {/* </Table>
      </TableContainer> */}
        {/* <Modal
          isOpen={ApproveProjectModalOpen}
          onRequestClose={() => setApproveProjectModalOpen(false)}
          ariaHideApp={false}
          style={modalCustomStyles}
        >
          <p>Are you sure you want to delete this project?</p>
          <button onClick={() => setApproveProjectModalOpen(false)}>Cancel</button>
          <button onClick={() => handleDeleteProject(data['_id'])}>Delete</button>
        </Modal> */}
      </>
    );
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
  `;
  
  const TestPreview = styled.div`
    height: 400px;
    background: #bbbbbb;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 5px 0 0;
    color: gray;
  `;
  
  const Description = styled.div`
    border-radius: 0 0 5px 5px;
    color: white;
    padding: 0.5em 1em 1.5em 1em;
    background: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;