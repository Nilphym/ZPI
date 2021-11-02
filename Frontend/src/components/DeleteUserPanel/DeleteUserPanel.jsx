import { Box, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/store';
import UserItem from './UserItem';


const DeleteUserPanel = () => {
    const dispatch = useDispatch();
    const { users, isLoadingUsers } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getUsers());
    }, []);


    return (
        <Box>
            {isLoadingUsers ?
                (
                    <CircularProgress />
                ) : (
                    <Box>
                        <Typography>Users List</Typography>
                        {users.map(({ id, name, surname, email }) => <UserItem
                            userId={id} userEmail={email} userName={name} userSurname={surname} />)}
                    </Box>
                )}
        </Box>
    );
};

export default DeleteUserPanel;
