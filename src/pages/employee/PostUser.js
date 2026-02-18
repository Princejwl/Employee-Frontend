import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { getIdToken } from "firebase/auth";
import Toast from "../../components/Toast";

const PostUser = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;

      if (!user) {
        setToast({ message: "Please log in first to add an employee.", type: "warning" });
        return;
      }

      const uid = user.uid;
      const token = await getIdToken(user);
      const employeeData = { ...formdata, userId: uid };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(employeeData)
      });

      const data = await response.json();
      console.log("Success:", data);

      setToast({ message: "Employee added successfully!", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error creating employee:", error.message);
      setToast({ message: "Something went wrong while adding employee.", type: "error" });
    }
  };

  return (
    <div className="center-form">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1>Post New Employee</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formdata.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formdata.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={formdata.phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="department"
            placeholder="Enter Department"
            value={formdata.department}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Post Employee
        </Button>
      </form>
    </div>
  );
};

export default PostUser;
