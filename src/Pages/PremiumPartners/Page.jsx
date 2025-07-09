import React, { useState, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination
} from 'react-table';
import { useNavigate } from 'react-router-dom';

const DefaultColumnFilter = ({ column: { filterValue, setFilter, Header } }) => (
  <input
    className="form-control"
    placeholder={`Search ${Header}`}
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value || undefined)}
  />
);

export default function PremiumPartners() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const sampleData = [
      {
        id: 101,
        name: "Aman Singh",
        phone: "9876543210",
        aadhaar: "1234-5678-9012",
        totalMeetings: 12,
        paymentPending: 500,
        totalPayment: 4500,
        reviewStars: 4,
        reviewText: "Very nice experience.",
        totalCancellations: 1,
        satisfaction: true
      },
      {
        id: 102,
        name: "Priya Sharma",
        phone: "8765432190",
        aadhaar: "2345-6789-0123",
        totalMeetings: 18,
        totalPayment: 7800,
        paymentPending: 0,
        reviewStars: 5,
        reviewText: "Excellent platform.",
        totalCancellations: 0,
        satisfaction: true
      },
      {
        id: 103,
        name: "Rahul Mehra",
        phone: "7654321980",
        aadhaar: "3456-7890-1234",
        totalMeetings: 9,
        totalPayment: 3200,
        paymentPending: 800,
        reviewStars: 3,
        reviewText: "Could be better.",
        totalCancellations: 2,
        satisfaction: false
      }
    ];

    setData(sampleData);
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id', Filter: DefaultColumnFilter },
      {
        Header: 'Name',
        accessor: 'name',
        Filter: DefaultColumnFilter,
        Cell: ({ row }) => (
          <span
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/meetingrecord-table')}
          >
            {row.original.name}
          </span>
        )
      },
      { Header: 'Phone', accessor: 'phone', disableFilters: true },
      { Header: 'Aadhaar', accessor: 'aadhaar', disableFilters: true },
      { Header: 'Total Meetings', accessor: 'totalMeetings', disableFilters: true },
      { Header: 'Total Payment (₹)', accessor: 'totalPayment', disableFilters: true },
      { Header: 'Pending Payment (₹)', accessor: 'paymentPending', disableFilters: true },
      {
        Header: 'Rating',
        accessor: 'reviewStars',
        disableFilters: true,
        Cell: ({ value }) => (
          <span style={{ color: '#f39c12', fontSize: '18px' }}>
            {'★'.repeat(value) + '☆'.repeat(5 - value)}
          </span>
        )
      },
      { Header: 'Review Text', accessor: 'reviewText', disableFilters: true },
      { Header: 'Total Cancellations', accessor: 'totalCancellations', disableFilters: true },
      {
        Header: 'Satisfaction',
        accessor: 'satisfaction',
        disableFilters: true,
        Cell: ({ value }) => (
          <span className={`badge ${value ? 'bg-success' : 'bg-danger'}`}>
            {value ? 'Yes' : 'No'}
          </span>
        )
      }
    ],
    [navigate]
  );

  const defaultColumn = React.useMemo(() => ({ Filter: DefaultColumnFilter }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setAllFilters,
    setSortBy,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageIndex: 0, pageSize: 5 } },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleSort = (columnId, direction) => {
    setSortBy([{ id: columnId, desc: direction === 'desc' }]);
  };

  return (
    <div style={{ margin: '96px 0px 0px 261px', width: '82%' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#343a40',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          zIndex: 999
        }}
      >
        ← Back
      </button>

      <div className="card shadow-lg p-4" style={{ backgroundColor: '#fff' }}>
          <h3 className="fw-bold mb-0 text-center"> PREMIUM PARTNERS DETAILS  </h3>
        <div className="d-flex justify-content-between align-items-center mb-4">
        </div>

        <div className="mb-3">
          <button
            onClick={() => {
              setAllFilters([]);
              setSortBy([]);
              gotoPage(0);
            }}
            className="btn btn-outline-primary"
          >
            Reset Filters
          </button>
        </div>

        <div className="table-responsive">
          <table {...getTableProps()} className="table table-striped table-hover align-middle">
            <thead className="table-light">
              {headerGroups.map((headerGroup, i) => (
                <React.Fragment key={i}>
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                      <th key={idx} style={{ whiteSpace: 'nowrap' }}>
                        {column.render('Header')}
                        {column.canSort && (
                          <span className="ms-2">
                            <button
                              onClick={() => handleSort(column.id, 'asc')}
                              className="btn btn-sm btn-light"
                            >
                              🔼
                            </button>
                            <button
                              onClick={() => handleSort(column.id, 'desc')}
                              className="btn btn-sm btn-light"
                            >
                              🔽
                            </button>
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {headerGroup.headers.map((column, idx) => (
                      <th key={idx}>
                        {column.canFilter ? column.render('Filter') : null}
                      </th>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i}>
                    {row.cells.map((cell, idx) => (
                      <td
                        key={idx}
                        style={{
                          maxWidth: '200px',
                          overflowX: 'auto',
                          whiteSpace: 'nowrap',
                          textAlign: 'center'
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
          <button
            className="btn btn-outline-dark"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            ⏮ First
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            ← Prev
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next →
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Last ⏭
          </button>
          <span className="ms-3">
            Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="form-select w-auto ms-2"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
