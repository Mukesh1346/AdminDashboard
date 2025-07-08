import React, { useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination
} from 'react-table';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DefaultColumnFilter = ({ column: { filterValue, setFilter, Header } }) => (
  <input
    style={{
      width: '100%',
      padding: '6px 8px',
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

const data = [
  {
    id: 1,
    user1: 'Aman Singh',
    user2: 'Priya Sharma',
    datetime: '2025-07-05 16:00',
    location: 'Delhi',
    place: 'The Taj Cafe',
    bookedBy: 'Aman Singh',
    price: '₹500',
    genderU1: 'Male',
    genderU2: 'Female',
    aadhaarU1: '1234-****-9012',
    aadhaarU2: '2345-****-0123',
    liveImage: '/user.jpeg',
    status: 'Complete'
  },
    {
    id: 2,
    user1: 'Mukesh Singh',
    user2: 'janavi Sharma',
    datetime: '2025-08-05 16:00',
    location: 'Delhi',
    place: 'The Taj Cafe',
    bookedBy: 'Mukesh Singh',
    price: '₹2500',
    genderU1: 'Male',
    genderU2: 'Female',
    aadhaarU1: '1234-****-9044',
    aadhaarU2: '2345-****-0166',
    liveImage: '/user.jpeg',
    status: 'Complete'
  },
    {
    id: 3,
    user1: 'hardeep Singh',
    user2: 'Riya Sharma',
    datetime: '2025-07-05 16:00',
    location: 'Delhi',
    place: 'The Taj Cafe',
    bookedBy: 'Aman Singh',
    price: '₹3500',
    genderU1: 'Male',
    genderU2: 'Female',
    aadhaarU1: '1234-****-9002',
    aadhaarU2: '2345-****-1113',
    liveImage: '/user.jpeg',
    status: 'Complete'
  },
    {
    id: 4,
    user1: 'komal Singh',
    user2: 'javid khan',
    datetime: '2025-07-05 16:00',
    location: 'Delhi',
    place: 'The Taj Cafe',
    bookedBy: 'komal Singh',
    price: '₹5100',
    genderU1: 'Male',
    genderU2: 'Female',
    aadhaarU1: '1234-****-9012',
    aadhaarU2: '2345-****-0123',
    liveImage: '/user.jpeg',
    status: 'Complete'
  },
    {
    id: 5,
    user1: 'Rohan Singh',
    user2: 'Sunita Sharma',
    datetime: '2025-07-05 16:00',
    location: 'Delhi',
    place: 'The Taj Cafe',
    bookedBy: 'rohit Singh',
    price: '₹3500',
    genderU1: 'Male',
    genderU2: 'Female',
    aadhaarU1: '1234-****-9012',
    aadhaarU2: '2345-****-0123',
    liveImage: '/user.jpeg',
    status: 'Complete'
  },
  // Add more data as needed...
];

export default function CoupleMeetingsTable() {
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      { Header: 'Meeting ID', accessor: 'id', Filter: DefaultColumnFilter },
      { Header: 'User 1', accessor: 'user1', Filter: DefaultColumnFilter },
      { Header: 'User 2', accessor: 'user2', Filter: DefaultColumnFilter },
      { Header: 'Date & Time', accessor: 'datetime', Filter: DefaultColumnFilter },
      { Header: 'Location', accessor: 'location', Filter: DefaultColumnFilter },
      { Header: 'Place', accessor: 'place', Filter: DefaultColumnFilter },
      { Header: 'Booked By', accessor: 'bookedBy', Filter: DefaultColumnFilter },
      { Header: 'Price', accessor: 'price', Filter: DefaultColumnFilter },
      { Header: 'Gender (U1)', accessor: 'genderU1', Filter: DefaultColumnFilter },
      { Header: 'Gender (U2)', accessor: 'genderU2', Filter: DefaultColumnFilter },
      { Header: 'Aadhaar (U1)', accessor: 'aadhaarU1', Filter: DefaultColumnFilter },
      { Header: 'Aadhaar (U2)', accessor: 'aadhaarU2', Filter: DefaultColumnFilter },
      {
        Header: 'Live Image',
        accessor: 'liveImage',
        disableFilters: true,
        Cell: ({ value, row }) => (
          <img
            src={value}
            alt="Live"
            width={50}
            height={50}
            style={{ cursor: 'pointer', borderRadius: '8px', objectFit: 'cover' }}
            onClick={() => setSelectedRow(row.original)}
          />
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: DefaultColumnFilter,
        Cell: ({ value }) => (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold',
            color: value === 'Complete' ? 'green' : 'orange'
          }}>
            {value === 'Complete' ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {value}
          </div>
        )
      }
    ],
    []
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
    pageSize,
    setPageSize
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

  const handleSortReset = () => {
    setAllFilters([]);
    setSortBy([]);
    gotoPage(0);
  };

  return (
    <section style={{ margin: "96px 0px 0px 261px", width: "82%" }}>
      <div style={{ padding: '20px' }}>
        
        {/* Back & Reset Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate(-1)} style={{
            padding: "8px 16px", backgroundColor: "#007bff", color: "#fff",
            border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px"
          }}>← Back</button>

          <button onClick={handleSortReset} style={{
            padding: "8px 16px", backgroundColor: "#28a745", color: "#fff",
            border: "none", borderRadius: "4px", cursor: "pointer"
          }}>Reset Filters & Sort</button>
        </div>

        <h2>Couple Meetings</h2>

        <div style={{ overflowX: 'auto', borderRadius: '8px' }}>
          <table {...getTableProps()} className="table table-bordered table-hover"
            style={{ minWidth: '1400px', background: '#fff', fontSize: '14px' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <React.Fragment key={headerGroup.id}>
                  <tr {...headerGroup.getHeaderGroupProps()} style={{ background: '#f1f1f1' }}>
                    {headerGroup.headers.map(column => (
                      <th key={column.id} style={{
                        padding: '12px 20px', whiteSpace: 'nowrap', verticalAlign: 'middle'
                      }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                          <span>{column.render('Header')}</span>
                          {column.canSort && (
                            <span style={{ marginLeft: '8px' }}>
                              <button onClick={() => column.toggleSortBy(false)} style={{
                                background: 'none', border: 'none', cursor: 'pointer'
                              }}>🔼</button>
                              <button onClick={() => column.toggleSortBy(true)} style={{
                                background: 'none', border: 'none', cursor: 'pointer'
                              }}>🔽</button>
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {headerGroup.headers.map(column => (
                      <th key={column.id} style={{ padding: '10px 20px' }}>
                        {column.canFilter ? column.render('Filter') : null}
                      </th>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} style={{ verticalAlign: 'middle' }}>
                    {row.cells.map(cell => (
                      <td key={cell.column.id} style={{
                        padding: '12px 20px', whiteSpace: 'nowrap'
                      }}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex gap-2 align-items-center mt-3 flex-wrap">
          <button className="btn btn-outline-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>⏮ First</button>
          <button className="btn btn-outline-dark" onClick={() => previousPage()} disabled={!canPreviousPage}>← Prev</button>
          <button className="btn btn-outline-dark" onClick={() => nextPage()} disabled={!canNextPage}>Next →</button>
          <button className="btn btn-outline-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>
          <span>Page <strong>{pageOptions.indexOf(page[0]) + 1}</strong> of {pageOptions.length}</span>
          <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}
            className="form-select" style={{ width: 'auto' }}>
            {[5, 10, 20].map(size => (
              <option key={size} value={size}>Show {size}</option>
            ))}
          </select>
        </div>

        {/* Modal for Image Preview */}
        {selectedRow && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Live Meeting Image</h5>
                  <button className="btn-close" onClick={() => setSelectedRow(null)}></button>
                </div>
                <div className="modal-body text-center">
                  <img src={selectedRow.liveImage} alt="Live Preview"
                    style={{ width: '100%', borderRadius: '10px' }} />
                  <p className="mt-3">
                    <strong>{selectedRow.user1}</strong> & <strong>{selectedRow.user2}</strong><br />
                    {selectedRow.datetime} at {selectedRow.place}, {selectedRow.location}
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedRow(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
