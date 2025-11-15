import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { getUid } from "../../utils/auth"; // Firebase UID

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // ✅ spinner state added
  const navigate = useNavigate();

  // ✅ Fetch employees for logged-in user
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const uid = getUid();

        if (!uid) {
          console.warn("⚠️ No user logged in — redirecting...");
          navigate("/login");
          return;
        }

        setLoading(true); // ⬅️ Start loader before API call

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/employee/user/${uid}`
        );

        if (!response.ok) {
          console.error("Backend error:", response.status);
          setEmployees([]);
          return;
        }

        const data = await response.json();
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      } finally {
        setLoading(false); // ⬅️ Stop loader after API call
      }
    };

    fetchEmployees();
  }, [navigate]);

  // ✅ Delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Kya aap sach mein delete karna chahte hain?");
    if (!confirmDelete) return;

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/employee/${id}`, {
        method: "DELETE",
      });

      const uid = getUid();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/employee/user/${uid}`
      );
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // ✅ Update employee
  const handleUpdate = (id) => {
    navigate(`/employee/${id}`);
  };

  // ✅ Filter employees safely
  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase()) ||
    emp.email?.toLowerCase().includes(search.toLowerCase()) ||
    emp.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0 p-4">
        <Row className="mb-3">
          <Col>
            <h2 className="text-center text-primary fw-bold">Employee Dashboard</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="🔍 Search by name, email or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow-sm"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Table
              striped
              bordered
              hover
              responsive
              className="shadow-sm text-center align-middle"
            >
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  // 🌀 LOADING SPINNER HERE
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <div className="mt-2 fw-bold text-primary">
                        Loading Employees...
                      </div>
                    </td>
                  </tr>
                ) : filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.department}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleUpdate(employee.id)}
                        >
                          ✏ Update
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(employee.id)}
                        >
                          🗑 Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-muted fw-bold">
                      🚫 No employees found or unauthorized access.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Dashboard;
