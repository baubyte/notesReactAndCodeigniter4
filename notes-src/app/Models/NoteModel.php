<?php

namespace App\Models;

use Faker\Generator;
use CodeIgniter\Model;

class NoteModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'notes';
    protected $primaryKey           = 'id';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = ['title','body'];

    // Dates
    protected $useTimestamps        = false;
    protected $dateFormat           = 'datetime';
    protected $createdField         = 'created_at';
    protected $updatedField         = 'updated_at';
    protected $deletedField         = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'title'=>[
            'label'=>'Titulo',
            'rules' => 'required'
        ],
        'body'=>[
            'label'=>'Cuerpo',
            'rules' => 'required'
        ],
    ];
    protected $validationMessages   = [
        'title' =>[
            'required' => 'El Campo {field} es Obligatorio',
        ],
        'body' =>[
            'required' => 'El Campo {field} es Obligatorio',
        ],
    ];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks       = true;
    protected $beforeInsert         = [];
    protected $afterInsert          = [];
    protected $beforeUpdate         = [];
    protected $afterUpdate          = [];
    protected $beforeFind           = [];
    protected $afterFind            = [];
    protected $beforeDelete         = [];
    protected $afterDelete          = [];

    /**
     * Undocumented function
     *
     * @param Generator $faker
     * @return void
     */
    public function fake(Generator &$faker)
    {
        return [
            'title'  => $faker->words(2,true),
            'body'  => $faker->sentence(6),
        ];
    }
}
