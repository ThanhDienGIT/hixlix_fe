import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
//import Logo from 'components/Logo';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} > 
        <img src='https://itvnpt.vn/wp-content/uploads/2021/11/Logo-VNPT-TP-HCM-1.png' alt='logo' width={'100%'} height={45} />
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
