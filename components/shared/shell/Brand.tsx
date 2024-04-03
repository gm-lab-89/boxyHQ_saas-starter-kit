import app from '@/lib/app';
import Image from 'next/image';

const Brand = () => {
  return (
    <div className="flex pt-6 shrink-0 items-center text-xl font-bold gap-2">
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
