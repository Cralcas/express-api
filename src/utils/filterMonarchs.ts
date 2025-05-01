import { IMonarch } from "../models/IMonarch";
import { IQueryParams } from "../models/IQueryParams";
import { kebabCaseToSpace } from "./kebabCaseToSpace";

export const filterMonarchs = (data: IMonarch[], query: IQueryParams) => {
  let filteredData = [...data];

  const {
    regnalName,
    birthName,
    firstName,
    regnal,
    house,
    birthYear,
    deathYear,
    birthPlace,
    religion,
    burialPlace,
  } = query;

  if (firstName) {
    const lowerFirstName = firstName.toLowerCase();
    filteredData = filteredData.filter((monarch) =>
      monarch.firstName.toLowerCase().includes(lowerFirstName)
    );
  }

  if (regnal) {
    filteredData = filteredData.filter(
      (monarch) => monarch.regnal && monarch.regnal === regnal
    );
  }

  if (birthName) {
    const lowerBirthName = kebabCaseToSpace(birthName.toLowerCase());
    filteredData = filteredData.filter((monarch) =>
      monarch.birthName.toLowerCase().includes(lowerBirthName)
    );
  }

  if (regnalName) {
    const lowerName = kebabCaseToSpace(regnalName.toLowerCase());
    filteredData = filteredData.filter((monarch) =>
      monarch.regnalName.toLowerCase().includes(lowerName)
    );
  }

  if (house) {
    const lowerHouse = house.toLowerCase();
    filteredData = filteredData.filter((monarch) =>
      monarch.house.toLowerCase().includes(lowerHouse)
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
    const lowerBirthPlace = birthPlace.toLowerCase();
    filteredData = filteredData.filter((monarch) =>
      monarch.birthPlace.toLowerCase().includes(lowerBirthPlace)
    );
  }

  if (religion) {
    const lowerReligion = religion.toLowerCase();
    filteredData = filteredData.filter((monarch) =>
      monarch.religion.toLowerCase().includes(lowerReligion)
    );
  }

  if (burialPlace) {
    const lowerBurialPlace = burialPlace.toLowerCase();
    filteredData = filteredData.filter((monarch) =>
      monarch.burialPlace.toLowerCase().includes(lowerBurialPlace)
    );
  }

  return filteredData;
};
