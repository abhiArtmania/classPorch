import React from "react";
import { object, func } from "prop-types";
import "./common.css";

const Pagination = props => {
  const maxPageShowing = 5;
  const pageActive = parseInt(props.searchMetadata.page_no, 10);
  const prevPage = pageActive - 1;
  const nextPage = pageActive + 1;
  const totalCount = parseInt(props.searchMetadata.total_count, 10);
  const perPage = parseInt(props.searchMetadata.per_page || 10, 10);

  const maxPage = Math.ceil(totalCount / perPage);

  const paginationEls = [];

  if (pageActive <= maxPage) {
    for (let i = 1; i <= maxPage; i++) {
      if (i >= pageActive + maxPageShowing) break;
      else {
        paginationEls.push(          
          <li key={`pagination_${i}`} className={i === pageActive ? "active" : ""}>
            <a onClick={props.onChangePage(i)}>{i}</a>
          </li>
        )
      }
    }
  }
  return (
    <nav className="pagination__wrapper" aria-label="navigation">
      <ul className="pagination">
        <li>
          <a
            disabled={pageActive === 1}
            onClick={pageActive === 1 ? null : props.onChangePage(prevPage)}
            aria-label="Previous"
          >
            <i className="fa fa-angle-left" />
          </a>
        </li>
        {paginationEls}
        <li>
          <a
            disabled={pageActive === maxPage}
            onClick={pageActive === maxPage ? null : props.onChangePage(nextPage)}
            aria-label="Next"
          >
            <i className="fa fa-angle-right" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  searchMetadata: object.isRequired,
  onChangePage: func.isRequired,
};

export default Pagination;
