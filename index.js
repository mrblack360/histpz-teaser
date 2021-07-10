var defaultData = {
  headers: [
    {
      id: "dx",
      name: "Data",
    },
    {
      id: "ou",
      name: "Place",
    },
    {
      id: "value",
      name: "Value",
    },
  ],
  metaData: {
    names: {
      hTUspcBc4Yn: "HIV Prevalence",
      EzE8xZ31zfC: "Malaria Prevalence",
      E31SemmmFGb: "TB Prevalence",
      dx: "Data",
      ou: "Place",
      R7TPl8q81Ft: "Insect District",
      xGojHNSrFAj: "Bird District",
    },
    dimensions: {
      dx: ["EzE8xZ31zfC", "hTUspcBc4Yn", "E31SemmmFGb"],
      ou: ["xGojHNSrFAj", "R7TPl8q81Ft"],
    },
  },
  rows: [
    ["EzE8xZ31zfC", "R7TPl8q81Ft", "47.0"],
    ["hTUspcBc4Yn", "R7TPl8q81Ft", "50.6"],
    ["EzE8xZ31zfC", "xGojHNSrFAj", "40.0"],
    ["E31SemmmFGb", "xGojHNSrFAj", "74.8"],
    ["hTUspcBc4Yn", "xGojHNSrFAj", "77.0"],
    ["E31SemmmFGb", "R7TPl8q81Ft", "47.0"],
  ],
};

// Init
function myFunction(data, orientation) {
  // Map data into multidimension array of Places/Data
  var dataArray = [];
  dataArray[0] = ["Data Vs Places"];
  data.metaData.dimensions.dx.forEach((element) => {
    dataArray[0].push(element);
  });
  data.metaData.dimensions.ou.forEach((element) => {
    dataArray.push([element]);
  });
  //   Map the values
  for (let rowIndex = 0; rowIndex < dataArray.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < dataArray[0].length;
      columnIndex++
    ) {
      data.rows.forEach((element) => {
        if (
          element[0] == dataArray[0][columnIndex] &&
          element[1] == dataArray[rowIndex][0]
        )
          dataArray[rowIndex][columnIndex] = element[2];
      });
    }
  }
  //   Map the headers
  for (let columnIndex = 0; columnIndex < dataArray[0].length; columnIndex++) {
    Object.keys(data.metaData.names).forEach((key) => {
      if (dataArray[0][columnIndex] == key)
        dataArray[0][columnIndex] = data.metaData.names[key];
    });
  }
  for (let rowIndex = 1; rowIndex < dataArray.length; rowIndex++) {
    Object.keys(data.metaData.names).forEach((key) => {
      if (dataArray[rowIndex][0] == key)
        dataArray[rowIndex][0] = data.metaData.names[key];
    });
  }
  //   Rander Table 1
  if (orientation == 1 || orientation == 3) {
    let table1 = "<thead><th>Places VS Data</th>";
    for (colIndex = 1; colIndex < dataArray.length; colIndex++) {
      table1 += "<th>" + dataArray[colIndex][0] + "</th>";
    }
    table1 += "</thead>";
    for (rowIndex = 1; rowIndex < dataArray[0].length; rowIndex++) {
      table1 += "<tr>";
      for (colIndex = 0; colIndex < dataArray.length; colIndex++) {
        table1 += "<td>" + dataArray[colIndex][rowIndex] + "</td>";
      }
      table1 += "</tr>";
    }
    document.getElementById("table1").innerHTML = table1;
  }
  //   Rander Table 2
  if (orientation == 2 || orientation == 3) {
    let table2 = "<thead><th>Data VS Places</th>";
    for (colIndex = 1; colIndex < dataArray[0].length; colIndex++) {
      table2 += "<th>" + dataArray[0][colIndex] + "</th>";
    }
    table2 += "</thead>";
    for (let rowIndex = 1; rowIndex < dataArray.length; rowIndex++) {
      table2 += "<tr>";
      for (
        let colIndex = 0;
        colIndex < dataArray[rowIndex].length;
        colIndex++
      ) {
        table2 += "<td>" + dataArray[rowIndex][colIndex] + "</td>";
      }
      table2 += "</tr>";
    }
    document.getElementById("table2").innerHTML = table2;
  }
}
// Calling the function
myFunction(defaultData, 3);
function generate() {
  data = JSON.parse(document.getElementById("data-input").value);
  orient = document.getElementById("orientation").value;
  console.log(orient);
  myFunction(data, orient);
}
