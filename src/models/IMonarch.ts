export interface IMonarch {
  id: string;
  birthName: string;
  regnalName: string;
  firstName: string;
  regnal?: string;
  house: string;
  birthYear: number;
  deathYear: number;
  reignStart: number;
  reignEnd: number;
  birthPlace: string;
  religion: string;
  burialPlace: string;
  imageUrl: string;
  bio: string;
}

export type NewMonarch = Omit<IMonarch, "id">;
