import { LetterAvatar } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import { Bucket } from '@prisma/client';
import useBuckets from 'hooks/useBuckets';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from 'react-daisyui';
import toast from 'react-hot-toast';
import type { ApiResponse } from 'types';
import { useRouter } from 'next/router';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { WithLoadingAndError } from '@/components/shared';
// import { CreateBucket } from '@/components/bucket';
import { Table } from '@/components/shared/table/Table';

const Buckets = () => {
  const router = useRouter();
  const { t } = useTranslation('buckets');
  const [bucket, setBucket] = useState<Bucket | null>(null);
  const { isLoading, isError, buckets, mutateBuckets } = useBuckets();
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [createBucketVisible, setCreateBucketVisible] = useState(false);

  const { newBucket } = router.query as { newBucket: string };

  useEffect(() => {
    if (newBucket) {
      setCreateBucketVisible(true);
    }
  }, [newBucket]);

  const leaveBucket = async (bucket: Bucket) => {
    const response = await fetch(`/api/buckets/${bucket.slug}/members`, {
      method: 'PUT',
      headers: defaultHeaders,
    });

    const json = (await response.json()) as ApiResponse;

    if (!response.ok) {
      toast.error(json.error.message);
      return;
    }

    toast.success(t('leave-bucket-success'));
    mutateBuckets();
  };

  return (
    <WithLoadingAndError isLoading={isLoading} error={isError}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <h2 className="text-xl font-medium leading-none tracking-tight">
              {t('all-buckets')}
            </h2>
            <p className="text-sm text-neutral dark:text-gray-400">
              {t('bucket-listed')}
            </p>
          </div>
          <Button
            color="primary"
            size="md"
            onClick={() => setCreateBucketVisible(!createBucketVisible)}
          >
            {t('create-bucket')}
          </Button>
        </div>

        <Table
          cols={[t('name'), t('members'), t('created-at'), t('actions')]}
          body={
            buckets
              ? buckets.map((bucket) => {
                  return {
                    id: bucket.id,
                    cells: [
                      {
                        wrap: true,
                        element: (
                          <Link href={`/buckets/${bucket.slug}/members`}>
                            <div className="flex items-center justify-start space-x-2">
                              <LetterAvatar name={bucket.name} />
                              <span className="underline">{bucket.name}</span>
                            </div>
                          </Link>
                        ),
                      },
                      { wrap: true, text: '' + bucket._count.members },
                      {
                        wrap: true,
                        text: new Date(bucket.createdAt).toDateString(),
                      },
                      {
                        buttons: [
                          {
                            color: 'error',
                            text: t('leave-bucket'),
                            onClick: () => {
                              setBucket(bucket);
                              setAskConfirmation(true);
                            },
                          },
                        ],
                      },
                    ],
                  };
                })
              : []
          }
        ></Table>

        <ConfirmationDialog
          visible={askConfirmation}
          title={`${t('leave-bucket')} ${bucket?.name}`}
          onCancel={() => setAskConfirmation(false)}
          onConfirm={() => {
            if (bucket) {
              leaveBucket(bucket);
            }
          }}
          confirmText={t('leave-bucket')}
        >
          {t('leave-bucket-confirmation')}
        </ConfirmationDialog>
        {/* <CreateBucket
          visible={createBucketVisible}
          setVisible={setCreateBucketVisible}
        /> */}
      </div>
    </WithLoadingAndError>
  );
};

export default Buckets;