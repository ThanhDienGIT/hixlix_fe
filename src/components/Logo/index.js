import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import

import config from 'config';
import { activeItem } from 'store/reducers/menu';
import logo from '../../assets/images/logovnpt.png'
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >

      <img src={logo} alt='logo' width={'100%'} height={50} />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
