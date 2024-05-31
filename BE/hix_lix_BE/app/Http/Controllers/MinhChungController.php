<?php

namespace App\Http\Controllers;

use App\Models\dsminhchung;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MinhChungController extends Controller
{
    public function editproof($id, Request $request)
    {
        $EditProof = dsminhchung::where('idfileminhchung', $id)->update([
            'Mota' => $request->mota
        ]);

        if ($EditProof) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công'
            ], 201);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Cập nhật thất bại'
            ], 400);
        }
    }
    public function download($filename)
    {
        // Kiểm tra xem file có tồn tại trong thư mục storage không
        if (Storage::exists('public/' . $filename)) {
            // Trả về response để tải file về
            return Storage::download('public/' . $filename);
        } else {
            // Trả về thông báo lỗi nếu không tìm thấy file
            return response()->json(['error' => 'File not found'], 404);
        }
    }
    public function delete_proof($id)
    {
        $deleteProof = dsminhchung::where('idfileminhchung', $id)->first();

        if ($deleteProof) {
            $filename = basename(parse_url($deleteProof->url, PHP_URL_PATH));


            // Kiểm tra xem file có tồn tại trên hệ thống tệp không
            if (Storage::disk('public')->exists($filename)) {
                // Nếu file tồn tại, thực hiện xóa file
                Storage::disk('public')->delete($filename);

                // Thực hiện các thao tác xóa liên quan khác, nếu cần
                $deleteProof->delete();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Xóa minh chứng thành công'
                ], 201);
            } else {
                // Nếu file không tồn tại, trả về thông báo lỗi
                return response()->json([
                    'status' => 'error',
                    'message' => 'File không tồn tại'
                ], 404);
            }
        }
    }
    public function get_proof_list($id)
    {
        $proofList = dsminhchung::where('IDKhachHang', $id)->get();

        return response()->json([
            'status' => 'success',
            'data' => $proofList
        ], 200);
    }
    public function add_proof(Request $request)
    {
        // return response()->json($request->all());
        $id_nv = auth()->user()->ID_NV;
        $file = $request->file('files');
        $notes = $request->input('note');
        $storedFiles = [];

        // Kiểm tra xem yêu cầu có chứa tệp hay không
        if ($request) {
            $uploadedFiles = $request->file('files');
            foreach ($uploadedFiles as $index => $file) {
                // Đặt tên tệp duy nhất để tránh ghi đè
                $filename = time() . '_' . $file->getClientOriginalName();
                // Lưu trữ tệp trong thư mục 'proofs' trong storage
                $storedPath = $file->storeAs('public', $filename);
                // Đường dẫn truy cập tệp
                $storedUrl = url(Storage::url($storedPath));

                // Thêm thông tin tệp vào mảng phản hồi
                $storedFiles[] = [
                    'original_name' => $file->getClientOriginalName(),
                    'stored_path' => $storedUrl,
                ];

                // Lấy ghi chú tương ứng từ mảng ghi chú
                $note = $notes[$index];


                $insertProof = dsminhchung::insert([
                    'tenfile' => $filename,
                    'url' => $storedUrl,
                    // 'dateCreated' => Carbon::now(),
                    'userCreated' => $id_nv,
                    'IDKhachHang' => $request->ID_KH,
                    'Mota' => $note

                ]);
            }
            if ($insertProof) {
                // Trả về phản hồi JSON với thông tin về các tệp đã tải lên
                return response()->json([
                    'status' => 'success',
                    'message' => 'Upload minh chứng thành công',
                    'uploaded_files' => $storedFiles
                ], 201);
            }
        }

        // Nếu không có tệp trong yêu cầu, trả về phản hồi lỗi
        return response()->json([
            'status' => 'failed',
            'message' => 'Có lỗi xảy ra trong quá trình upload minh chính'
        ], 400);
    }
}
