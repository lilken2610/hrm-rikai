<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CompanyService
{
    public function listCompanies(Request $request)
    {
        if ($request->record === null) {
            $record = 20;
        } else {
            $record = $request->record;
        }

        $companies =  Company::where('is_deleted', null)->with('user_create')->with('user_update')->orderBy('id', 'desc')->paginate($record);
        $users = User::all();
        $user = auth()->user();
        $total = $companies->total();

        $data = ['companies' => $companies, 'users' => $users, 'record' => $record, 'user'=> $user, 'total'=> $total];
        return $data;
    }

    public function searchCompanies(Request $request)
    {
        $users = User::all();
        $companyName = $request->companyName;
        $companyDescription = $request->companyDescription;
        $created_at = $request->created_at;
        $updated_at = $request->updated_at;
        $created_by = $request->created_by;
        $updated_by = $request->updated_by;

        $companies = Company::query();

        if (!empty($companyName)) {
            $companies = $companies->where('name', 'like', '%' . $companyName . '%');
        }

        if (!empty($companyDescription)) {
            $companies = $companies->where('description', 'like', '%' . $companyDescription . '%');
        }

        if (!empty($created_at)) {
            $companies = $companies->whereDate('created_at', '=', $created_at);
        }

        if (!empty($updated_at)) {
            $companies = $companies->whereDate('updated_at', '=', $updated_at);
        }

        if (!empty($created_by)) {
            $companies = $companies->where('created_by', $created_by);
        }

        if (!empty($updated_by)) {
            $companies = $companies->where('updated_by', $updated_by);
        }

        if ($request->record === null) {
            $record = 20;
        } else {
            $record = $request->record;
        }

        $companies = $companies->where('is_deleted', null)->with('user_create')->with('user_update')->orderBy('id', 'desc')->paginate($record);

        $total = $companies->total();
        
        $data = ['companies' => $companies,'record' => $record, 'users' => $users, 'total'=> $total];
        return $data;
    }

    public function createCompany(Request $request)
    {
        $request->validate([
            'name' => 'required|min:10|max:255',
            'description' => 'required|min:10|max:10000'
        ]);

        $createCompany = new Company;
        $createCompany->name = $request->name;
        $createCompany->description = $request->description;
        $createCompany->created_by = Auth::id();
        $createCompany->updated_by = Auth::id();
        $createCompany->save();
        return response()->json();
    }

    public function showPageInfoCompany($id)
    {
        $data = Company::where('id', $id)->with('user_create','user_update')->first();
        return response()->json($data);
    }

    public function doUpdateCompany(Request $request)
    {
        $request->validate([
            'name' => 'required|min:10|max:255',
            'description' => 'required|min:10|max:10000'
        ]);

        $id = $request->id;

        $updateCompany = Company::where('id', $id)->first();
        $updateCompany->name = $request->name;
        $updateCompany->description = $request->description;
        $updateCompany->updated_by = Auth::id();
        $updateCompany->save();

        return response()->json([
            'message' => 'Cập nhật thành công'
        ], 200);
    }

    public function doDeleteCompany($id)
    {
        $company = Company::where('id', $id)->first();
        $company->is_deleted = now();
        $company->updated_by = Auth::id();
        $company->save();

        Session()->flash('message_delete', ": $company->name");
        return response()->json([
'message' => 'Xoa thanh cong'
        ], 200);
    }

    public function doDeleteMultipleIds(Request $request)
    {
        $ids = $request->id;

        foreach ($ids as $item) {
            $company = Company::find($item);
            $company->is_deleted = now();
            $company->updated_by = Auth::id();
            $company->save();
        }

        Session()->flash('message_delete', "");
        return back();
    }
}
