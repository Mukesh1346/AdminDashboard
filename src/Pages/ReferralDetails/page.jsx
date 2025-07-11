import React, { useState } from "react";
import { Table, Button, Badge, Form, Row, Col, Card } from "react-bootstrap";
import { CheckCircle, XCircle, Gear } from "react-bootstrap-icons";

const referrals = [
  {
    id: 1,
    referrer: "Priya Sharma",
    referrerId: "1023",
    code: "PRIYA100",
    referredUser: "Amit Jain",
    referredId: "1055",
    date: "2025-07-08",
    reward: "₹100",
    rewardType: "Cashback",
    status: "Pending",
  },
  {
    id: 2,
    referrer: "Ravi Verma",
    referrerId: "1018",
    code: "RAVI100",
    referredUser: "Sonia Singh",
    referredId: "1070",
    date: "2025-07-05",
    reward: "7-day Premium",
    rewardType: "Free Premium",
    status: "Approved",
  },
];

const rewardsHistory = [
  {
    id: 1,
    user: "Priya Sharma",
    amount: "₹100",
    method: "UPI",
    date: "2025-07-09",
  },
];

const ReferralProgram = () => {
  const [rewardPerReferral, setRewardPerReferral] = useState("₹100");
  const [autoApprove, setAutoApprove] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge bg="warning" text="dark" className="rounded-pill">Pending</Badge>;
      case "Approved":
        return <Badge bg="success" className="rounded-pill">Approved</Badge>;
      case "Rejected":
        return <Badge bg="danger" className="rounded-pill">Rejected</Badge>;
      default:
        return <Badge bg="secondary" className="rounded-pill">Unknown</Badge>;
    }
  };

  return (

    <div style={{ margin: "96px 0px 0px 261px", width: "82%" }}>
    <div className="container py-5">
      <h2 className="text-primary mb-4 fw-bold text-center">REFERRAL PROGRAM</h2>

      {/* Summary Cards */}
      <Row className="mb-4 g-3">
        {[
          { title: "Total Referrals", value: "120", bg: "primary" },
          { title: "Successful Referrals", value: "85", bg: "success" },
          { title: "Rewards Given", value: "₹8,500", bg: "info" },
          { title: "Pending Rewards", value: "₹1,200", bg: "warning" },
        ].map((card, i) => (
          <Col md={3} key={i}>
            <Card className={`shadow border-0 text-white bg-${card.bg}`}>
              <Card.Body className="text-center">
                <Card.Title>{card.title}</Card.Title>
                <h3 className="fw-bold">{card.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Referral Table */}
      <Card className="shadow-sm border-0 mb-5">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">Referral Activity</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Referrer</th>
                  <th>Code</th>
                  <th>Referred</th>
                  <th>Date</th>
                  <th>Reward</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r, idx) => (
                  <tr key={r.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{r.referrer}</strong><br />
                      <small className="text-muted">#{r.referrerId}</small>
                    </td>
                    <td>{r.code}</td>
                    <td>
                      {r.referredUser}<br />
                      <small className="text-muted">#{r.referredId}</small>
                    </td>
                    <td>{r.date}</td>
                    <td>{r.reward}</td>
                    <td>{r.rewardType}</td>
                    <td>{getStatusBadge(r.status)}</td>
                    <td className="text-center">
                      <Button size="sm" variant="outline-success" className="me-2">
                        <CheckCircle className="me-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline-danger">
                        <XCircle className="me-1" /> Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Reward History Table */}
      <Card className="shadow-sm border-0 mb-5">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">Reward History</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="mb-0 table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Reward</th>
                  <th>Method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {rewardsHistory.map((r, idx) => (
                  <tr key={r.id}>
                    <td>{idx + 1}</td>
                    <td>{r.user}</td>
                    <td>{r.amount}</td>
                    <td>{r.method}</td>
                    <td>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Referral Settings */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold"><Gear className="me-2" />Referral Settings</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="rewardPerReferral">
                  <Form.Label>Reward per Referral</Form.Label>
                  <Form.Control
                    type="text"
                    value={rewardPerReferral}
                    onChange={(e) => setRewardPerReferral(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Form.Check
                  type="switch"
                  id="autoApprove"
                  label="Auto Approve Referrals"
                  checked={autoApprove}
                  onChange={() => setAutoApprove(!autoApprove)}
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Save Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    </div>
  );
};

export default ReferralProgram;
