import { LetterAvatar } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import { DashBoard } from '@prisma/client';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from 'react-daisyui';
import toast from 'react-hot-toast';
import type { ApiResponse } from 'types';
import { useRouter } from 'next/router';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { WithLoadingAndError } from '@/components/shared';

// import { CreateDashBoard } from '@/components/dashboard';
// import useDashBoards from 'hooks/useDashBoards';
import { Table } from '@/components/shared/table/Table';
import { GridStack } from 'gridstack';

const Dashboards = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [dashboard, setDashBoard] = useState<DashBoard | null>(null);
  // const { isLoading, isError, dashboards, mutateDashBoards } = useDashBoards();
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [createDashBoardVisible, setCreateDashBoardVisible] = useState(false);

  const { newDashBoard } = router.query as { newDashBoard: string };

  useEffect(() => {
    if (newDashBoard) {
      setCreateDashBoardVisible(true);
    }
  }, [newDashBoard]);

  // const leaveDashBoard = async (dashboard: DashBoard) => {
  //   const response = await fetch(`/api/dashboards/${dashboard.slug}/members`, {
  //     method: 'PUT',
  //     headers: defaultHeaders,
  //   });

  //   const json = (await response.json()) as ApiResponse;

  //   if (!response.ok) {
  //     toast.error(json.error.message);
  //     return;
  //   }

  //   toast.success(t('leave-dashboard-success'));
  //   mutateDashBoards();
  // };
  
  GridStack.init();

  return ( 
    <>
    <div className="grid-stack">
      <div className="grid-stack-item">
        <div className="grid-stack-item-content">Item 1</div>
      </div>
      <div className="grid-stack-item" gs-w="2">
        <div className="grid-stack-item-content">Item 2 wider</div>
      </div>
    </div>
    </> );
    // <WithLoadingAndError isLoading={isLoading} error={isError}>
    //   <div className="space-y-3">
    //     <div className="flex justify-between items-center">
    //       <div className="space-y-3">
    //         <h2 className="text-xl font-medium leading-none tracking-tight">
    //           {t('all-dashboards')}
    //         </h2>
    //         <p className="text-sm text-neutral dark:text-gray-400">
    //           {t('dashboard-listed')}
    //         </p>
    //       </div>
    //       <Button
    //         color="primary"
    //         size="md"
    //         onClick={() => setCreateDashBoardVisible(!createDashBoardVisible)}
    //       >
    //         {t('create-dashboard')}
    //       </Button>
    //     </div>

    //     <Table
    //       cols={[t('name'), t('members'), t('created-at'), t('actions')]}
    //       body={
    //         dashboards
    //           ? dashboards.map((dashboard) => {
    //               return {
    //                 id: dashboard.id,
    //                 cells: [
    //                   {
    //                     wrap: true,
    //                     element: (
    //                       <Link href={`/dashboards/${dashboard.slug}/members`}>
    //                         <div className="flex items-center justify-start space-x-2">
    //                           <LetterAvatar name={dashboard.name} />
    //                           <span className="underline">{dashboard.name}</span>
    //                         </div>
    //                       </Link>
    //                     ),
    //                   },
    //                   { wrap: true, text: '' + dashboard._count.members },
    //                   {
    //                     wrap: true,
    //                     text: new Date(dashboard.createdAt).toDateString(),
    //                   },
    //                   {
    //                     buttons: [
    //                       {
    //                         color: 'error',
    //                         text: t('leave-dashboard'),
    //                         onClick: () => {
    //                           setDashBoard(dashboard);
    //                           setAskConfirmation(true);
    //                         },
    //                       },
    //                     ],
    //                   },
    //                 ],
    //               };
    //             })
    //           : []
    //       }
    //     ></Table>

    //     <ConfirmationDialog
    //       visible={askConfirmation}
    //       title={`${t('leave-dashboard')} ${dashboard?.name}`}
    //       onCancel={() => setAskConfirmation(false)}
    //       onConfirm={() => {
    //         if (dashboard) {
    //           leaveDashBoard(dashboard);
    //         }
    //       }}
    //       confirmText={t('leave-dashboard')}
    //     >
    //       {t('leave-dashboard-confirmation')}
    //     </ConfirmationDialog>
    //     <CreateDashBoard
    //       visible={createDashBoardVisible}
    //       setVisible={setCreateDashBoardVisible}
    //     />
    //   </div>
    // </WithLoadingAndError>
};

export default Dashboards;
