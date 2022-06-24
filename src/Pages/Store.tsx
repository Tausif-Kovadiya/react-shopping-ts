import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import storeItems from "../data/items.json";

const Store = () => {
  return (
    <div>
      <h1>Store</h1>
      <Row lg={3} md={2} xs={1} className="g-3">
        {storeItems.map((item) => {
          return (
            <Col key={item.id}>
              <StoreItem {...item}/>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Store;
