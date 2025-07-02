import React from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination
} from 'react-table';
import { useNavigate } from 'react-router-dom';

const DefaultColumnFilter = ({
  column: { filterValue, setFilter, Header }
}) => (
  <input
    style={{
      width: '100%',
      padding: '6px',
      fontSize: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    }}
    placeholder={`Search ${Header}`}
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
  />
);

const GenderColumnFilter = ({
  column: { filterValue, setFilter }
}) => (
  <select
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
    style={{
      width: '100%',
      padding: '6px',
      fontSize: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    }}
  >
    <option value="">All</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
);

export default function Banner() {
  const navigate = useNavigate();

  const data = React.useMemo(
    () => [
      { serial: 1, name: "Suraj", age: 69, gender: "Male", marital: "Single" },
      { serial: 2, name: "Anna Smith", age: 34, gender: "Female", marital: "Married" },
      { serial: 3, name: "Raj Patel", age: 30, gender: "Male", marital: "Married" },
      { serial: 4, name: "John Doe", age: 28, gender: "Male", marital: "Single" },
      { serial: 5, name: "Lisa Ray", age: 25, gender: "Female", marital: "Single" },
      { serial: 6, name: "Amit Sharma", age: 32, gender: "Male", marital: "Married" },
      { serial: 7, name: "Meera Jain", age: 27, gender: "Female", marital: "Single" },
      { serial: 8, name: "Karan Singh", age: 35, gender: "Male", marital: "Single" },
      { serial: 9, name: "Neha Verma", age: 29, gender: "Female", marital: "Married" },
      { serial: 10, name: "Deepak Das", age: 31, gender: "Male", marital: "Single" },
      { serial: 11, name: "Suraj", age: 69, gender: "Male", marital: "Single" },
      { serial: 12, name: "Anna Smith", age: 34, gender: "Female", marital: "Married" },
      { serial: 13, name: "Raj Patel", age: 30, gender: "Male", marital: "Married" },
      { serial: 14, name: "John Doe", age: 28, gender: "Male", marital: "Single" },
      { serial: 15, name: "Lisa Ray", age: 25, gender: "Female", marital: "Single" },
      { serial: 16, name: "Amit Sharma", age: 32, gender: "Male", marital: "Married" },
      { serial: 17, name: "Meera Jain", age: 27, gender: "Female", marital: "Single" },
      { serial: 18, name: "Karan Singh", age: 35, gender: "Male", marital: "Single" },
      { serial: 19, name: "Neha Verma", age: 29, gender: "Female", marital: "Married" },
      { serial: 20, name: "Deepak Das", age: 31, gender: "Male", marital: "Single" },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Serial No.",
        accessor: "serial",
        Filter: DefaultColumnFilter
      },
      {
        Header: "Name",
        accessor: "name",
        Filter: DefaultColumnFilter
      },
      {
        Header: "Age",
        accessor: "age",
        Filter: DefaultColumnFilter
      },
      {
        Header: "Gender",
        accessor: "gender",
        Filter: GenderColumnFilter
      },
      {
        Header: "Marital Status",
        accessor: "marital",
        Filter: DefaultColumnFilter
      }
    ],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );

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
    {
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
      {/* Back & Reset Buttons */}
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
                      <div>
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
                      </div>
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

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <button className='btn btn-secondary' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>⏮ First</button>
        <button className='btn btn-secondary' onClick={() => previousPage()} disabled={!canPreviousPage}>← Prev</button>
        <button className='btn btn-secondary' onClick={() => nextPage()} disabled={!canNextPage}>Next →</button>
        <button className='btn btn-secondary' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>

        <span>
          | Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
        </span>

        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
