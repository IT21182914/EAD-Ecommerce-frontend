import React from "react";
import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

const PieChartComponent = ({ data }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Inventory Status</Card.Title>
        <p>Current Stock Levels</p>
        <Pie
          data={data}
          options={{
            responsive: true,
            animation: { duration: 1000 },
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default PieChartComponent;
