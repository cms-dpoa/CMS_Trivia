function getURLOpenDataCERNFromLabel(label) {
  let link = "http://opendata.cern.ch/search?page=1&size=20&type=Dataset";
  if (label) {
    const partsLabel = label.split("/");
    const category = encodeURIComponent(partsLabel[0]);
    link += `&category=${category}`;

    if (partsLabel.length > 1) {
      const subCategory = encodeURIComponent(partsLabel[1]);
      link += `&subcategory=${subCategory}`;
    }
  }
  return link;
}

export default getURLOpenDataCERNFromLabel;
