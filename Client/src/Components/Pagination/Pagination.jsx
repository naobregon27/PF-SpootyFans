import React from "react";
import { useEffect } from "react";

const Pagination = ({
   currentPage,
   itemsPerPage,
   totalItems,
   onPageChange,
}) => {
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   const handlePageChange = (pageNumber) => {
      onPageChange(pageNumber);
   };

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         handlePageChange(currentPage + 1);
      }
   };

   const handlePreviousPage = () => {
      if (currentPage > 1) {
         handlePageChange(currentPage - 1);
      }
   };

   const renderPaginationLinks = () => {
      const links = [];

      links.push(
         <button
            // className={currentPage === 1 ? style.button_disabled : style.button}
				className="cursor-pointer font-custom border flex justify-center items-center rounded-l-[5rem] h-[2.5rem] w-[4rem] bg-white hover:bg-black hover:text-white hover:scale-[1.1] duration-[.3s]"
				key="previous"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}>
            prev
         </button>
      );

      for (let i = 1; i <= totalPages; i++) {
         links.push(
            <button
               // className={i === currentPage ? style.selected_page : style.pages}
					className="cursor-pointer font-custom flex justify-center items-center  h-[2.5rem] w-[2.5rem] hover:bg-black hover:text-white hover:animate-bounce duration-[.3s]"

					key={i}
               onClick={() => handlePageChange(i)}
               disabled={i === currentPage}>
               {i}
            </button>
         );
      }

      links.push(
         <button
            // className={
            //    currentPage === totalPages ? style.button_disabled : style.button
            // }
				className="cursor-pointer font-custom border flex justify-center items-center rounded-r-[5rem] h-[2.5rem] w-[4rem] bg-white hover:bg-black hover:text-white hover:scale-[1.1] duration-[.3s]"
            key="next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}>
            Next
         </button>
      );

      return links;
   };

   useEffect(() => {
      handlePageChange(1);
   }, [totalItems]);

   return (
      <div className="flex flex-row w-screen justify-center items-center gap-1">
			<div className="flex flex-row gap-1">
         {renderPaginationLinks()}
			</div>
      </div>
   );
};

export default Pagination;
