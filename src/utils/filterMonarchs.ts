import { IMonarch } from "../models/IMonarch";
import { IQueryParams } from "../models/IQueryParams";

export const filterMonarchs = (data: IMonarch[], query: IQueryParams) => {
  let filteredData = [...data];

  const { regnalName, birthYear, deathYear, birthPlace, religion, burialPlace } =
    query;

  if (regnalName) {
    const lowerName = regnalName.toLowerCase();
    filteredData = filteredData.filter((monarch) =>
      monarch.regnalName.toLowerCase().includes(lowerName)
    );
  }

  if (birthYear) {
    filteredData = filteredData.filter(
      (monarch) => monarch.birthYear === Number(birthYear)
    );
  }

  if (deathYear) {
    filteredData = filteredData.filter(
      (monarch) => monarch.deathYear === Number(deathYear)
    );
  }

  if (birthPlace) {
    filteredData = filteredData.filter(
      (monarch) => monarch.birthPlace.toLowerCase() === birthPlace.toLowerCase()
    );
  }

  if (religion) {
    filteredData = filteredData.filter(
      (monarch) => monarch.religion.toLowerCase() === religion.toLowerCase()
    );
  }

  if (burialPlace) {
    filteredData = filteredData.filter(
      (monarch) => monarch.burialPlace.toLowerCase() === burialPlace.toLowerCase()
    );
  }

  return filteredData;
};
