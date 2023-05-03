import React, {useEffect, useState} from 'react';
import '../style/_home.scss'
import Header from "./Header";
import {Button, Container, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers} from "./slices/userSlice";

function Users() {
    const [spinner, setSpinner] = useState(true);
    let dispatch = useDispatch();
    let users = useSelector(state => state.user.users);

    let spinnerElem =
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <div className="spinner spinner-border loading mt-4" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    useEffect(() => {
        dispatch(fetchAllUsers())
        setSpinner(false)
        document.body.style.backgroundImage = 'none';
        document.body.style.display = 'block';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.display = '';
        };

    }, []);

    return (
        <div className='home'>
            <Header/>
            <Container>
                {
                    !spinner ?
                        <>
                            <h2 className='pt-3 pb-3 subTitle'>Users</h2>
                            <Table hover responsive>
                                <thead>
                                <tr className='text-center'>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Age</th>
                                    <th>Chat</th>
                                </tr>
                                </thead>
                                {
                                    users?.map((user) => (
                                        <tbody key={user._id}>
                                        <tr>
                                            <td className='p-4 text-center'>{user._id}</td>
                                            <td className='p-4 text-center'>{user.name}</td>
                                            <td className='p-4 text-center'>{user.username}</td>
                                            <td className='p-4 text-center'>{user.age}</td>
                                            <td className='p-4'>
                                                <div className='d-flex flex-row justify-content-center'>
                                                    <Button className='chat text-white' type="button">
                                                        Start
                                                    </Button>
                                                </div>

                                            </td>

                                        </tr>
                                        </tbody>
                                    ))
                                }
                            </Table>

                        </>
                        :
                        spinnerElem
                }
            </Container>
        </div>
    );
}

export default Users;