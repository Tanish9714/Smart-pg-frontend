import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axiosInstance from "../api/axiosInstance";

const columns = [
  { id: "floor", label: "Floor", minWidth: 50 },
  { id: "roomNumber", label: "Room Number", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "joinDate", label: "Join Date", minWidth: 80 },
];

export default function TenantsTable({ refreshTrigger }) {
  const containerRef = useRef(null);
  const rowRef = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tenantsData, setTenantsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [loading, setLoading] = useState(false);

  const uniqueFloors = [
    ...new Set(tenantsData.map((row) => row.floor).filter(Boolean)),
  ];
  const uniqueRooms = [
    ...new Set(tenantsData.map((row) => row.roomNumber).filter(Boolean)),
  ];

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const getQuery = `
        query {
          getTenants {
            roomNumber
            name
            floor
            email
            joinDate
          }
        }
      `;
      const res = await axiosInstance.post("", { query: getQuery });
      const tenants = res.data.data.getTenants;

      const uniqueRooms = new Set();
      const filtered = tenants.filter((tenant, index) => {
        const key = index;
        if (uniqueRooms.has(key)) return false;
        uniqueRooms.add(key);
        return true;
      });

      setTenantsData(filtered);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [refreshTrigger]);

  useEffect(() => {
    const calculateRows = () => {
      if (!containerRef.current || !rowRef.current) return;

      const containerHeight = containerRef.current.offsetHeight;
      const headerHeight = 56;
      const paginationHeight = 56;
      const rowHeight = rowRef.current.offsetHeight || 50;

      const availableHeight =
        containerHeight - headerHeight - paginationHeight - 60;
      const estimatedRows = Math.floor(availableHeight / rowHeight);
      console.log(estimatedRows);
      setRowsPerPage(estimatedRows > 0 ? estimatedRows : 5);
    };

    const timeout = setTimeout(calculateRows, 50);
    window.addEventListener("resize", calculateRows);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculateRows);
    };
  }, []);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  }

  function handleFilterChange(type, value) {
    if (type === "floor") setSelectedFloor(value);
    if (type === "room") setSelectedRoom(value);
    setPage(0);
  }

  function handleRefresh() {
    setSearchQuery("");
    setSelectedFloor("");
    setSelectedRoom("");
    setPage(0);
    fetchTenants();
  }

  const filteredRows = tenantsData.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchQuery)
    );

    const matchesFloor = selectedFloor ? row.floor === selectedFloor : true;
    const matchesRoom = selectedRoom ? row.roomNumber === selectedRoom : true;

    return matchesSearch && matchesFloor && matchesRoom;
  });

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className="w-full sm:w-64"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <TextField
          select
          label="Filter by Floor"
          value={selectedFloor}
          onChange={(e) => handleFilterChange("floor", e.target.value)}
          variant="outlined"
          size="small"
          className="w-40"
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueFloors.map((floor, index) => (
            <MenuItem key={index} value={floor}>
              {floor}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Filter by Room"
          value={selectedRoom}
          onChange={(e) => handleFilterChange("room", e.target.value)}
          variant="outlined"
          size="small"
          className="w-40"
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueRooms.map((room, index) => (
            <MenuItem key={index} value={room}>
              {room}
            </MenuItem>
          ))}
        </TextField>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-[#5E81F4] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <Paper
        ref={containerRef}
        className="w-full h-full overflow-hidden shadow-md rounded-lg flex flex-col"
      >
        <TableContainer className="flex-1 overflow-auto">
          <Table stickyHeader aria-label="room table">
            <TableHead>
              <TableRow className="bg-gray-200">
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={{
                      minWidth: column.minWidth,
                      paddingLeft: column.id === "floor" ? "40px" : undefined,
                    }}
                    className="font-bold text-gray-700"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    ref={index === 0 ? rowRef : null}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    className="hover:bg-gray-100 transition-all duration-150"
                  >
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        style={{
                          paddingLeft:
                            column.id === "floor" ? "40px" : undefined,
                        }}
                        className="py-2 text-sm md:text-base"
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-4"
                  >
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="border-t">
          <TablePagination
            rowsPerPageOptions={[rowsPerPage]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={() => {}}
          />
        </div>
      </Paper>
    </div>
  );
}
