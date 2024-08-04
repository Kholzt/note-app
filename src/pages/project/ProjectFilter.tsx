import React, { Dispatch, useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
interface Filter {
  startDate: string | null;
  endDate: string | null;
}
interface Props {
  setFilter: Dispatch<any>;
}

const ProjectFilter: React.FC<Props> = ({ setFilter }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const startDateParam = params.get("startDate");
    const endDateParam = params.get("endDate");
    if (startDateParam) setStartDate(startDateParam || "");
    if (endDateParam) setEndDate(endDateParam || "");
  }, [location.search]);

  const handleDateChange = (
    e: React.ChangeEvent<any>,
    type: "start" | "end"
  ) => {
    if (type === "start") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const applyFilter = () => {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    setFilter({ startDate: startDate || null, endDate: endDate || null });
    navigate(`/projects?${params.toString()}`);
  };
  const clearFilter = () => {
    setFilter({ startDate: null, endDate: null });
    setStartDate("");
    setEndDate("");
    navigate(`/projects`);
  };

  return (
    <Dropdown className="">
      <Dropdown.Toggle
        style={{ minWidth: "130px" }}
        variant="light"
        id="dropdown-basic"
        className="rounded-sm border border-secondary"
      >
        <i className="fa fa-filter  text-primary"></i> Filter
      </Dropdown.Toggle>

      <Dropdown.Menu className="mw-100" style={{ minWidth: "500px" }}>
        <Dropdown.ItemText className="fs-5">Filter Project</Dropdown.ItemText>
        <div className="px-3 mb-2">
          <Form.Group>
            <Form.Label style={{ fontSize: "14px" }}>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e, "start")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontSize: "14px" }}>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange(e, "end")}
            />
          </Form.Group>
        </div>
        <Dropdown.Divider />
        <div className="px-3 mt-3 mb-2">
          <Button onClick={applyFilter} variant="primary" className="me-2">
            Apply Filter
          </Button>
          <Button onClick={clearFilter} variant="outline-secondary">
            Clear
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProjectFilter;
