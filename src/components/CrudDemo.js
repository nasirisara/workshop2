import React, { useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HookService from '../service/HookService';


const CrudDemo = () => {
    const [persons,setPersons] = useState([]);
    const [message, setMessage] = useState({value: '', type: ''});
    const [reload, setReload] = useState(false);
    
    
    useEffect(()=>{
        
        const hookService = new HookService();
        hookService.findAll().then((res)=>{
            console.log("hello happy hackers",res);
            if(res.status === 200){
                setPersons(res.data);
                setMessage({value: 'Operation find all.. Done!', type: 'success'});
            } else {
                
                setMessage({value: 'Operation is Failed!', type: 'danger'});
            }
        });

      
    },[reload]);

    const Table = () => {

        const TableHeader = ()=> {
            return (
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                )
        };

        const TableAction = (props)=> {
            
            const history = useNavigate()

            const showData = () => {
            history(`/details/${props.id}`);
            }

            const deleteById = () => {
           
                const hookService = new HookService();
                hookService.deletePersonById(props.id).then(res => {
                    if(res.status === 202 ){
                        setMessage({value: 'Delete is Done! (id:' + props.id + ')', type: 'success'});
                       
                        setReload(!reload);
                    }else {
                        setMessage({value: 'API Error: '+ res.status, type: 'danger'})
                    }
                });

            }

            const update = () => {
                history(`/updates/${props.id}`);
            }

            return (
            <div>
                <button type="button" className="btn btn-dark" onClick={showData} >Details</button>
                <button type="button" className="btn btn-dark m-2" onClick={deleteById}>Delete</button>
                <button type="button" className="btn btn-dark" onClick={update}>Edit</button>
            </div>)
        };

        const TableRow = ()=> {
            return (
                <tbody>
                {
                    persons.map( (person)=> (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.firstName} {person.lastName}</td>
                            <td>{person.email}</td>
                            <td>{person.title}</td>
                            <td><TableAction id={person.id} /></td>
                        </tr>
                    ))   
                }                     
                </tbody>
            )
        };

        return(
            <div className="container">
                <table className="table table-striped table-dark">
                    <TableHeader/>
                    <TableRow />
                </table>
            </div>
            );
    };

    const Form = () => {

        const {register, handleSubmit, reset, formState: {errors} } = useForm();

        const savePerson = (data) => {
            console.log(data);
            
            const hookService = new HookService();
            hookService.savePerson(data).then(res => {
                if(res.status === 201){
                    
                    setMessage({value: 'Done for person Id:' + res.data.id , type: 'success'});
                     
                    setReload(!reload);
                }else {
                    
                    setMessage({value: 'Error:'+ res.status, type: 'danger'});
                }
            });
        }


        return(
            <>
                <form className="form-control m-2 p-3 bg-dark" onSubmit={handleSubmit(savePerson)}>
                    <div className="row mb-3">
                        <div className="col-6">
                            <input type="text" className="form-control" {...register("firstName", {required: true})} placeholder="Enter FirstName" />
                            {errors.firstName && <span className="text-danger">FirstName is Required!</span>}
                        </div>
                        <div className="col-6">
                            <input type="text" className="form-control" {...register("lastName", {required: true})} placeholder="Enter LastName" />
                            {errors.lastName && <span className="text-danger">LastName is Required!</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" {...register("email", {required: true})} placeholder="Enter Email" />
                            {errors.email && <span className="text-danger">Email is Required!</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" {...register("title")} placeholder="Enter Title" />
                        </div>
                    </div>  
                    <button type="submit" className="btn btn-dark">Add</button>
                    
                    <button type="button" className="btn btn-dark m-2" onClick={()=> reset() }>Reset</button>
                </form>
            </>
        );
    };

    return (
        <div className="container">
            {message && <h6 className={'alert alert-secondary' + message.type}>{message.value}</h6> }
            <h4>Join us and add yourself</h4>
            <Form />
            <h4>Person list</h4>
            <Table />
        </div>
    );
};

export default CrudDemo;