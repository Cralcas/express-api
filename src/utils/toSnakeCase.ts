function toSnakeCase(input: any) {
  return {
    birth_name: input.birthName,
    regnal_name: input.regnalName,
    first_name: input.firstName,
    regnal: input.regnal,
    house: input.house,
    birth_year: input.birthYear,
    death_year: input.deathYear,
    reign_start: input.reignStart,
    reign_end: input.reignEnd,
    birth_place: input.birthPlace,
    religion: input.religion,
    burial_place: input.burialPlace,
    image_url: input.imageUrl || "/images/image-placeholder.jpeg",
    bio: input.bio,
  };
}
