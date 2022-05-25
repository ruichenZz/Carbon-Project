import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css';
import { Table } from 'antd';
import axios from "axios";

const getUsers = () =>
  axios.get(`http://localhost:3000/api/admin/users`).then((res) => res.data);
const promoteRequest = (UID) =>
  axios
    .post(`http://localhost:3000/api/admin/promote`, UID)
    .then((res) => res.data);
const demoteRequest = (UID) =>
  axios
    .post(`http://localhost:3000/api/admin/demote`, UID)
    .then((res) => res.data);

const data1 = [
  {
    key: '1',
    email: 'joebruin@ucla.edu'
  },
  {
    key: '2',
    email: 'tracy@media.ucla.edu'
  },
  {
    key: '3',
    email: 'carbon@media.ucla.edu'
  }
];

class AdminPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      isAdmin: false,
    };
    this.transformData = this.transformData.bind(this);
    this.promote = this.promote.bind(this);
    this.demote = this.demote.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/admin/is_admin")
      .then((res) => this.setState({ isAdmin: res.data.isAdmin }))
      .catch((err) => console.log(err));

    getUsers().then((res) => {
      console.log(res);
      const data = this.transformData(res);
      this.setState({
        data,
        loading: false,
      });
    });
  }

  transformData(data) {
    return data.allUsers.map((x) => ({
      email: x.email,
      userId: x._id,
    }));
  }

  promote(someone) {
    promoteRequest({ id: someone }).then((data) => console.log(data));
  }

  demote(someone) {
    demoteRequest({ id: someone }).then((data) => console.log(data));
  }

  render() {
    if (this.state.loading) {
      return null;
    } else if (!this.state.isAdmin) {
      return (
        <>
          <h1 style={{ margin: "1em" }}>
            You are not an admin and cannot view the page
          </h1>
        </>
      );
    } else {
      return (
        <>
          <h1 style={{ margin: "1em" }}>Admin Page</h1>
          <Button>
            {" "}
            <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
              {" "}
              Home{" "}
            </NavLink>{" "}
          </Button>
          <h2 style={{ margin: "1.2em" }}>Staff List</h2>
          <div style={{ margin: "1.7em" }}>
            <Table
              dataSource={data1}
              columns={[
                {title: "Email", dataIndex: 'email'},
                {
                  title: 'Action',
                  render: (_, record) => (
                    <div>
                      <a style={{color: 'blue'}} onClick={this.promote(record)}>promote</a>
                      <br/>
                      <a style={{color: 'red'}} onClick={this.demote(record)}>demote</a>
                    </div>
                  )
                },
              ]}
            />
          </div>
        </>
      );
    }
  }
}

const Button = styled.button`
  background-color: white;
  color: black;
  padding: 1em;
  cursor: pointer;
  margin: 1em;
`;

export default AdminPage;
