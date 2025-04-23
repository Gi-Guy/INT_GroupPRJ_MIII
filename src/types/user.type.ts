export type Gender = 'male' | 'female' | 'other';

export interface User {
    id: string;
    password: string;    
    username: string;
    gender: Gender;
    registeredAt: number;
}