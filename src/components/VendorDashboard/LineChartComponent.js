import React from "react";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const LineChartComponent = ({ data }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Orders Processed</Card.Title>
        <p>Monthly Overview</p>
        <Line
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

export default LineChartComponent;
