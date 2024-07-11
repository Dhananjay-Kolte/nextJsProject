import { StaticImageData } from 'next/image';
import inspection from '../../../public/normal_u17.png';
import sidebarDashboard from '../../../public/sidebarDashboardIcon.png'
import userManagementIcon from '../../../public/userManagementIcon.png'
import reportIcon from '../../../public/reportIcon.png'
import inspectionHistory from '../../../public/inspectionHistory.svg'

export type Role = 'Authenticated' | 'Public';

export type SidebarItem = {
  label: string;
  link: string;
  iconSrc: StaticImageData;
};

export const sidebarItems: Record<Role, SidebarItem[]> = {
  Authenticated: [
    { label: 'Dashboard', link: '/pages/admin/dashboard', iconSrc: sidebarDashboard },
    { label: 'Inspections', link: '/pages/admin/inspections', iconSrc: inspection },
    // { label: 'Technicians', link: '/pages/admin/technicians', iconSrc: inspection },
    { label: 'User Management', link: '/pages/admin/usermanagement', iconSrc: userManagementIcon },
    // { label: 'Payroll', link: '/pages/admin/payroll', iconSrc: inspection },
  ],
  Public: [
    { label: 'Dashboard', link: '/pages/customer/dashboard', iconSrc: sidebarDashboard },
    { label: 'Reports', link: '/pages/customer/reports', iconSrc: reportIcon },
    { label: 'Inspection History', link: '/pages/customer/inspectionhistory', iconSrc: inspectionHistory },
  ],
};
