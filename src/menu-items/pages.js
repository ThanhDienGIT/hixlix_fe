// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';

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
      title: 'Danh mục người dùng',
      type: 'item',
      url: '/user-management',
      icon: ManageAccountsRoundedIcon,
      breadcrumbs: false,
      role: [2]
    }
  ]
};

export default pages;
