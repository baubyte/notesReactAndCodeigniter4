import { useState, React } from 'react';

const Note = ({ note, deleteNote, updateNote, setError, error, initialError }) => {
    const [modeEdit, setModeEdit] = useState(false)
    const [item, setItem] = useState(note)
    //Habilitar o deshabilitar 
    const toggle = (event) => {
        event.preventDefault();
        setModeEdit(!modeEdit);
        setError(initialError);
        setItem(note);
    }
    //Modo editar
    const edit = async (event) => {
        event.preventDefault();
        //si se pudo actualizar la nota cerramos el modo edicion
        if(await updateNote(item)){
            setModeEdit(false);
        }
    }
    return (
        <div className="column is-one-quarter">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        ID: {note.id}
                    </p>
                </header>
                <div className="card-content">
                        {
                            modeEdit ?
                            <div className="field">
                                <label className="label" htmlFor="title-card">
                                    Titulo
                                </label>
                                <div className="control">
                                <input name="title-card" className="input" type="text" value={item.title} onChange={(event) => setItem({ ...item, title: event.target.value })} />
                                </div>
                                <span className="help is-danger">
                                    {error.title}
                                </span>
                            </div>
                                : <div> Titulo: {note.title} </div>
                        }
                        {
                            modeEdit ?
                            <div className="field">
                                <label className="label" htmlFor="bodyCard">
                                    Cuerpo
                                </label>
                                <div className="control">
                                <textarea name="bodyCard" className="textarea" type="text" value={item.body} onChange={(event) => setItem({ ...item, body: event.target.value })}></textarea>
                                </div>
                                <span className="help is-danger">
                                    {error.body}
                                </span>
                            </div>
                                : <div> Cuerpo: {note.body}</div>
                        }
                </div>
                <footer className="card-footer">
                    <a href={'/'} onClick={(event) => toggle(event)} className="card-footer-item">{modeEdit ? 'Cancelar' : 'Editar'}</a>
                    {
                        modeEdit ?
                        //Boton guardar solo cuando esta activo el modo editar
                        <a href={'/'} onClick={(event) => edit(event)} className="card-footer-item">Guardar</a>
                        :
                        //Boton eliminar solo cuando no esta activo el modo editar
                        <a href={'/'} onClick={(event) => deleteNote(note.id,event)} className="card-footer-item">Eliminar</a>
                    }
                </footer>
            </div>
        </div>
    )
}
export default Note;