import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import {
  EditOutlined,
  // ProfileOutlined,
  UserOutlined,
  // WalletOutlined 
} from '@ant-design/icons';
import UserProfileUpdate from 'pages/component/UserProfileUpdate';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = (props) => {
  const theme = useTheme();
  const [openChangeProfile, setOpenChangeProfile] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState('');
  const [edit, setEdit] = useState('')
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


  useEffect(() => {
    if (selectedIndex === 0) {
      setOpenChangeProfile(true)
      setEdit(1)
    }
    else if (selectedIndex === 1) {
      setOpenChangeProfile(true)
      setEdit(0)
    }
  }, [selectedIndex])


  const CloseChangeProfile = () => {
    setOpenChangeProfile(false)
    setSelectedIndex('')
  }


  return (


    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText primary="Cập nhật thông tin" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="Xem thông tin cá nhân" />
        </ListItemButton>

        {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton> */}
        {/* <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton> */}
      </List>
      <UserProfileUpdate open={openChangeProfile} title={edit === 1 ? 'Cập nhật thông tin cá nhân' : 'Thông tin cá nhân'}
        handleClose={CloseChangeProfile}
        CallAPI={props.CallAPI}
        EditState={edit} />
    </>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
