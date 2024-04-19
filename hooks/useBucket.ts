import fetcher from '@/lib/fetcher';
import type { Bucket } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { ApiResponse } from 'types';

const useBucket = (slug?: string) => {
  const { query, isReady } = useRouter();

  const bucketSlug = slug || (isReady ? query.slug : null);

  const { data, error, isLoading } = useSWR<ApiResponse<Bucket>>(
    bucketSlug ? `/api/buckets/${bucketSlug}` : null,
    fetcher
  );

  return {
    isLoading,
    isError: error,
    bucket: data?.data,
  };
};

export default useBucket;
