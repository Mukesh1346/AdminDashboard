import React from 'react';
import { Link } from 'react-router-dom';

export default function Page() {
  return (
    <section>
      <div style={{ margin: "96px 0px 0px 261px", width: "82%" }}>

        <h1 className="text-center mb-2">Earn Members</h1>
        <p className="text-center mb-4">This page is under development. Please check back later.</p>
         <div className="mt-4 mb-3">
        <Link to="/edit-members">
         <button className="btn btn-success d-flex align-items-center gap-2">
            ➕ Add New Member
          </button>
        </Link>
        </div>
 

        <div className="table-responsive" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff" }}>
          <table className="table table-bordered table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th style={{ padding: "14px" }}>Name</th>
                <th style={{ padding: "14px" }}>Address</th>
                <th style={{ padding: "14px" }}>Method</th>
                <th style={{ padding: "14px" }}>Price</th>
                <th style={{ padding: "14px" }}>Edit</th>
                <th style={{ padding: "14px" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px" }}>John Doe</td>
                <td style={{ padding: "12px" }}>123 Main St, City, Country</td>
                <td style={{ padding: "12px" }}>Credit Card</td>
                <td style={{ padding: "12px" }}>$100</td>
                <td style={{ padding: "12px" }}>
                  <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                    ➕ Edit
                  </button>
                </td>
                <td style={{ padding: "12px" }}>
                  <button className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                    🗑️ Delete
                  </button>
                </td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>Jane Smith</td>
                <td style={{ padding: "12px" }}>456 Elm St, City, Country</td>
                <td style={{ padding: "12px" }}>PayPal</td>
                <td style={{ padding: "12px" }}>$150</td>
                <td style={{ padding: "12px" }}>
                  <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                    ➕ Edit
                  </button>
                </td>
                <td style={{ padding: "12px" }}>
                  <button className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                    🗑️ Delete
                  </button>
                </td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>Mike Johnson</td>
                <td style={{ padding: "12px" }}>789 Oak St, City, Country</td>
                <td style={{ padding: "12px" }}>Bank Transfer</td>
                <td style={{ padding: "12px" }}>$200</td>
                <td style={{ padding: "12px" }}>
                  <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                    ➕ Edit
                  </button>
                </td>
                <td style={{ padding: "12px" }}>
                  <button className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

       
      </div>
    </section>
  );
}
