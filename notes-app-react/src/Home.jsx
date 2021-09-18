import { useState, useEffect, React } from 'react';
import Form from './Components/Form';
import Notes from './Components/Notes';
import axios from 'axios';


export default function Dashboard(){
    //Hooks Effect se ejecuta despues de cargar todo el dom
    useEffect(() => {
        axios.get('http://localhost/api/notes').then((payload)=>{
            setNotes(payload.data);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])
    //Hooks states
    const [notes, setNotes] = useState([]);
    //Cambiar el estado
    /* const changeState = ()=>{
        const reg = { id: 6, title: 'nota6', body: 'cuerpo nota 6' };
        setNotes( notes.concat(reg));
    } */
    return (
        <div className="container">
            <h1 className="title has-text-centered mt-5">Listado de Notas</h1>
            <Notes notes={notes} setNotes={setNotes}></Notes>
            <Form notes={notes} setNotes={setNotes}></Form>
        </div>
    )
}

