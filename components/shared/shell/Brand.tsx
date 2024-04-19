import app from '@/lib/app';
import Image from 'next/image';
import useTheme from 'hooks/useTheme';

const Brand = () => {
  const { theme } = useTheme();
  return (
    <div className="flex pt-6 shrink-0 items-center text-xl font-bold gap-2 dark:text-gray-100">
      <Image
        className="h-12 w-auto"
        src={app.logoUrl}
        alt={app.name}
        width={80}
        height={80}
      />
      {app.name}
    </div>
  );
};

export default Brand;
