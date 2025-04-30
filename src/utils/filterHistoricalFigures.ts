import { IQueryParams } from "../models/IQueryParams";
import { IHistoricalFigure } from "../models/IHistoricalFigure";

export const filterHistoricalFigures = (
  data: IHistoricalFigure[],
  query: IQueryParams
) => {
  let filteredData = [...data];

  const { country, continent, birthYear, deathYear, name } = query;

  if (name) {
    const lowerName = name.toLowerCase();
    filteredData = filteredData.filter(
      (figure) =>
        figure.firstName.toLowerCase().includes(lowerName) ||
        (figure.lastName?.toLowerCase().includes(lowerName) ?? false) ||
        figure.nameDisplay.toLowerCase().includes(lowerName)
    );
  }

  if (country) {
    filteredData = filteredData.filter(
      (figure) => figure.country.toLowerCase() === country.toLowerCase()
    );
  }

  if (continent) {
    filteredData = filteredData.filter(
      (figure) => figure.continent.toLowerCase() === continent.toLowerCase()
    );
  }

  if (birthYear) {
    filteredData = filteredData.filter(
      (figure) => figure.birthYear === Number(birthYear)
    );
  }

  if (deathYear) {
    filteredData = filteredData.filter(
      (figure) => figure.deathYear === Number(deathYear)
    );
  }

  return filteredData;
};
