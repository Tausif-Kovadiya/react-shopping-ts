import { Stack, Button } from "react-bootstrap";
import { useCartContext } from "../context/cartContext";
import totalItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { RemoveCartItem } = useCartContext();
  let item = totalItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <>
      <Stack
        gap={2}
        direction="horizontal"
        className="d-flex align-items-center"
      >
        <img
          src={item?.imgUrl}
          alt={item?.name}
          style={{ width: 125, height: 75, objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>{item.name} {quantity && <span className="text-muted" style={{fontSize:'0.80rem'}}> x {quantity}</span>} </div>
          <div className="text-muted" style={{fontSize:'0.95rem'}}> {formatCurrency(item?.price)}</div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={() => RemoveCartItem(id)}>&times;</Button>
      </Stack>
    </>
  );
};

export default CartItem;
