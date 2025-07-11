import React from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination
} from 'react-table';
import { useNavigate } from 'react-router-dom';

// Default filter for text input
const DefaultColumnFilter = ({ column: { filterValue, setFilter, Header } }) => (
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

// Dropdown filter for Payment Method
const PaymentMethodFilter = ({ column: { filterValue, setFilter } }) => (
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
    <option value="Google Pay">Google Pay</option>
    <option value="PhonePay">PhonePay</option>
    <option value="Paytm">Paytm</option>
    <option value="UPI">UPI</option>
    <option value="Card">Card</option>
  </select>
);

export default function SubscriptionDetail() {
  const navigate = useNavigate();

  const data = React.useMemo(() => [
    {
      serial: "Luv-116341",
      name: "Suraj Nath",
      packageName: "Platinum",
      packagePrice: "₹1499",
      duration: "6 Months",
      paymentPrice: "₹1499",
      paymentMethod: "Google Pay",
      transection_id : "110023432222",
      subscriptionDate: "2025-02-01",
      expiryDate: "2025-08-01",
      aadhaar: "123456789012",
      isActive : true,
      phone : "9989098765",
      payment: "Successful"    
    },
    {
      serial: "Luv-116342",
      name: "Lakshita pal",
      packageName: "Luxuary",
      packagePrice: "₹499",
      duration: "1 Month",
      paymentPrice: "₹499",
      paymentMethod: "Paytm",
      transection_id : "110023432222",
      subscriptionDate: "2025-06-01",
      expiryDate: "2025-07-01",
      aadhaar: "987654321098",
         isActive : true,
      phone : "9989098765",
      payment: "Successful"  
    },

    {
        serial: "Luv-116343",
        name: "Mukesh Singh",
        packageName: "Luxuary",
        packagePrice: "₹2499",
        duration: "1 Month",
        paymentPrice: "2499",
        paymentMethod: "Paytm",
        transection_id : "110023432222",
        subscriptionDate: "2025-01-01",
        expiryDate: "2026-01-01",
        aadhaar: "9876543278790",
           isActive : true,
      phone : "9989098765",
      payment: "Pending"  

      },
      {
        serial: "Luv-116344",
        name: "Laxita Nath",
        packageName: "Luxuary",
        packagePrice: "₹2109",
        duration: "1 Month",
        paymentPrice: "₹499",
        paymentMethod: "Paytm",
        transection_id : "110023432222",
        subscriptionDate: "2025-09-01",
        expiryDate: "2025-02-05",
        aadhaar: "987654354324",
           isActive : true,
      phone : "9989098765",
      payment: "Successful"  

      },
      {
        serial: "Luv-116345",
        name: "Sana Khan",
        packageName: "Luxuary",
        packagePrice: "₹1999",
        duration: "3 Month",
        paymentPrice: "1999",
        paymentMethod: "PhonePay",
        transection_id : "110023432222",
        subscriptionDate: "2025-09-01",
        expiryDate: "2025-02-05",
        aadhaar: "987654354324",
           isActive : true,
      phone : "9989098765",
      payment: "Pending"
      },



    // Add more rows here
  ], []);

  const maskAadhaar = num => `****-****-${num.slice(-4)}`;

  const columns = React.useMemo(() => [
    { Header: "Serial No.", accessor: "serial", Filter: DefaultColumnFilter },
    { Header: "User Name", accessor: "name", Filter: DefaultColumnFilter },
    { Header: "Package Name", accessor: "packageName", Filter: DefaultColumnFilter },
    { Header: "Package Price", accessor: "packagePrice", Filter: DefaultColumnFilter },
    { Header: "Duration", accessor: "duration", Filter: DefaultColumnFilter },
    { Header: "Payment Price", accessor: "paymentPrice", Filter: DefaultColumnFilter },
    {
      Header: "Payment Method",
      accessor: "paymentMethod",
      Filter: PaymentMethodFilter
    },
    {
      Header: "Transection Id",
      accessor: "transection_id",
      Filter: PaymentMethodFilter
    },
    { Header: "Subscription Date", accessor: "subscriptionDate", Filter: DefaultColumnFilter },
    { Header: "Expiry Date", accessor: "expiryDate", Filter: DefaultColumnFilter },
    {
      Header: "Aadhaar Number",
      accessor: "aadhaar",
      Filter: DefaultColumnFilter,
      Cell: ({ value }) => maskAadhaar(value)
    },
    {
      Header: "Phone Number",
      accessor: "phone",
      Filter: DefaultColumnFilter
    },
    
    {
      Header: "Payment Status",
      accessor: "payment",
      Filter: DefaultColumnFilter
    },
    {
      Header: "Status",
      accessor: "isActive",
      disableFilters: true,
      Cell: ({ row, value }) => {
        const [active, setActive] = React.useState(value);
    
        return (
          <button
            onClick={() => setActive(prev => !prev)}
            style={{
              padding: '6px 12px',
              backgroundColor: active ? '#28a745' : '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {active ? 'Active' : 'Inactive'}
          </button>
        );
      }
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

  const isExpired = (expiryDate) => {
    const today = new Date();
    return new Date(expiryDate) < today;
  };

  return (
    <div style={{ margin: "96px 0px 0px 261px", width: "82%" }}>
       <h3 className="text-center text-primary">  USERS SUBSCRIPTION DETAILS</h3>
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
      <div style={{ overflowX: 'auto' }}>
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
            const rowData = row.original;
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                style={{
                  backgroundColor: isExpired(rowData.expiryDate) ? "#ffe6e6" : i % 2 === 0 ? "#fff" : "#f9f9f9"
                }}
              >
                {row.cells.map(cell => (
                  <td
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    style={{
                      border: "1px solid #ddd",
                      padding: "5px"
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
      </div>
      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <button className='btn btn-secondary' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>⏮ First</button>
        <button className='btn btn-secondary' onClick={() => previousPage()} disabled={!canPreviousPage}>← Prev</button>
        <button className='btn btn-secondary' onClick={() => nextPage()} disabled={!canNextPage}>Next →</button>
        <button className='btn btn-secondary' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last ⏭</button>

        <span>| Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>

        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
