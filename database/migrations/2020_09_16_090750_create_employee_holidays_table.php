<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeHolidaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_holidays', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('employee_id');
            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');

            $table->unsignedBigInteger('holiday_id');
            $table->foreign('holiday_id')->references('id')->on('holidays')->onDelete('cascade');

            $table->unsignedBigInteger('days');  
            $table->unsignedBigInteger('manager_id');
            $table->foreign('manager_id')->references('id')->on('employees')->onDelete('cascade');
            $table->string('status');
            $table->string('note');
            $table->date('start_time');
            $table->date('end_time');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_holidays');
    }
}
