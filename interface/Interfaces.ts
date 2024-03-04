export interface Customer {
    id: number; // Assuming ID is an integer, adjust if it's a different type
    name: string;
    surname: string;
    clothes: ClothesDto[];
    contacts: ContactDto[];
}

export interface ClothesDto {
    id: number; // Assuming ID is an integer, adjust if it's a different type
    name: string;
    size: string;
    color: string;
    status: StatusDto;
}

export interface ContactDto {
    id: number; // Assuming ID is an integer, adjust if it's a different type
    type: string;
    contactInfo: string;
}

export interface StatusDto {
    code: string;
    description: string;
}