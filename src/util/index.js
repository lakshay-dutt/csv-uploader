export const JSONToCSVConvertor = (data = null, title = "", showLabel = true) => {
  let arrData = typeof data !== "object" ? JSON.parse(data) : data;

  let CSV = "";

  if (showLabel) {
    let row = "";

    //This loop will extract the label from 1st index of on array
    for (let index in arrData[0]) {
      //Now convert each value to string and comma-seprated
      row += index + ",";
    }

    row = row.slice(0, -1);

    //append Label row with line break
    CSV += row + "\r\n";
  }

  //1st loop is to extract each row
  for (let i = 0; i < arrData.length; i++) {
    let row = "";

    //2nd loop will extract each column and convert it in string comma-seprated
    for (let index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }

    row.slice(0, row.length - 1);

    //add a line break after each row
    CSV += row + "\r\n";
  }

  if (CSV === "") {
    alert("Invalid data");
    return;
  }

  //Generate a file name
  let fileName = "MyReport_";
  //this will remove the blank-spaces from the title and replace it with an underscore
  fileName += title.replace(/ /g, "_");

  //Initialize file format you want csv or xls
  let uri = "data:text/csv;charset=utf-8," + escape(CSV);

  return { uri, fileName: fileName + ".csv" };
};
