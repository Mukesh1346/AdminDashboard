import React, { useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination
} from 'react-table';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Default filter for text input
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
    id: "Luv-1111321",
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
    status: 'Complete',
    rating : 4.5
  },
  {
    id: "Luv-1111321",
    user1: 'Mukesh Singh',
    user2: 'Janavi Sharma',
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
    status: 'Complete',
    rating : 3.5
  },
  // Add more data...
];

export default function CoupleMeetingsTable() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();

  const columns = React.useMemo(() => [
    { Header: 'Meeting ID', accessor: 'id', Filter: DefaultColumnFilter },
    {
      Header: 'Client',
      accessor: 'user1',
      Filter: DefaultColumnFilter,
      Cell: ({ value, row }) => (
        <button
          onClick={() => {
            setSelectedUser({
              name: row.original.user1,
              gender: row.original.genderU1,
              aadhaar: row.original.aadhaarU1,
              phone: '9876543210',
              email: 'user1@example.com',
              city: row.original.location,
              photos: [row.original.liveImage],
              bio: 'User 1 Bio goes here...',
              hobbies: 'Reading, Sports',
              dob: '1995-05-10',
              religion: 'Hindu',
              maritalStatus: 'Single',
              communicationType: 'Chat',
              diet: 'Veg',
              relationshipView: 'Serious',
              interestedIn: 'Female',
              height: '5.9 ft',
              weight: '70 kg',
              figure: 'Fit',
              hairColor: 'Black',
              eyeColor: 'Brown',
            });
            setShowProfileModal(true);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {value}
        </button>
      )
    },
    {
      Header: 'Professional',
      accessor: 'user2',
      Filter: DefaultColumnFilter,
      Cell: ({ value, row }) => (
        <button
          onClick={() => {
            setSelectedUser({
              name: row.original.user2,
              gender: row.original.genderU2,
              aadhaar: row.original.aadhaarU2,
              phone: '9876543210',
              email: 'user2@example.com',
              city: row.original.location,
              photos: [row.original.liveImage],
              bio: 'User 2 Bio goes here...',
              hobbies: 'Music, Dance',
              dob: '1996-08-15',
              religion: 'Hindu',
              maritalStatus: 'Single',
              communicationType: 'Video Call',
              diet: 'Non-Veg',
              relationshipView: 'Casual',
              interestedIn: 'Male',
              height: '5.4 ft',
              weight: '55 kg',
              figure: 'Slim',
              hairColor: 'Brown',
              eyeColor: 'Black',
            });
            setShowProfileModal(true);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {value}
        </button>
      )
    },
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
      Header: 'Rating',
      accessor: 'rating',
      Filter: DefaultColumnFilter,
      Cell: ({ value }) => (
        <span style={{ fontWeight: 'bold', color: '#ff9800' }}>
          {'★'.repeat(Math.floor(value))}{value % 1 ? '½' : ''}
          <span style={{ marginLeft: '4px', color: '#555' }}>({value})</span>
        </span>
      )
    },
    
    
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
        {/* Header Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate(-1)} className="btn btn-primary me-2">← Back</button>
          <button onClick={handleSortReset} className="btn btn-success">Reset Filters & Sort</button>
        </div>

        <h2>Couple Meetings</h2>

        {/* Table */}
        <div style={{ overflowX: 'auto', borderRadius: '8px' }}>
          <table {...getTableProps()} className="table table-bordered table-hover" style={{ minWidth: '1400px', fontSize: '14px' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <React.Fragment key={headerGroup.id}>
                  <tr {...headerGroup.getHeaderGroupProps()} style={{ background: '#f1f1f1' }}>
                    {headerGroup.headers.map(column => (
                      <th key={column.id} style={{ padding: '12px 20px', whiteSpace: 'nowrap' }}>
                        {column.render('Header')}
                        {column.canSort && (
                          <span style={{ marginLeft: '8px' }}>
                            <button onClick={() => column.toggleSortBy(false)} style={{ border: 'none' }}>🔼</button>
                            <button onClick={() => column.toggleSortBy(true)} style={{ border: 'none' }}>🔽</button>
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {headerGroup.headers.map(column => (
                      <th key={column.id}>{column.canFilter ? column.render('Filter') : null}</th>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td key={cell.column.id} style={{ padding: '12px 20px', whiteSpace: 'nowrap' }}>{cell.render('Cell')}</td>
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
          <button className="btn btn-outline-dark" onClick={previousPage} disabled={!canPreviousPage}>← Prev</button>
          <button className="btn btn-outline-dark" onClick={nextPage} disabled={!canNextPage}>Next →</button>
          <button className="btn btn-outline-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>
          <span>Page <strong>{pageOptions.indexOf(page[0]) + 1}</strong> of {pageOptions.length}</span>
          <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="form-select" style={{ width: 'auto' }}>
            {[5, 10, 20].map(size => (<option key={size} value={size}>Show {size}</option>))}
          </select>
        </div>

        {/* Live Image Modal */}
        {selectedRow && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Live Meeting Image</h5>
                  <button className="btn-close" onClick={() => setSelectedRow(null)}></button>
                </div>
                <div className="modal-body text-center">
                <img src={selectedRow.liveImage} alt="Live Preview" style={{ width: '30%', height: '200px', borderRadius: '10px', margin: '5px' }} />
                 <img src={selectedRow.liveImage} alt="Live Preview" style={{ width: '30%',height: '200px', borderRadius: '10px', margin: '5px' }} />
                 <img src={selectedRow.liveImage} alt="Live Preview" style={{ width: '30%',height: '200px',  borderRadius: '10px', margin: '5px' }} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedRow(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Profile Modal */}
        {showProfileModal && selectedUser && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-xl" style={{ width: '80vw', height: '80vh' }}>
              <div className="modal-content" style={{ height: '100%' }}>
                <div className="modal-header">
                  <h5 className="modal-title">User Profile</h5>
                  <button className="btn-close" onClick={() => setShowProfileModal(false)}></button>
                </div>
                <div className="modal-body overflow-auto">
                  <div className="row g-4">
                    <div className="col-md-4">
                      <img src={selectedUser.photos[0]} alt="Profile" className="img-fluid rounded mb-3" style={{ width: '380px', height: '380px', objectFit: 'cover' }} />
                      <div className="d-flex gap-2 overflow-auto">
                        {selectedUser.photos.map((p, i) => (
                          <img key={i} src={p} className="img-thumbnail" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-sm-6"><strong>Name:</strong> {selectedUser.name}</div>
                        <div className="col-sm-6"><strong>Phone:</strong> {selectedUser.phone}</div>
                        <div className="col-sm-6"><strong>Email:</strong> {selectedUser.email}</div>
                        <div className="col-sm-6"><strong>Gender:</strong> {selectedUser.gender}</div>
                        <div className="col-sm-6"><strong>Aadhaar:</strong> {selectedUser.aadhaar}</div>
                        <div className="col-sm-6"><strong>DOB:</strong> {selectedUser.dob}</div>
                        <div className="col-sm-6"><strong>City:</strong> {selectedUser.city}</div>
                        <div className="col-sm-6"><strong>Religion:</strong> {selectedUser.religion}</div>
                        <div className="col-sm-6"><strong>Marital Status:</strong> {selectedUser.maritalStatus}</div>
                        <div className="col-sm-6"><strong>Communication:</strong> {selectedUser.communicationType}</div>
                        <div className="col-sm-6"><strong>Diet:</strong> {selectedUser.diet}</div>
                        <div className="col-sm-6"><strong>Relationship View:</strong> {selectedUser.relationshipView}</div>
                        <div className="col-sm-6"><strong>Interested In:</strong> {selectedUser.interestedIn}</div>
                        <div className="col-sm-6"><strong>Height:</strong> {selectedUser.height}</div>
                        <div className="col-sm-6"><strong>Weight:</strong> {selectedUser.weight}</div>
                        <div className="col-sm-6"><strong>Figure:</strong> {selectedUser.figure}</div>
                        <div className="col-sm-6"><strong>Hair Color:</strong> {selectedUser.hairColor}</div>
                        <div className="col-sm-6"><strong>Eye Color:</strong> {selectedUser.eyeColor}</div>
                        <div className="col-12 mt-3"><strong>Bio:</strong> {selectedUser.bio}</div>
                        <div className="col-12"><strong>Hobbies:</strong> {selectedUser.hobbies}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowProfileModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
