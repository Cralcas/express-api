import { IQueryParams } from "../models/IQueryParams";
import { IStartup } from "../models/IStartup";

export const filterStartups = (data: IStartup[], query: IQueryParams) => {
  let filteredData = [...data];

  const { industry, country, continent, is_seeking_funding, has_mvp } = query;
  if (industry) {
    filteredData = filteredData.filter(
      (startup) => startup.industry.toLocaleLowerCase() === industry.toLowerCase()
    );
  }

  if (country) {
    filteredData = filteredData.filter(
      (startup) => startup.country.toLocaleLowerCase() === country.toLowerCase()
    );
  }

  if (continent) {
    filteredData = filteredData.filter(
      (startup) => startup.continent.toLocaleLowerCase() === continent.toLowerCase()
    );
  }

  if (is_seeking_funding) {
    filteredData = filteredData.filter(
      (startup) =>
        startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase())
    );
  }

  if (has_mvp) {
    filteredData = filteredData.filter(
      (startup) => startup.has_mvp === JSON.parse(has_mvp.toLowerCase())
    );
  }

  return filteredData;
};
