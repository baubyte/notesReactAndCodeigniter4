import axios from 'axios';
import { useState, React } from 'react';

const Form = ({ notes, setNotes }) => {
    //Estado Inicial
    const initialNote = {
        id: '',
        title: '',
        body: ''
    }
    //Estado inicial de los errores
    const initialError= {
        'title': '',
        'body': '',
    }
    //Estado para pintar los errores
    const [error, setError] = useState(initialError)
    //Estado de una nota
    const [note, setNote] = useState(initialNote)
    const addNote = (event) => {
        event.preventDefault();
        //Validamos que no este vacio
        if (note.title.trim() === "" || note.body.trim() === "") {
            return;
        }
        //pasamos los datos
        axios.post('http://localhost/api/notes', note)
            .then((payload) => {
                //actualizamos el estado asi pintamos la nueva nota
                setNotes([
                    //cargamos la notas anteriores
                    ...notes,
                    //cargamos la nueva nota
                    payload.data.data
                ]);
                //Blanqueamos los Inputs
                setNote(initialNote);
                setError(initialError);
            })
            .catch((errors) => {
                //capturamos los errores
                //const {title,body} = errors.response.data.message;
                setError(errors.response.data.messages);
            });
        /* setNotes([
            //El Estado de todas las notas
            ...notes,
            {
                //El estado de la nota actual
                ...note,
                id: notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1
            }
        ]) 
        //Blanqueamos los Inputs
        setNote(initialNote);*/
    }
    return (
        <div className="has-background-success-light p-3">
            <form onSubmit={(event) => addNote(event)}>
                <div className="field">
                    <label className="label" htmlFor="title">
                        Titulo
                    </label>
                    <div className="control">
                        <input className="input" id="title" value={note.title} type="text" onChange={(event) => setNote({ ...note, title: event.target.value })} />
                    </div>
                    <span className="help is-danger">
                        {error.title}
                    </span>
                </div>
                <div className="field">
                    <label className="label" htmlFor="body">
                        Cuerpo
                    </label>
                    <div className="control">
                        <textarea className="textarea" id="body" value={note.body} type="text" onChange={(event) => setNote({ ...note, body: event.target.value })}></textarea>
                    </div>
                    <span className="help is-danger">
                        {error.body}
                    </span>
                </div>
                <button className="button is-success" >Agregar Nota</button>
            </form>
        </div>
    )
}
export default Form;