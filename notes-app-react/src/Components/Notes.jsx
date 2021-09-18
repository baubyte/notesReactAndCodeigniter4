import axios from 'axios';
import {useState,React} from 'react';
import Note from './Note'

const Notes = ({notes, setNotes}) => {
    //Estado inicial de los errores
    const initialError= {
        'title': '',
        'body': '',
    }
    //Estado para pintar los errores
    const [error, setError] = useState(initialError)
    const deleteNote = (id,event) =>{
        const newNotes = notes.filter(note => id !== note.id);
        event.preventDefault();
        axios.delete(`http://localhost/api/notes/${id}`).then(payload =>{
            alert(payload.data.messages);
            setNotes(newNotes);
        }).catch(errors =>{
            alert(errors.response.data.messages);
        });
    }
    const updateNote = (newNote) =>{
        let response = axios.put(`http://localhost/api/notes/${newNote.id}`,newNote).then(payload =>{
            //Capturamos el id
            let {id} = payload.data.data;
            setNotes(
                //Iteramos y vemos cuando el id es igual y lo modificamos
                notes.map(note => note.id === id ? payload.data.data : note)
            );
            setError(initialError);
            return true;

        }).catch(errors =>{
            //capturamos los errores
            setError(errors.response.data.messages);
            return false;
        })
        //Retornamos la variable de axios
        return response;
        /* setNotes(
            //Iteramos y vemos cuando el id es igual y lo modificamos
            notes.map(note => note.id === newNote.id ? newNote : note)
        ); */
    }
    return (
        notes.length > 0 ?
        <div className="columns is-multiline">
        {
            notes.map(note => {
                return <Note key={note.id} note={note} deleteNote={deleteNote} updateNote={updateNote} setError={setError} error={error} initialError= {initialError}></Note>;
            })
        }
    </div>
    : <p className="has-text-centered subtitle">No existen Notas</p>
    )
}
export default Notes;