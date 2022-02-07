export const MoralisQuery = (Moralis, queryParams) => {
  const moralisClass = Moralis.Object.extend(queryParams.className);
  const query = new Moralis.Query(moralisClass);
  if (queryParams.containedIn) {
    for (const containedIn of queryParams.containedIn) {
      query.containedIn(containedIn.name, containedIn.value);
    }
  }
  if (queryParams.equalTo) {
    for (const equalTo of queryParams.equalTo) {
      query.equalTo(equalTo.name, equalTo.value);
    }
  }
  if (queryParams.matches) {
    for (const matches of queryParams.matches) {
      query.matches(matches.name, matches.value, matches.type);
    }
  }
  if (queryParams.sort) {
    query[queryParams.sort.order](queryParams.sort.name);
  }
  if (queryParams.limit) {
    query.limit(queryParams.limit);
  }
  if (queryParams.exec === "find") return query.find();
  if (queryParams.exec === "count") return query.count();
  else return query.count();
};
