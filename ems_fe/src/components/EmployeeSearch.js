import React, { useState } from 'react'

const EmployeeSearch = () => {
  const [searchValue, setSearchValue] = useState();
  
  return (
    <>
    <h2 style={{color:"red",textAlign:"center",backgroundColor:"yellow"}}>SEARCH EMPLOYEE DATA</h2>
      <form>
        <div>
          <input type='text' name="search" style={{padding:5,color:"white",margin:"auto",marginLeft:"5px",textAlign:"center", borderRadius:7}}placeholder='Search here'value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        
        <button style={{padding:5,color:"white",margin:"auto",marginLeft:"5px",textAlign:"center",backgroundColor:"SkyBlue", borderRadius:7}} type='submit'>Search</button>
           
        </div>
      </form>
    </>
  )
}

export default EmployeeSearch