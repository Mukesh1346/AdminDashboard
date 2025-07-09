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

const GenderColumnFilter = ({ column: { filterValue, setFilter } }) => (
  <select
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
    style={{
      width: '100%',
      padding: '8px',
      fontSize: '13px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      background: '#f9f9f9'
    }}
  >
    <option value="">All</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
);

export default function Page() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const user = {
    id: 101,
    name: 'Lakshita Sharma',
    email: 'mukesh@example.com',
    gender: 'Male',
    aadhaar: '1234-5678-9012',
    bio: 'Friendly and outgoing individual who enjoys travel and food.',
    communicationType: 'Phone, Chat',
    diet: 'Veg',
    relationshipView: 'Serious',
    maritalStatus: 'Single',
    dob: '1995-07-15',
    religion: 'Hindu',
    city: 'Delhi',
    hobbies: 'Reading, Movies, Gym',
    interestedIn: 'Women',
    height: "5'9\"",
    weight: '70kg',
    figure: 'Athletic',
    hairColor: 'Black',
    eyeColor: 'Brown',
    phone: "7823675483",
    photos: [
      '/user9.jpeg',
      '/user.jpeg',
      '/user8.jpeg',
      '/user6.jpeg',
      '/user5.jpeg',
      '/user4.jpeg'
    ]
  };

  const initialData = React.useMemo(() => [ 
    { id: 1, name: 'Suraj', email: 'suraj@example.com', photo: 'https://i.pinimg.com/736x/f6/99/27/f69927083663ca688fd81a34bcbed40e.jpg', gender: 'Male', aadhaar: '1234-5678-9012', isActive: true  , active: "Yes" },
    { id: 2, name: 'Anna Smith', email: 'anna@example.com', photo: 'https://i.pinimg.com/736x/f2/6b/b7/f26bb762110fb484bf04040edec86b3b.jpg', gender: 'Female', aadhaar: '2345-6789-0123', isActive: false , active: "No" },
    { id: 3, name: 'Raj Patel', email: 'raj@example.com', photo: 'https://i.pinimg.com/736x/95/c0/b0/95c0b00adf7fd5384e322e102fb41c62.jpg', gender: 'Male', aadhaar: '3456-7890-1234', isActive: true  , active: "No"},
    { id: 4, name: 'Lisa Ray', email: 'lisa@example.com', photo: 'https://i.pinimg.com/736x/af/5e/51/af5e516ad10b098cc399eae47fd18148.jpg', gender: 'Female', aadhaar: '4567-8901-2345', isActive: false , active: "Yes" }
  ], []);

  const [userData, setUserData] = useState(initialData);

  const columns = React.useMemo(() => [
    { Header: 'User ID', accessor: 'id', Filter: DefaultColumnFilter },
    { Header: 'Name', accessor: 'name', Filter: DefaultColumnFilter },
    { Header: 'Email', accessor: 'email', Filter: DefaultColumnFilter },
    {
      Header: 'Photo',
      accessor: 'photo',
      disableFilters: true,
      Cell: ({ value }) => <img src={value} alt="Profile" width={40} height={40} style={{ borderRadius: '50%' }} />
    },
    { Header: 'Gender', accessor: 'gender', Filter: GenderColumnFilter },
    { Header: 'Aadhaar', accessor: 'aadhaar', Filter: DefaultColumnFilter },
    {
      Header: 'Status',
      accessor: 'isActive',
      disableFilters: true,
      Cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <button
            style={{
              padding: '6px 12px',
              backgroundColor: isActive ? '#28a745' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
            onClick={() => {
              const updated = userData.map(user =>
                user.id === row.original.id ? { ...user, isActive: !user.isActive } : user
              );
              setUserData(updated);
            }}
          >
            {isActive ? 'Varified' : 'Not-varified'}
          </button>
        );
      }
    },
    {
      Header: 'User-details',
      accessor: 'actions',
      disableFilters: true,
      Cell: ({ row }) => (
        <button
          style={{
            padding: '6px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          onClick={() => setShow(true)}
        >View More</button>
      )
    },
     { Header: 'Active', accessor: 'active', Filter: DefaultColumnFilter },
  ], [userData]);

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
    data: userData,
    defaultColumn,
    initialState: { pageIndex: 0, pageSize: 5 }
  }, useFilters, useSortBy, usePagination);

  const handleSort = (columnId, direction) => {
    setSortBy([{ id: columnId, desc: direction === 'desc' }]);
  };

  return (
    <div style={{ margin: '96px 0px 0px 261px', width: '82%' }}>
                          <h3 className="text-primary text-center">ALL USERS LIST</h3>
                        
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back</button>
        <button onClick={() => { setAllFilters([]); setSortBy([]); gotoPage(0); }} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Reset Filters</button>
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
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
                    <th key={idx} style={{ padding: '8px' }}>{column.canFilter ? column.render('Filter') : null}</th>
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
                    <td key={idx} style={{ padding: '12px' }}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {show && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-xl" style={{ width: '80vw', maxWidth: 'none', height: '80vh' }}>
              <div className="modal-content" style={{ height: '100%' }}>
                <div className="modal-header">
                  <h5 className="modal-title">User Profile</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
                </div>
                <div className="modal-body overflow-auto">
                  <div className="row g-4">
                    <div className="col-md-4">
                      <img src={user.photos[0]} alt="Large" className="img-fluid rounded mb-3" style={{ maxHeight: '50vh', objectFit: 'cover', width: '100%' }} />
                      <div className="d-flex gap-2 overflow-auto">
                        {user.photos.map((photo, index) => (
                          <img key={index} src={photo} alt={`Thumbnail ${index}`} className="img-thumbnail" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-sm-6 mb-2 text-warning"><strong>Name:</strong> {user.name}</div>
                        <div className="col-sm-6 mb-2"><strong>ID:</strong> {user.id}</div>
                        <div className="col-sm-6 mb-2"><strong>Email:</strong> {user.email}</div>
                        <div className="col-sm-6 mb-2"><strong>Gender:</strong> {user.gender}</div>
                        <div className="col-sm-6 mb-2"><strong>Aadhaar:</strong> {user.aadhaar}</div>
                        <div className="col-sm-6 mb-2"><strong>DOB:</strong> {user.dob}</div>
                        <div className="col-sm-6 mb-2"><strong>Religion:</strong> {user.religion}</div>
                        <div className="col-sm-6 mb-2"><strong>City:</strong> {user.city}</div>
                        <div className="col-sm-6 mb-2"><strong>Marital Status:</strong> {user.maritalStatus}</div>
                        <div className="col-sm-6 mb-2"><strong>Communication:</strong> {user.communicationType}</div>
                        <div className="col-sm-6 mb-2"><strong>Diet:</strong> {user.diet}</div>
                        <div className="col-sm-6 mb-2"><strong>Relationship View:</strong> {user.relationshipView}</div>
                        <div className="col-sm-6 mb-2"><strong>Interested In:</strong> {user.interestedIn}</div>
                        <div className="col-sm-6 mb-2"><strong>Height:</strong> {user.height}</div>
                        <div className="col-sm-6 mb-2"><strong>Weight:</strong> {user.weight}</div>
                        <div className="col-sm-6 mb-2"><strong>Figure:</strong> {user.figure}</div>
                        <div className="col-sm-6 mb-2"><strong>Hair Color:</strong> {user.hairColor}</div>
                        <div className="col-sm-6 mb-2"><strong>Eye Color:</strong> {user.eyeColor}</div>
                        <div className="col-12 mt-3"><strong>Bio:</strong><p className="text-muted">{user.bio}</p></div>
                        <div className="col-12"><strong>Hobbies:</strong> {user.hobbies}</div>
                        <div className="col-12"><strong>Phone No:</strong> {user.phone}</div>
                        <button className='btn btn-danger w-25 mt-3'>Block</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                   
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button className="btn btn-outline-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>⏮ First</button>
        <button className="btn btn-outline-dark" onClick={() => previousPage()} disabled={!canPreviousPage}>← Prev</button>
        <button className="btn btn-outline-dark" onClick={() => nextPage()} disabled={!canNextPage}>Next →</button>
        <button className="btn btn-outline-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>
        <span>| Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}>
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
