<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EmployeeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->integer('gender');
            $table->string('address');
            $table->integer('identification_card');
            $table->date('day_of_birth');
            $table->integer('company_id')->nullable();      
            $table->timestamp('created_at', 0)->nullable();
            $table->date('created_by', 0);
            $table->timestamp('updated_at', 0)->nullable();
            $table->date('updated_by', 0);
            $table->softDeletes('deleted_at',0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
