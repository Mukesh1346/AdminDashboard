// UserDetailsTableWithModal.jsx
import React, { useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination
} from 'react-table';
import { useNavigate } from 'react-router-dom';

const DefaultColumnFilter = ({ column: { filterValue, setFilter, Header } }) => (
  <input
    style={{
      width: '100%',
      padding: '8px',
      fontSize: '13px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      background: '#f9f9f9'
    }}
    placeholder={`Search ${Header}`}
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
  />
);

export default function Page() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const data = React.useMemo(() => [
    { id: 1, title1: 'Hello', title2: 'World', title3: 'React', title4: 'Table', image: 'https://via.placeholder.com/60' },
    { id: 2, title1: 'Data', title2: 'With', title3: 'Images', title4: 'Example', image: 'https://via.placeholder.com/60' },
    { id: 3, title1: 'Title A', title2: 'Title B', title3: 'Title C', title4: 'Title D', image: 'https://via.placeholder.com/60' },
  ], []);

  const columns = React.useMemo(() => [
    { Header: 'Title 1', accessor: 'title1', Filter: DefaultColumnFilter },
    { Header: 'Title 2', accessor: 'title2', Filter: DefaultColumnFilter },
    { Header: 'Title 3', accessor: 'title3', Filter: DefaultColumnFilter },
    { Header: 'Title 4', accessor: 'title4', Filter: DefaultColumnFilter },
    {
      Header: 'Image', accessor: 'image', disableFilters: true,
      Cell: ({ value }) => <img src={value} alt="Profile" width={50} height={50} style={{ borderRadius: '6px', objectFit: 'cover' }} />
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

      {/* Back Button (Top Left Fixed) */}
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

      {/* Heading */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Data Table with Titles & Images</h2>

      {/* Filter Reset Button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => { setAllFilters([]); setSortBy([]); gotoPage(0); }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >Reset Filters</button>
      </div>

      {/* Table */}
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <React.Fragment key={i}>
                <tr {...headerGroup.getHeaderGroupProps()} style={{ background: '#f1f3f5' }}>
                  {headerGroup.headers.map((column, idx) => (
                    <th key={idx} style={{ padding: '12px', fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #ccc' }}>
                      {column.render('Header')}
                      {column.canSort && (
                        <span>
                          <button onClick={() => handleSort(column.id, 'asc')} style={{ border: 'none' }}>🔼</button>
                          <button onClick={() => handleSort(column.id, 'desc')} style={{ border: 'none' }}>🔽</button>
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
                <tr style={{ backgroundColor: '#fafafa' }}>
                  {headerGroup.headers.map((column, idx) => (
                    <th key={idx} style={{ padding: '8px' }}>
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
                <tr key={i} style={{ borderBottom: '1px solid #eee', backgroundColor: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  {row.cells.map((cell, idx) => (
                    <td key={idx} style={{ padding: '12px', textAlign: 'center'  ,  maxWidth: "150px",  // Adjust width as needed
  overflowX: "auto",
  whiteSpace: "nowrap" }}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button className="btn btn-outline-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>⏮ First</button>
        <button className="btn btn-outline-dark" onClick={() => previousPage()} disabled={!canPreviousPage}>← Prev</button>
        <button className="btn btn-outline-dark" onClick={() => nextPage()} disabled={!canNextPage}>Next →</button>
        <button className="btn btn-outline-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>
        <span>| Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>

      {/* Optional Modal */}
      {show && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">More User Details</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
              </div>
              <div className="modal-body">
                <p>This is where you can show extended details or images.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}




















// import React from 'react'

// export default function detail() {
//   return (
//     <>
//     <div>

//         <section style={{ margin: "96px 0px 0px 261px", width: "82%" }}>
               
//             </section>
//     </div>
    
    
    
//     </>
//   )
// }
