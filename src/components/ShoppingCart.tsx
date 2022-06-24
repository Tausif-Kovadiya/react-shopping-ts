import { Offcanvas, Stack } from "react-bootstrap";
import { useCartContext } from "../context/cartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import totalItems from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useCartContext();

  const finalAmount = cartItems.reduce((total, element) => {
    let item = totalItems.find((i) => i.id === element.id);

    return total + (item?.price || 0) * element.quantity;
  }, 0);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            {finalAmount > 0 && (
              <span>Total : {formatCurrency(finalAmount)}</span>
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
