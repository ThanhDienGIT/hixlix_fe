import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
//import Logo from 'components/Logo';
import logo from '../../../../assets/images/logovnpt.png'
// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} > 
        <img src={logo} alt='logo' width={'100%'} height={45} />
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
