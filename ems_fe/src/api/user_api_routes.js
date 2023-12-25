import axios from "axios";

export const getAllEmployee = async () => {
  const response = await axios.get("http://localhost:8080/getUsers");
  return response;
};

export const getFilterEmployee = async (params) => {
  const response = await axios.get("http://localhost:8080/filterUsers", {
    params,
  });
  return response;
};

export const createEmployee = async (formData) => {
  const response = await axios.post(
    "http://localhost:8080/createUser",
    formData
  );
  return response;
};

export const deleteOneEmployee = async (id) => {
  const response = await axios.delete(`http://localhost:8080/deleteUser/${id}`);
  return response;
};

export const getEmployeeDetails = async (id) => {
  const response = await axios.get(`http://localhost:8080/getUser/${id}`);
  return response;
};

export const updateEmployeeDetails = async (id, employee) => {
  const response = await axios.put(
    `http://localhost:8080/updateUser/${id}`,
    employee
  );
  return response;
};

export const getUpCommingRetireEmployee = async (params) => {
  const response = await axios.get(
    "http://localhost:8080/getUsersRetiringSoon",
    {
      params,
    }
  );
  return response;
};
