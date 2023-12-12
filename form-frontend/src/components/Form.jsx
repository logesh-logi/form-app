import { useState, useEffect } from "react";
// import Display from "./Display";
import "./Form.css";
import { useForm } from "react-hook-form";

function Form() {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const [employees, setEmployees] = useState([]);
  const getData = () => {
    const url = import.meta.env.PROD
      ? "/api/getEmp"
      : "http://localhost:3000/api/getEmp";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const url = import.meta.env.PROD
      ? "/api/getEmp"
      : "http://localhost:3000/api/getEmp";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (data) => {
    const url = import.meta.env.PROD
      ? "/api/newEmp"
      : "http://localhost:3000/api/newEmp";
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        getData();
        reset();
      }
    });
  };

  return (
    <div>
      {/* form to get input */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">FirstName</label>
        <input
          type="text"
          id="firstName"
          {...register("firstName", {
            required: "please enter your FirstName",
          })}
        />
        {errors.firstName && (
          <p className="errmsg">{errors.firstName.message}</p>
        )}
        <label htmlFor="lastName">lastName</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName", {
            required: "please enter your lastName",
          })}
        />
        {errors.lastName && <p className="errmsg">{errors.lastName.message}</p>}
        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          id="designation"
          {...register("designation", {
            required: "please enter your Desgination",
          })}
        />
        {errors.designation && (
          <p className="errmsg">{errors.designation.message}</p>
        )}
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          {...register("department", {
            required: "please enter your department",
          })}
        />
        {errors.department && (
          <p className="errmsg">{errors.department.message}</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />

        {errors.email && <p className="errmsg">{errors.email.message}</p>}
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          id="salary"
          {...register("salary", {
            required: true,
            min: 0,
          })}
        />
        {errors.salary && <p className="errmsg">please enter valid salary</p>}
        <label htmlFor="phoneNumber">PhoneNumber</label>
        <input
          type="number"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: true,
            maxLength: 10,
          })}
        />
        {errors.phoneNumber && (
          <p className="errmsg">please enter valid phoneNumber</p>
        )}
        <label htmlFor="dob">Dob</label>
        <input
          type="date"
          id="dob"
          {...register("dob", {
            required: true,
            min: "1980-01-01",
            max: "2005-12-31",
          })}
        />
        {errors.dob && <p className="errmsg">please enter valid dob</p>}
        <label htmlFor="joinDate">Join Date</label>
        <input
          type="date"
          id="joinDate"
          {...register("joinDate", {
            required: true,
            min: "2023-01-01",
            max: "2023-12-11",
          })}
        />
        {errors.joinDate && (
          <p className="errmsg">please enter valid joinDate</p>
        )}
        <button>submit</button>
      </form>

      {/* Displaying employees details */}
      <div className="details">
        <h2>Employee Details</h2>
        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Salary</th>
              <th>dob</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.phonenumber}</td>
                <td>{employee.designation}</td>
                <td>{employee.department}</td>
                <td>{new Date(employee.joindate).toLocaleDateString()}</td>
                <td>{employee.salary}</td>

                <td>{new Date(employee.dob).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Form;
