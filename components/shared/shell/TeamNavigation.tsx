import { 
  Cog6ToothIcon,  
  ArchiveBoxIcon,
  ChartBarIcon,
  CpuChipIcon,
  HomeModernIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import NavigationItems from './NavigationItems';
import { NavigationProps, MenuItem } from './NavigationItems';

interface NavigationItemsProps extends NavigationProps {
  slug: string;
}

const TeamNavigation = ({ slug, activePathname }: NavigationItemsProps) => {
  const { t } = useTranslation('common');

  const menus: MenuItem[] = [
    {
      name: t('device_management'),
      href: `/teams/${slug}/device-management`,
      icon: CpuChipIcon,
      active: activePathname === `/teams/${slug}/device-management`,
    },
    {
      name: t('industry'),
      href: `/teams/${slug}/industry`,
      icon: HomeModernIcon,
      active: activePathname === `/teams/${slug}/industry`,
    },
    {
      name: t('analytics'),
      href: `/teams/${slug}/analytics`,
      icon: ChartBarIcon,
      active: activePathname === `/teams/${slug}/analytics`,
    },
    {
      name: t('big_data_storage'),
      href: `/teams/${slug}/big-data-storage`,
      icon: ArchiveBoxIcon,
      active: activePathname === `/teams/${slug}/big-data-storage`
    },
    {
      name: t('settings'),
      href: `/teams/${slug}/settings`,
      icon: Cog6ToothIcon,
      active: activePathname === `/teams/${slug}/settings`,
    },
  ];

  return <NavigationItems menus={menus} />;
};

export default TeamNavigation;
