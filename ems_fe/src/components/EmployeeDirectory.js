import React, { useEffect, useState } from 'react'
import EmployeeSearch from './EmployeeSearch'
import EmployeeTable from './EmployeeTable'
import EmployeeCreate from './EmployeeCreate'
import { createUser, getAllUsers } from '../api/user_api_routes'

const EmployeeDirectory = () => {
  const [userData, setUserData] = useState([]);

  const InsertUser = async (userData) => {
    try {
      const response = await createUser(userData);
      if(response.status === 200){
        alert("User Insert Successfully.")
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUserData = async () => {
    try {
      const users = await getAllUsers();
      setUserData(users.data);    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  
  return (
    <>  
      
      <EmployeeCreate InsertUser={InsertUser}/>
      <EmployeeSearch/>
      <EmployeeTable users={userData} />
    </>
  )
}

export default EmployeeDirectory