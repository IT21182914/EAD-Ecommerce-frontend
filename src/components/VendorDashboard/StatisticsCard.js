import React from "react";
import { Card, Col } from "react-bootstrap";
import {
  FaBoxOpen,
  FaWarehouse,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";

const StatisticsCard = ({ icon, color, count, label, footer }) => {
  const icons = {
    FaBoxOpen: <FaBoxOpen size={30} className={color} />,
    FaWarehouse: <FaWarehouse size={30} className={color} />,
    FaClipboardList: <FaClipboardList size={30} className={color} />,
    FaStar: <FaStar size={30} className={color} />,
  };

  return (
    <Col md={3} sm={6}>
      <Card className="shadow-sm h-100">
        <Card.Body className="text-center">
          {icons[icon]}
          <h3 className="my-2">{count}</h3>
          <p>{label}</p>
        </Card.Body>
        <Card.Footer className="text-center">
          <small>{footer}</small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default StatisticsCard;
