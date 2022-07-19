import React from "react";
import axios from "axios";
import config from "../../config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { withStyles } from "@material-ui/core/styles";

const MyTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
}))(TableCell);

export function UserProfile() {
  const [username, setUsername] = React.useState("");
  const [group, setGroup] = React.useState("A"); //TODO: dynamically set group when backend api is ready

  React.useEffect(() => {
    axios
      .get(config.SERVER_URL + `/api/user/get_current_user`)
      .then((res) => {
        console.log("User: ", res.data);
        setUsername(res.data.user.email);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Table>
      <TableBody>
        <TableRow>
          <MyTableCell variant="head">User Email: </MyTableCell>
          <TableCell>{username}</TableCell>
        </TableRow>
        <TableRow>
          <MyTableCell variant="head">Group:</MyTableCell>
          <TableCell>{group}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
