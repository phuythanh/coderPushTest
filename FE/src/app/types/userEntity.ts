export interface UserDto {
  id: number;
  fullName: string;
  imageUrl: string;
}

export interface UserResponse extends UserDto {}

export interface UserDetailResponse extends UserDto {
  age?: number;
}
