// assets
import { DashboardOutlined,SolutionOutlined } from '@ant-design/icons';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
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
  title: 'Chức năng hệ thống',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Trang chủ',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
      role: [1, 0, 2]
    },
    {
      id: 'customer',
      title: 'Khách hàng',
      type: 'item',
      url: '/table',
      icon: icons2.SolutionOutlined,
      breadcrumbs: false,
      role: [1, 0, 2]
    },
    // {
    //   id: 'surveyform',
    //   title: 'Danh sách phiếu khảo sát',
    //   type: 'item',
    //   url: '/surveylist',
    //   icon: icons.FormatListBulletedIcon,
    //   breadcrumbs: false
    // }
    {
      id: 'statistical',
      title: 'Thống kê & Báo cáo',
      type: 'item',
      url: '/statistical-report',
      icon: BarChartRoundedIcon,
      breadcrumbs: false,
      role: [1, 0, 2]
    },
    {
      id: 'asignment',
      title: 'Phân công khảo sát KH',
      type: 'item',
      url: '/asignment-customer',
      icon: AssignmentIndRoundedIcon,
      breadcrumbs: false,
      role: [0, 2]
    }
  ]
};

export default dashboard;
