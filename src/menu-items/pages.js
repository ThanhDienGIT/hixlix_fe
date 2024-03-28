// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Filter8RoundedIcon from '@mui/icons-material/Filter8Rounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

// icons
// const icons = {
//   LoginOutlined,
//   ProfileOutlined
// };

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Chức năng quản trị',
  type: 'group',
  children: [
    // {
    //   id: 'login1',
    //   title: 'Login',
    //   type: 'item',
    //   url: '/login',
    //   icon: icons.LoginOutlined,
    //   target: true
    // },
    // {
    //   id: 'register1',
    //   title: 'Register',
    //   type: 'item',
    //   url: '/register',
    //   icon: icons.ProfileOutlined,
    //   target: true
    // }
    {
      id: 'service',
      title: 'Danh mục dịch vụ',
      type: 'item',
      url: '/service-management',
      icon: WifiTetheringRoundedIcon,
      breadcrumbs: false,
      role: [2]
    },
    {
      id: 'supplier',
      title: 'Danh mục nhà cung cấp',
      type: 'item',
      url: '/supplier-management',
      icon: AddBusinessRoundedIcon,
      breadcrumbs: false,
      role: [2]
    },
    {
      id: 'account',
      title: 'Danh mục nhân viên',
      type: 'item',
      url: '/user-management',
      icon: ManageAccountsRoundedIcon,
      breadcrumbs: false,
      role: [2]
    },
    {
      id: 'quality',
      title: 'Danh mục chất lượng dịch vụ',
      type: 'item',
      url: '/quality-management',
      icon: Filter8RoundedIcon,
      breadcrumbs: false,
      role: [2]
    },
    {
      id: 'servicequality',
      title: 'Danh mục chất lượng phục vụ',
      type: 'item',
      url: '/service-quality-management',
      icon: SupportAgentRoundedIcon,
      breadcrumbs: false,
      role: [2]
    },
    {
      id: 'BOsetting',
      title: 'Danh mục khả năng chuyển BO',
      type: 'item',
      url: '/BO-setting-management',
      icon: FormatBoldRoundedIcon,
      breadcrumbs: false,
      role: [2]
    },
    {
      id: 'UnitSetting',
      title: 'Danh mục đơn vị',
      type: 'item',
      url: '/unit-setting-management',
      icon: ApartmentIcon,
      breadcrumbs: false,
      role: [2]
    },
    {
      id: 'UnitSettingManagement',
      title: 'Cấu hình địa bàn quản lý',
      type: 'item',
      url: '/locality-setting-management',
      icon: SettingsRoundedIcon,
      breadcrumbs: false,
      role: [2]
    }
  ]
};

export default pages;
