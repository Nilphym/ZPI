import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUser } from '../../redux/store';


const UserItem = ({ userId, userEmail, userName, userSurname }) => {
    const dispatch = useDispatch();

    const deleteUser = () => {
        dispatch(deleteUser({ id: userId }));
    };

    return (
        <Box>
            <Typography>{userId}</Typography>
            <Typography>{userEmail}</Typography>
            <Typography>{userName}</Typography>
            <Typography>{userSurname}</Typography>
            <Button onClick={() => deleteUser()}> Delete User</Button>
        </Box>
    );
};


UserItem.propTypes = {
    userId: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userSurname: PropTypes.string.isRequired
};

export default UserItem;
