import c from 'clsx';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { memo, useState } from 'react';
import './Pagination.css';

export type PaginationProps = {
    className?: string;
} & Pick<ReactPaginateProps, 'pageCount' | 'onPageChange' | 'initialPage'>;

function Pagination({ className, pageCount, initialPage, onPageChange }: PaginationProps) {
    const [page, setPage] = useState(initialPage);

    function handlePageChange({ selected }: { selected: number }) {
        setPage(selected);
        onPageChange?.({ selected });
    }

    return (
        <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            pageCount={pageCount}
            forcePage={page}
            previousLabel='Previous'
            renderOnZeroPageCount={null}
            onPageChange={handlePageChange}
            className={c('flex -space-x-px', className)}
            pageLinkClassName='pagination-btn'
            previousLinkClassName='pagination-prev-btn'
            nextLinkClassName='pagination-next-btn'
            activeLinkClassName='pagination-btn pagination-active-btn'
            breakClassName='pagination-btn'
        />
    );
}

export default memo(Pagination);
