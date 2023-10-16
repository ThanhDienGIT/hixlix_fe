// assets
import { DashboardOutlined,SolutionOutlined } from '@ant-design/icons';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// icons
const icons = {
  DashboardOutlined,FormatListBulletedIcon
};
const icons2 = {
  SolutionOutlined
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Trang chủ',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'customer',
      title: 'Khách hàng',
      type: 'item',
      url: '/table',
      icon: icons2.SolutionOutlined,
      breadcrumbs: false
    },
    {
      id: 'surveyform',
      title: 'Danh sách phiếu khảo sát',
      type: 'item',
      url: '/surveylist',
      icon: icons.FormatListBulletedIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
