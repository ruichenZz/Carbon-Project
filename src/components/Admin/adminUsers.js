import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const getUsers = () =>
  axios.get(config.SERVER_URL + `/api/admin/users`).then((res) => res.data);
const promoteRequest = (UID) =>
  axios
    .post(config.SERVER_URL + `/api/admin/promote`, UID)
    .then((res) => res.data);
const demoteRequest = (UID) =>
  axios
    .post(config.SERVER_URL + `/admin/api/demote`, UID)
    .then((res) => res.data);
