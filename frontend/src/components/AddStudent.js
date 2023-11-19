import React,{useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const formData={
      name,
      age,
      gender
    }

    console.log(formData);

      await axios.post('http://localhost:8070/student/add',formData).then((response)=>{  

      // alert("Student Added Successfully !");
      toast.success('Successfully added student!', {
        position: 'top-right', // Position where the notification will appear
        autoClose: 5000, // Auto-close after 3 seconds
      });
      console.log(response.data.message);
      console.log(response.data.testsome);
      setName('');
      setAge('');
      setGender('');

    }).catch((err)=>{
      console.log(err);
    });

  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label htmlFor="exampleInputEmail1 ">Student Name</label>
          <input type="text" className="form-control mt-2 mb-4 w-50" id="name" aria-describedby="emailHelp" placeholder="Enter Student Name" value={name} onChange={(e)=>{setName(e.target.value); console.log(e.target.value);}} required />  
        </div> 

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Student Age</label>
          <input type="text" className="form-control mt-2 mb-4 w-50" id="age" aria-describedby="emailHelp" placeholder="Enter Student Age"  value={age} onChange={(e)=>{setAge(e.target.value); console.log(e.target.value);}} required/>  
        </div> 

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Gender</label>
          <input type="text" className="form-control mt-2 mb-4 w-50" id="gender" aria-describedby="emailHelp" placeholder="Enter Student Gender" value={gender} onChange={(e)=>{setGender(e.target.value); console.log(e.target.value);}} required/>  
        </div> 
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default AddStudent;