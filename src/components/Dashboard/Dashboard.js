import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import Modal from "react-modal";
import axios from "axios";
import { checkPackageNameAvailable } from "../../services/api";
import { mediaQueries } from "../../shared/config";

import Project from "./Project";




// Component declaration

const Dash = (props) => {
  const [projects, setProjects] = useState([]);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);

  useEffect(() => {
    function getProject() {
      axios
        .get("http://localhost:3000/api/projects/")
        .then((res) => setProjects(res.data))
        .catch((err) => console.log(err));
    }
    getProject();
  }, []);

  const handleUpdateProject = () => {
    setProjects(projects.map());
  };

  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <Header>
        {projects.length !== 0 && (
          <>

            <Modal
              isOpen={createProjectModalOpen}
              onRequestClose={() => setCreateProjectModalOpen(false)}
              ariaHideApp={false}
              style={modalCustomStyles}
            >
              <button onClick={() => setCreateProjectModalOpen(false)}>
                Cancel
              </button>
              <Formik
                initialValues={{ projectName: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.projectName)
                    errors.projectName = "Project Name required";
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  checkPackageNameAvailable(values.projectName).then(
                    (isAvailable) => {
                      if (isAvailable) {
                        axios
                          .post("http://localhost:3000/api/projects/create", {
                            name: values.projectName,
                          })
                          .then((res) => {
                            alert(
                              `Project ${values.projectName} successfully created!`
                            );
                            setProjects((prevState) => [
                              ...prevState,
                              res.data.project,
                            ]);
                            setCreateProjectModalOpen(false);
                            setSubmitting(false);
                          })
                          .catch((err) => {
                            alert(err);
                          });
                      } else {
                        alert(
                          `This project name already exists! Please use another name.`
                        );
                      }
                    }
                  );
                }}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      name="projectName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.projectName}
                    />
                    {formik.touched.projectName && formik.errors.projectName ? (
                      <div>{formik.errors.projectName}</div>
                    ) : null}
                    <button type="submit">Submit</button>
                  </form>
                )}
              </Formik>
            </Modal>
          </>
        )}
      </Header>

      {projects.length === 0 ? (
        <NoProjectContainer>
          <h1>You haven't created any projects</h1>
          <Modal
            isOpen={createProjectModalOpen}
            onRequestClose={() => setCreateProjectModalOpen(false)}
            ariaHideApp={false}
            style={modalCustomStyles}
          >
            <button onClick={() => setCreateProjectModalOpen(false)}>
              Cancel
            </button>
            <Formik
              initialValues={{ projectName: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.projectName)
                  errors.projectName = "Project Name required";
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                axios
                  .post("http://localhost:3000/api/projects/create", {
                    name: values.projectName,
                  })
                  .then((res) => {
                    alert(
                      `Project ${values.projectName} successfully created!`
                    );
                    setProjects((prevState) => [
                      ...prevState,
                      res.data.project,
                    ]);
                    setCreateProjectModalOpen(false);
                    setSubmitting(false);
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <input
                    name="projectName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectName}
                  />
                  {formik.touched.projectName && formik.errors.projectName ? (
                    <div>{formik.errors.projectName}</div>
                  ) : null}
                  <button type="submit">Submit</button>
                </form>
              )}
            </Formik>
          </Modal>
        </NoProjectContainer>
      ) : (
        <Container>
          {projects.map((project, index) => {
            return (
              <Project
                key={index}
                data={project}
                handleUpdateProject={handleUpdateProject}
              />
            );
          })}
        </Container>
      )}
      
      
    </div>
  );
};

// styled components declaration

const Header = styled.div`
  background-color: #333333;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  padding: 2em;
  cursor: pointer;
`;

const Container = styled.div`
  background: #444444;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 2em 0;
  row-gap: 2em;
  min-height: 80vh;
  ${mediaQueries.mobile} {
    grid-template-columns: 100%;
  }
`;

const NoProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 20vh);
`;

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

export default Dash;
