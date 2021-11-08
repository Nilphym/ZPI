import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';


const UserItem = ({ userId, userEmail, userName, userSurname, deleteUser }) => {

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
    userSurname: PropTypes.string.isRequired,
    deleteUser: PropTypes.func.isRequired
};

export default UserItem;
