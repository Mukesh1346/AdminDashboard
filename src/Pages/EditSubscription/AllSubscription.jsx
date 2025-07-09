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

export default function AllSubscriptions() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const sampleData = [
      {
        title: "LuvNestor Plus",
        subtitle: "Full access to select features",
        price: 40,
        activeFeatures: [
          "View members directory",
          "View members profile",
          "Access to groups",
          "Add media to your profile",
          "View site activity"
        ],
        notActiveFeatures: [
          "Send private messages",
          "Access group directory",
          "Create group",
          "Forum admin",
          "Special title"
        ]
      },
      {
        title: "LuvNestor Extra",
        subtitle: "Full access to select features",
        price: 45,
        activeFeatures: [
          "View members directory",
          "View members profile",
          "Access to groups",
          "Add media to your profile",
          "View site activity",
          "Send private messages",
          "Access group directory"
        ],
        notActiveFeatures: [
          "Create group",
          "Forum admin",
          "Special title"
        ]
      },
      {
        title: "LuvNestor Platinum",
        subtitle: "Full access to select features",
        price: 50,
        activeFeatures: [
          "View members directory",
          "View members profile",
          "Access to groups",
          "Add media to your profile",
          "View site activity",
          "Send private messages",
          "Access group directory",
          "Create group",
          "Forum admin",
          "Special title"
        ],
        notActiveFeatures: []
      }
    ];

    // Save to localStorage only if empty
    if (!localStorage.getItem('subscriptions')) {
      localStorage.setItem('subscriptions', JSON.stringify(sampleData));
    }

    const savedData = JSON.parse(localStorage.getItem('subscriptions')) || [];
    setData(savedData);
  }, []);

  const columns = React.useMemo(() => [
    { Header: 'Title', accessor: 'title', Filter: DefaultColumnFilter },
    { Header: 'Subtitle', accessor: 'subtitle', Filter: DefaultColumnFilter },
    { Header: 'Price/Month', accessor: 'price', Filter: DefaultColumnFilter },
    {
      Header: 'Active Features', accessor: 'activeFeatures', disableFilters: true,
      Cell: ({ value }) => (
        <ul style={{ maxHeight: '80px', overflowY: 'auto', paddingLeft: '15px' }}>
          {value.length > 0 ? value.map((f, i) => <li key={i}>{f}</li>) : 'None'}
        </ul>
      )
    },
    {
      Header: 'Not Active Features', accessor: 'notActiveFeatures', disableFilters: true,
      Cell: ({ value }) => (
        <ul style={{ maxHeight: '80px', overflowY: 'auto', paddingLeft: '15px' }}>
          {value.length > 0 ? value.map((f, i) => <li key={i}>{f}</li>) : 'None'}
        </ul>
      )
    },
  ], []);

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
  } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: { pageIndex: 0, pageSize: 5 }
  }, useFilters, useSortBy, usePagination);

  const handleSort = (columnId, direction) => {
    setSortBy([{ id: columnId, desc: direction === 'desc' }]);
  };

  return (
    <div style={{ margin: '96px 0px 0px 261px', width: '82%' }}>

      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '8px 16px',
          backgroundColor: '#343a40',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          zIndex: 999
        }}
      >← Back</button>

      <div className="card shadow-lg p-4" style={{ backgroundColor: '#fff' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">All Subscription Plans</h3>
          <button
            className="btn btn-success rounded-pill px-4 py-2 d-flex align-items-center"
            onClick={() => navigate('/subscriptions')}
          >
            <span className="me-2 fs-5">+</span> Add Subscription
          </button>
        </div>

        <div className="mb-3">
          <button
            onClick={() => { setAllFilters([]); setSortBy([]); gotoPage(0); }}
            className="btn btn-outline-primary"
          >Reset Filters</button>
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
                            <button onClick={() => handleSort(column.id, 'asc')} className="btn btn-sm btn-light">🔼</button>
                            <button onClick={() => handleSort(column.id, 'desc')} className="btn btn-sm btn-light">🔽</button>
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
                      <td key={idx} style={{
                        maxWidth: "200px",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        textAlign: "center"
                      }}>
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
          <button className="btn btn-outline-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>⏮ First</button>
          <button className="btn btn-outline-dark" onClick={() => previousPage()} disabled={!canPreviousPage}>← Prev</button>
          <button className="btn btn-outline-dark" onClick={() => nextPage()} disabled={!canNextPage}>Next →</button>
          <button className="btn btn-outline-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>
          <span className="ms-3">Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="form-select w-auto ms-2"
          >
            {[5, 10, 20, 50].map(size => (
              <option key={size} value={size}>Show {size}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
