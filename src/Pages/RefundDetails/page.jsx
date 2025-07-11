import React, { useState } from "react";
import { Modal, Button, Table, Form, Badge } from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";// Add icons for better UI

const refundData = [
  {
    User_id: "Luv-111121",
    userName: "Priya Sharma",
    userId: "1023",
    email: "priya@example.com",
    plan: "Luxury",
    amount: 899,
    refundAmount: 899,
    method: "UPI",
    transactionId: "TXN981230",
    reason: "Accidental payment",
    requestDate: "2025-07-09",
    status: "Pending",
    meetingid : "Luv-1234"
  },
  {
    User_id: "Luv-28889",
    userName: "Ravi Verma",
    userId: "1018",
    email: "ravi@example.com",
    plan: "Platinum",
    amount: 1299,
    refundAmount: 1299,
    method: "Card",
    transactionId: "TXN981231",
    reason: "Didn't like service",
    requestDate: "2025-07-08",
    status: "Approved",
    meetingid : "Luv-1255"
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return <Badge bg="warning" text="dark">Pending</Badge>;
    case "Approved":
      return <Badge bg="success">Approved</Badge>;
    case "Rejected":
      return <Badge bg="danger">Rejected</Badge>;
    case "Refunded":
      return <Badge bg="info" text="dark">Refunded</Badge>;
    default:
      return <Badge bg="secondary">Unknown</Badge>;
  }
};

const RefundRequests = () => {
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [search, setSearch] = useState("");

  const filteredData = refundData.filter((item) =>
    item.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ margin: '96px 0px 0px 261px', width: '82%' }}>
    <div className="container mt-5">
        <div className="text-center ">
        <h3 className="text-primary  ">REFUND REQUEST LIST</h3>
        </div>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Form.Control
          type="text"
          placeholder="Search by user name..."
          style={{ maxWidth: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive shadow rounded">
        <Table className="align-middle table-hover" bordered>
          <thead className="bg-dark text-white">
            <tr>
              <th className="text-light">User id</th>
              <th className="text-light" >User</th>
              <th className="text-light">Email</th>
              <th className="text-light">Plan</th>
              <th className="text-light">Amount</th>
              <th className="text-light">Method</th>
              <th className="text-light">Date</th>
              <th className="text-light">Status</th>
              <th className="text-center text-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((refund, index) => (
              <tr key={refund.id}>
                <td>{refund.User_id}</td>
                <td>
                  <strong>{refund.userName}</strong> <br />
                  <small className="text-muted">#{refund.userId}</small>
                </td>
                <td>{refund.email}</td>
                <td>{refund.plan}</td>
                <td>₹{refund.amount}</td>
                <td>{refund.method}</td>
                <td>{refund.requestDate}</td>
                <td>{getStatusBadge(refund.status)}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => setSelectedRefund(refund)}
                  >
                    < BsFillEyeFill className="me-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal
        show={!!selectedRefund}
        onHide={() => setSelectedRefund(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Refund Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRefund && (
            <>
              <p><strong>User:</strong> {selectedRefund.userName} (#{selectedRefund.userId})</p>
              <p><strong>Email:</strong> {selectedRefund.email}</p>
              <p><strong>Plan:</strong> {selectedRefund.plan}</p>
              <p><strong>Paid:</strong> ₹{selectedRefund.amount} via {selectedRefund.method}</p>
              <p><strong>Refund Amount:</strong> ₹{selectedRefund.refundAmount}</p>
              <p><strong>Transaction ID:</strong> {selectedRefund.transactionId}</p>
              <p><strong>Reason:</strong> {selectedRefund.reason}</p>
              <p><strong>Requested On:</strong> {selectedRefund.requestDate}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedRefund.status)}</p>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="success" size="sm">Approve</Button>
                <Button variant="danger" size="sm">Reject</Button>
                <Button variant="primary" size="sm">Mark Refunded</Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
    </div>
  );
};

export default RefundRequests;
