<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\Test\Fabricator;

class NotesSeeder extends Seeder
{
    public function run()
    {
        //Creamos un fabricator
        $fabricator = new Fabricator(\App\Models\NoteModel::class);
        //Cuantos registros vamos a fabricar
        $fabricator->create(10);
    }
}
