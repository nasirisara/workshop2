
import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HookService from '../service/HookService';



const PersonDetails = () => {
    const params = useParams();
    const [person, setPerson] = useState({id: 0, firstName: '', lastName: '',email: '', title: ''});
    const [setMessage] = useState({value: '', type: ''});
    const history = useNavigate();
    

    useEffect(()=> {
        const hookService = new HookService();
        hookService.getPersonById(params.id).then(res => {
            
            if(res.status === 200){
                console.log(res.data);
                setPerson(res.data);
            }else {
                
                setMessage({value: 'API Err: '+ res.status, type: 'danger'})
            }
        });
    },[]);
    
    return (
        <React.Fragment>
        <div className="container">
            <div className="card border-light"style={{width: '400px' }}>
                <div className="card-header bg-dark text-white">
                    Person Details
                </div>
                <div className="card-bodys">
                    <h5 className="card-title bg-dark">Title : { person.title}</h5>
                    <p className="card text bg-dark "> ID :  { person.id}</p>
                    <p className="card text bg-dark "> Name :  { person.firstName} {person.lastName}</p>
                    <p className="card text bg-dark "> Email :  { person.email}</p>
                    
                </div>
                <div className="card-footer">
                    <button className="btn btn-dark" onClick={()=> history('/crud')}>Back</button>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
};

export default PersonDetails;