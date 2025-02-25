import { usePathname, useSearchParams } from 'next/navigation';
export function usePagination(totalPages: number) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const createPageURL = (page: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathName}?${params.toString()}`;
  };

  // const isActivePage = () => currentPage === pageIndex;

  const nextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    return createPageURL(newPage);
  };

  const prevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    return createPageURL(newPage);
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(0, Math.min(page, totalPages));
    return createPageURL(pageNumber);
  };

  return {
    currentPage,
    totalPages,
    lastPage: currentPage === totalPages - 1,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: currentPage < totalPages - 1,
    hasPrevPage: currentPage > 0,
    // isActivePage,
  };
}
