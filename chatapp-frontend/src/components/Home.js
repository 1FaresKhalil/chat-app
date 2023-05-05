import React, { useEffect } from "react";
import "../style/_home.scss";
import Header from "./Header";
import { Button, Container, Table } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers } from "./slices/userSlice";
import Spinner from "./Spinner";
import axios from "axios";
import UnAuthenticated from "./UnAuthenticated";

let token = JSON.parse(localStorage.getItem("token"));

function Users() {
  let [users, setUsers] = React.useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:8000/users`, {
        headers: { Authorization: token },
      });
      setUsers(res.data.users);
    };
    fetchUsers();
    document.body.style.backgroundImage = "none";
    document.body.style.display = "block";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.display = "";
    };
  }, []);

  if (localStorage.getItem("token") === null) {
    return <UnAuthenticated />;
  }
  if (users?.length > 0) {
    return (
      <div className="home">
        <Header />
        <Container>
          <>
            <h2 className="pt-3 pb-3 subTitle">Users</h2>
            <Table hover responsive>
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>Chat</th>
                </tr>
              </thead>
              {users?.map((user) => (
                <tbody key={user._id}>
                  <tr>
                    <td className="p-4 text-center">{user._id}</td>
                    <td className="p-4 text-center">{user.name}</td>
                    <td className="p-4 text-center">{user.username}</td>
                    <td className="p-4 text-center">{user.age}</td>
                    <td className="p-4">
                      <div className="d-flex flex-row justify-content-center">
                        <Button className="chat text-white" type="button">
                          Start
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </>
        </Container>
      </div>
    );
  }
  return <Spinner />;
}

export default Users;
