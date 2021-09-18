<?php

namespace App\Controllers;


use CodeIgniter\RESTful\ResourceController;
use phpDocumentor\Reflection\Types\Integer;

class NoteController extends ResourceController
{
    /**
     * Propiedades protegidas para los modelos usados por este controlador
     * y el formato de respuesta
     *
     */
    protected $modelName = 'App\Models\NoteModel';
    protected $format = 'json';

    /**
     * Lista todos las notas en formato json
     *
     * @return resource
     */
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    /**
     * Crea una nota
     *
     * @return void
     */
    public function create()
    {
        //Recibimos los datos
        $dataNote = $this->request->getJSON(true);
        //Validamos y recuperamos el id si pasa la validacion
        if (!$id = $this->model->insert($dataNote)) {
            return $this->failValidationErrors($this->model->errors());
        }

        //Recuperamos la nota por el id
        $note = $this->model->find($id);
        //Retornamos la nota creada
        return $this->respondCreated(['message' => 'Registro Creado Correctamente.', 'data' => $note]);
    }

    /**
     * Modifica un nota
     *
     * @param [int] $id
     * @return void
     */
    public function update($id = null)
    {
        //Recibimos los datos
        $dataNote = $this->request->getJSON(true);
        //Sino viene nada no se realiza ninguna accion
        if (empty($dataNote)) {
            return $this->failValidationErrors('Nada para Actualizar.');
        }
        //Si el registro no se encuentra
        if (!$this->model->find($id)) {
            return $this->failNotFound();
        }
        //Actulizamos y validamos
        if (!$this->model->update($id, $dataNote)) {
            return $this->failValidationErrors($this->model->errors());
        }
        //Si esta todo bien
        return $this->respondUpdated([
            'messages' => 'La Nota se Actualizo Correctamente.',
            'data' => $this->model->find($id),
        ]);
    }

    /**
     * Elimina un nota
     *
     * @param [type] $id
     * @return void
     */
    public function delete($id = null)
    {
        //Si el registro no se encuentra
        if (!$this->model->find($id)) {
            return $this->failNotFound();
        }

        //Eliminamos el registro con el id
        $this->model->where('id', $id)->delete();
        //Si esta todo bien
        return $this->respondDeleted([
            'messages' => "La Nota con ID {$id} se Elimino Correctamente."
        ]);
    }
}
