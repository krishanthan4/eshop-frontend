interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination ({ items, pageSize, currentPage, onPageChange }:PaginationProps) {
    const pagesCount = Math.ceil(items / pageSize); // 100/10
   
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
   
     return (
      <div>
        <ul className={"flex justify-between items-center list-none"}>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "bg-gray-300 text-black rounded-md p-3" : "bg-gray-800 text-gray-200 rounded-md p-3"
              }
            >
              <a className={"cursor-pointer"} onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
   };

   export const paginate = (items: any[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
   };