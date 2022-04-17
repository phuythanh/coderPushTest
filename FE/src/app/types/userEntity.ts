export interface UserDto {
  id: number;
  fullName: string;
  age: number;
  imageUrl: string;
}

export interface UserResponse extends UserDto {}
