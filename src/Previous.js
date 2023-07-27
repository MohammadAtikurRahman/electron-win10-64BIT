import React, { Component } from "react";
import Papa from "papaparse";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { Parser } from "json2csv";
import { saveAs } from "file-saver";

class Previous extends Component {
  state = {
    data: [],
    showTables: {},
    filteredData: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/get-school");
      // Update the data to reflect the new data structure
      const data = response.data.pc.map((item, index) => {
        return { ...item, ...response.data.beneficiary[index] };
      });
      this.setState({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  showDataByMonth = (month) => {
    const { data, showTables } = this.state;
    const filteredData = data.filter((item) => {
      const itemMonth = new Date(item.earliestStart).toLocaleString("default", {
        month: "long",
      });
      return itemMonth.toLowerCase() === month.toLowerCase();
    });

    // Toggle showTable in the same setState call as filteredData
    this.setState((prevState) => {
      const currentVisibility = !!prevState.showTables[month];
      return {
        showTables: { ...prevState.showTables, [month]: !currentVisibility },
      };
    });
  };

  // downloadCSV = () => {
  //   axios
  //     .get("http://localhost:2000/get-school")
  //     .then((response) => {
  //       const { data } = response;
  //       let csvContent = "data:text/csv;charset=utf-8,";

  //       // Add beneficiary data rows
  //       const beneficiaryHeaders = [
  //         "User Name",
  //         "EIIN",
  //         "School Name",
  //         "PC ID",
  //         "Lab ID",
  //       ];
  //       csvContent += beneficiaryHeaders.join(",") + "\r\n";
  //       data.beneficiary.forEach((item) => {
  //         const userName = `"${(item.m_nm || "").replace(/"/g, '""')}"`;
  //         const eiin = item.beneficiaryId;
  //         const name = item.name;

  //         const pcId = item.u_nm;
  //         const labId = item.f_nm;
  //         const row = [userName, eiin, name, pcId, labId];
  //         csvContent += row.join(",") + "\r\n";
  //       });

  //       // Add column headers for pc data
  //       const pcHeaders = ["Start Time", "End Time", "Total Time"];
  //       csvContent += pcHeaders.join(",") + "\r\n";

  //       // Add pc data rows
  //       data.pc.forEach((item) => {
  //         const startTime = `"${(item.earliestStart || "").replace(
  //           /"/g,
  //           '""'
  //         )}"`;
  //         const endTime = `"${(item.latestEnd || "").replace(/"/g, '""')}"`;
  //         const totalTime = `"${(item.total_time || "").replace(/"/g, '""')}"`;
  //         const row = [startTime, endTime, totalTime];
  //         csvContent += row.join(",") + "\r\n";
  //       });

  //       // Extract school name for file renaming
  //       const schoolName = data.beneficiary[0].name;
  //       const eiin = data.beneficiary[0].beneficiaryId;
  //       const pc_id = data.beneficiary[0].f_nm;

  //       // Extract month name from startTime
  //       const monthName = new Date(data.pc[0].earliestStart).toLocaleString(
  //         "default",
  //         { month: "long" }
  //       );

  //       // Include month name in the fileName
  //       const fileName = `pc_${schoolName}_ein_${eiin}_Pc_Id_${pc_id}_Month_${monthName}.csv`;

  //       // Create a download link
  //       const encodedUri = encodeURI(csvContent);
  //       const link = document.createElement("a");
  //       link.setAttribute("href", encodedUri);
  //       link.setAttribute("download", fileName);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading CSV:", error);
  //     });
  // };
  downloadCSV = async (month) => {
    const { data } = this.state;
  
    const monthData = data.filter((item) => {
      const itemMonth = new Date(item.earliestStart).toLocaleString("default", {
        month: "long",
      });
      return itemMonth.toLowerCase() === month.toLowerCase();
    });
  
    if (monthData.length === 0) return;
  
    try {
      const response = await axios.get("http://localhost:2000/get-school");
  
      if (!response.data.beneficiary || response.data.beneficiary.length === 0)
        throw new Error("No beneficiaries found in response");
  
      const beneficiary = response.data.beneficiary[0];
      const lab = beneficiary.u_nm || "Unknown_Lab";
      const pcLab = beneficiary.f_nm || "Unknown_PCLab";
      const school = beneficiary.name || "Unknown_School";
      const ein = beneficiary.beneficiaryId || "Unknown_EIIN";
  
      // Process monthData to split date and time
      const processedMonthData = monthData.map((item) => {
        const start = new Date(item.earliestStart);
        const end = new Date(item.latestEnd);
  
        // Destructure the item to exclude earliestStart and latestEnd
        const { earliestStart, latestEnd, total_time, _id, beneficiaryId, name, u_nm, f_nm, m_nm, ...restOfItem } = item;
  
        return {
          startDate: start.toLocaleDateString("en-GB"),
          startTime: start.toLocaleTimeString("en-GB", { hour12: true }),
          endDate: end.toLocaleDateString("en-GB"),
          endTime: end.toLocaleTimeString("en-GB", { hour12: true }),
          total_time,
          ein,
          pc_id: pcLab,
          lab_id: lab,
          school
        };
      });
  
      // Convert the data to CSV
      const csv = Papa.unparse(processedMonthData);
  
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `pc_${school}-${lab}-${pcLab}-${month}.csv`;
      link.click();
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };
  
  
  

  downloadData = () => {
    const parser = new Parser();
    const csv = parser.parse(this.state.data);
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, `${new Date().getMonth() + 1}.csv`);
  };

  render() {
    const { data, showTables, filteredData } = this.state;
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });

    return (
      <div>
        {data.length > 0 &&
          Array.from(
            new Set(
              data.map((item) =>
                new Date(item.earliestStart).toLocaleString("default", {
                  month: "long",
                })
              )
            )
          ).map((month, index) => (
            <React.Fragment key={index}>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.showDataByMonth(month)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  {month}'s PC Data
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.downloadCSV(month)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Download {month}'s Data
                </Button>
              </div>

              {showTables[month] && (
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>Start Date</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Start Time</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Last Usage Date</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Last Usage Time</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Duration</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        .slice()
                        .reverse()
                        .map(
                          (item) =>
                            new Date(item.earliestStart).toLocaleString(
                              "default",
                              { month: "long" }
                            ) === month && (
                              <TableRow key={item._id}>
                                <TableCell align="center">
                                  <b>
                                    {new Date(
                                      item.earliestStart
                                    ).toLocaleDateString("en-GB")}
                                  </b>
                                </TableCell>
                                <TableCell align="center">
                                  <b>
                                    {new Date(
                                      item.earliestStart
                                    ).toLocaleTimeString("en-GB", {
                                      hour12: true,
                                    })}
                                  </b>
                                </TableCell>
                                <TableCell align="center">
                                  <b>
                                    {new Date(
                                      item.latestEnd
                                    ).toLocaleDateString("en-GB")}
                                  </b>
                                </TableCell>
                                <TableCell align="center">
                                  <b>
                                    {new Date(
                                      item.latestEnd
                                    ).toLocaleTimeString("en-GB", {
                                      hour12: true,
                                    })}
                                  </b>
                                </TableCell>
                                <TableCell align="center">
                                  <b>{item.total_time}</b>
                                </TableCell>
                              </TableRow>
                            )
                        )}
                    </TableBody>
                  </Table>
                  <div style={{ padding: "20px" }}></div>
                </TableContainer>
              )}
            </React.Fragment>
          ))}
      </div>
    );
  }
}

export default Previous;
