function getURLOpenDataCERNFromDataset(dataset) {
    let link = "http://opendata-qa.cern.ch/search?page=1&size=20&q=";
    if (dataset) {
      link += `${dataset}`;
    }
    return link;
  }
  
  export default getURLOpenDataCERNFromDataset;