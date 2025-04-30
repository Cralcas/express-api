export interface IHistoricalFigure {
  id: string;
  firstName: string;
  lastName?: string | null;
  regnalNumber?: string | null;
  nameDisplay: string;
  birthYear: number;
  deathYear: number;
  continent: string;
  country: string;
  imageUrl: string;
  bio: string;
}
