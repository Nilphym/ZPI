import { Box, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, deleteUser, setIsLoadingUsers } from '../../redux/store';
import UserItem from './UserItem';


const DeleteUserPanel = () => {
    const dispatch = useDispatch();
    const { users, isLoadingUsers } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const deleteUserById = (userId) => {
        dispatch(deleteUser({ id: userId }));
        setIsLoadingUsers(true);
        dispatch(getUsers());
    };

    return (
        <Box>
            {isLoadingUsers ?
                (
                    <CircularProgress />
                ) : (
                    <Box>
                        <Typography>Users List</Typography>
                        {users.map(({ id, name, surname, email }) => <UserItem
                            userId={id} userEmail={email} userName={name} userSurname={surname} deleteUser={deleteUserById} />)}
                    </Box>
                )}
        </Box>
    );
};

export default DeleteUserPanel;
