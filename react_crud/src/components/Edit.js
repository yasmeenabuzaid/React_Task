import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';
 
const Edit = () => {
    const {id}=useParams() 
    const navigate = useNavigate();  
    const clickToBack=()=>{
        navigate('/');
    }
 
    const [userField, setUserField] = useState({
        name: "",
        email: ""
    });
 
    useEffect(()=>{
        fetchUser();
    },[id])
 
    const fetchUser=async()=>{
        try{
            const result=await axios.get("http://127.0.0.1:8000/api/users/"+id);
            setUserField(result.data.users)
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    const changeUser = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }
     
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://127.0.0.1:8000/api/usersupdate/"+id, userField);
            navigate('/');  
        } catch (err) {
            console.log("Something Wrong");
        }
    }
 
    return(
        <div className="container">
            <h1>Edit Form</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label"> ID:</label>
                    <input type="text" className="form-control" id="id" placeholder="Enter Your Full Name" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label"> Full Name:</label>
                    <input type="text" className="form-control" placeholder="Enter Your Full Name" name="name" value={userField.name} onChange={e => changeUser(e)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={userField.email}  onChange={e => changeUser(e)}/>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={userField.password} onChange={e => changeUser(e)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={e=>onSubmitChange(e)}>Update</button>
            </form>
            <div className='container d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={ clickToBack}>Back To Home</button>
            </div>
        </div>
    );
};
 
export default Edit;