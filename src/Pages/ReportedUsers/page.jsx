import React from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination
} from 'react-table';
import { useNavigate } from 'react-router-dom';

// Sample data
const reportedUsersData = [
  {
    userId: 101,
    reporterName: "Anita Verma",
    reporterAadhaar: "123456781234",
    reportedName: "Ravi Singh",
    reportedAadhaar: "987654329876",
    message: "Sending inappropriate content.",
    gender: "Female",
    reportDate: "2025-07-03"
  },
  {
    userId: 102,
    reporterName: "John Mehta",
    reporterAadhaar: "223456781234",
    reportedName: "Simran Kaur",
    reportedAadhaar: "887654321234",
    message: "Fake profile suspected.",
    gender: "Male",
    reportDate: "2025-06-28"
  },
  {
    userId: 103,
    reporterName: "Kiran Rao",
    reporterAadhaar: "443456781234",
    reportedName: "Vikram Sharma",
    reportedAadhaar: "887654327890",
    message: "Used abusive language.",
    gender: "Female",
    reportDate: "2025-07-01"
  }
];

// Filters
const DefaultColumnFilter = ({ column: { filterValue, setFilter, Header } }) => (
  <input
    style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
    placeholder={`Search ${Header}`}
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
  />
);

const GenderFilter = ({ column: { filterValue, setFilter } }) => (
  <select
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
    style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
  >
    <option value="">All</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
);

export default function ReportedUsers() {
  const navigate = useNavigate();

  const data = React.useMemo(() => reportedUsersData, []);

  const maskAadhaar = num => `****-****-${num.slice(-4)}`;

  const columns = React.useMemo(() => [
    { Header: "User ID", accessor: "userId", Filter: DefaultColumnFilter },
    { Header: "Reported By", accessor: "reporterName", Filter: DefaultColumnFilter },
    {
      Header: "Reporter Aadhaar",
      accessor: "reporterAadhaar",
      Filter: DefaultColumnFilter,
      Cell: ({ value }) => maskAadhaar(value)
    },
    { Header: "Reported Against", accessor: "reportedName", Filter: DefaultColumnFilter },
    {
      Header: "Reported Aadhaar",
      accessor: "reportedAadhaar",
      Filter: DefaultColumnFilter,
      Cell: ({ value }) => maskAadhaar(value)
    },
    { Header: "Report Message", accessor: "message", Filter: DefaultColumnFilter },
    {
      Header: "Gender",
      accessor: "gender",
      Filter: GenderFilter
    },
    {
      Header: "Date of Report",
      accessor: "reportDate",
      Filter: DefaultColumnFilter
    },
    {
      Header: "Block",
      accessor: "block",
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }) => (
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={() => alert(`Blocked ${row.original.reportedName}`)}
        >
          Block
        </button>
      )
    }
  ], []);

  const defaultColumn = React.useMemo(() => ({
    Filter: DefaultColumnFilter
  }), []);

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
  } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: { pageIndex: 0, pageSize: 5 }
  },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleSort = (columnId, direction) => {
    setSortBy([{ id: columnId, desc: direction === "desc" }]);
  };

  return (
    <div style={{ margin: "96px 0px 0px 261px", width: "82%" }}>
      {/* Header Controls */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          ← Back
        </button>
        <button
          onClick={() => {
            setAllFilters([]);
            setSortBy([]);
            gotoPage(0);
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Reset Filters & Sort
        </button>
      </div>

      {/* Table */}
      <table
        {...getTableProps()}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px"
        }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <React.Fragment key={headerGroup.id}>
              <tr {...headerGroup.getHeaderGroupProps()} style={{ background: "#f2f2f2" }}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      textAlign: "left"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{column.render("Header")}</span>
                      {column.canSort && (
                        <>
                          <button
                            onClick={() => handleSort(column.id, "asc")}
                            style={{
                              fontSize: "12px",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer"
                            }}
                            title="Sort Ascending"
                          >
                            🔼
                          </button>
                          <button
                            onClick={() => handleSort(column.id, "desc")}
                            style={{
                              fontSize: "12px",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer"
                            }}
                            title="Sort Descending"
                          >
                            🔽
                          </button>
                        </>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id + "_filter"}
                    style={{
                      border: "1px solid #ddd",
                      padding: "6px",
                      backgroundColor: "#fafafa"
                    }}
                  >
                    {column.canFilter ? column.render("Filter") : null}
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
              <tr
                key={row.id}
                {...row.getRowProps()}
                style={{
                  backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9"
                }}
              >
                {row.cells.map(cell => (
                  <td
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px"
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <button className='btn btn-secondary' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>⏮ First</button>
        <button className='btn btn-secondary' onClick={() => previousPage()} disabled={!canPreviousPage}>← Prev</button>
        <button className='btn btn-secondary' onClick={() => nextPage()} disabled={!canNextPage}>Next →</button>
        <button className='btn btn-secondary' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>
        <span>| Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
