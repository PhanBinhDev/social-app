-- Profile
-- Bảng profiles mở rộng thông tin user
CREATE TABLE if not exists public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, -- Liên kết với auth.users
    username TEXT UNIQUE, -- Tên người dùng
    avatar_url TEXT, -- URL ảnh đại diện
    bio TEXT, -- Giới thiệu
    role TEXT DEFAULT 'user', -- Vai trò (user, admin, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- enable RLS for profile
ALTER table public.profiles enable row level security;

CREATE POLICY "Allow logged-in user to read their profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id); -- Chỉ cho phép đọc nếu `id` trùng với `auth.uid()`

CREATE POLICY "Allow logged-in user to update their profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id); -- Chỉ cho phép cập nhật nếu `id` trùng với `auth.uid()`
CREATE POLICY "Allow user to insert their profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id); -- Chỉ cho phép chèn nếu `id` trùng với `auth.uid()`

CREATE POLICY "Allow logged-in user to delete their profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = id); -- Chỉ cho phép xóa nếu `id` trùng với `auth.uid()`


SELECT * FROM public.profiles; -- Nếu không khớp chính sách, query sẽ trả về kết quả rỗng.
