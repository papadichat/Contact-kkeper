import React,{useState,useContext,useEffect} from 'react'
import AlertContext from "../../Context/Alert/AlertContext"
import AuthContext from "../../Context/auth/AuthContext"

export const Register = () => {
    const alertcontext = useContext(AlertContext);
    const authcontext = useContext(AuthContext);

    const {setAlert}= alertcontext;
    const {register,error,clearErrors}= authcontext;

    useEffect(() => {
        if(error==='User already exists'){
            setAlert(error,'danger');
            clearErrors();
        }
       

        
    }, [error])


    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        password2:"",

    });

    const {name,email,password,password2}=user;

    const onChange =(e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const onSubmit =(e) =>{
        e.preventDefault();
        if (name==""||email==""||password==""){
            setAlert('Please set all fields ','danger')
        }else if(password!==password2){
            setAlert('Passwords do not match','danger')
        }else{
            register({
                name,
                email,
                password
            });
        }
    }


    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={password} onChange={onChange}required />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password2</label>
                    <input type="text" name="password2" value={password2} onChange={onChange} required minLength="6"/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
            
        </div>
    )
}

export default Register
