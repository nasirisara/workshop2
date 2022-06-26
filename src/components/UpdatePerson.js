import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HookService from '../service/HookService';



const UpdatePerson = () => {
    // state
        const params = useParams();
        const [person, setPerson] = useState({id: 0, firstName: '', lastName: '',email: '', title: ''});
        const [message, setMessage] = useState({value: '', type: ''});
        const history = useNavigate();
        const [reload, setReload] = useState(false);
    
    
        useEffect(()=> {
            const hookService = new HookService();
            hookService.getPersonById(params.id).then(res => {
                
                console.log("Person:" , res);
                if(res.status === 200){
                 
                    setPerson(res.data);
                }else {
                
                    setMessage({value: 'API err: '+ res.status, type: 'danger'})
                }
            });
        },[] );
    
        const Form = () => {
    
            const {register, handleSubmit, reset, formState: {errors} } = useForm();
    
            const savePerson = (data) => {
                
                data.id = person.id;
                
                const hookService = new HookService();
                hookService.updatePerson(data).then(res => {
                    if(res.status === 204){
                        
                        setMessage({value: 'Done for person Id:' + res.data.id , type: 'success'});
                        
                        setReload(!reload);
                    }else {
                        
                        setMessage({value: 'Error:'+ res.status, type: 'danger'});
                    }
                });
    
                
                    history(`/details/${data.id}`);
                history(`/crud/`);
                
            }
    
            return(
                
                <> 
                    <h2>Update person</h2> 
                    { person.firstName}  { person.lastName}  { person.email}  {person.title} 
                    <form className="form-control m-2 p-3 bg-dark" onSubmit={handleSubmit(savePerson)}>
                        <div className="row mb-3">
                            <div className="col-6">
                                <input type="text" className="form-control" {...register("firstName", {required: true})} placeholder="first name" />
                                {errors.firstName && <span className="text-danger">FirstName is Required!</span>}
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" {...register("lastName", {required: true})}placeholder="Last name" />
                                {errors.lastName && <span className="text-danger">LastName is Required!</span>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input type="text" className="form-control" {...register("email", {required: true})}placeholder="Email" />
                                {errors.email && <span className="text-danger">Email is Required!</span>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input type="text" className="form-control" {...register("title")} placeholder="Enter Title" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark">Update</button>
    
                        <button type="button" className="btn btn-dark m-2" onClick={()=> reset() }>Reset</button>
                    </form>
                </>
            );
        };
    
        return (
            <div>
            <Form/> 
            </div>
        );
    };
    export default UpdatePerson;  