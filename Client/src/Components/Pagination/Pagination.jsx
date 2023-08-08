import React from 'react';
import style from "./Pagination.module.css";
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
        className={currentPage === 1 ? style.button_disabled : style.button}
        key="previous"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <button
          className={i === currentPage ? style.selected_page : style.pages}
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    links.push(
      <button
        className={
          currentPage === totalPages ? style.button_disabled : style.button
        }
        key="next"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return links;
  };

  useEffect(() => {
    handlePageChange(1);
  }, [totalItems]);

  return (
    <div className={style.pagination_container}>{renderPaginationLinks()}</div>
  );
};

export default Pagination;
