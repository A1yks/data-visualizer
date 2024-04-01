'use client';

import Modal from '@/components/Modal';
import useTableBody from './hooks/useTableBody';
import EditingForm from '@/components/EditingForm';
import TableRows from './TableRows';
import { TableProps } from './Table';
import { TableRowData } from './types';

export type TableBodyProps = {
    onEdit: TableProps['onEdit'];
};

function TableBody({ onEdit }: TableBodyProps) {
    const { modalActive, editableFields, setModalActive, handleSubmit, handleClose, handleEdit } = useTableBody(onEdit);

    return (
        <>
            <tbody>
                <TableRows onEdit={handleEdit} />
            </tbody>
            <Modal header={<div className='font-bold text-2xl'>Edit</div>} active={modalActive} setActive={setModalActive}>
                {editableFields !== null && (
                    <div className='mt-4'>
                        <EditingForm formData={editableFields.data as TableRowData} onSubmit={handleSubmit} onCancel={handleClose} />
                    </div>
                )}
            </Modal>
        </>
    );
}

export default TableBody;
