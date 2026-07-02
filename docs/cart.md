# Store корзины

`useCartStore` хранит товары корзины в `localStorage` через `zustand/persist`.

Стор можно использовать только в клиентских компонентах, где есть директива `"use client"`.

## Импорт

```tsx
import useCartStore from "@/app/store/cartStore";
```

## Данные

```tsx
const cartItems = useCartStore((state) => state.cartItems);
const lastAction = useCartStore((state) => state.lastAction);
const lastChangedItem = useCartStore((state) => state.lastChangedItem);
```

`cartItems` содержит товары в формате `Product & { quantity: number }`.

`lastAction` показывает последнее действие с корзиной:

```ts
"add" | "remove" | "clear" | null
```

`lastChangedItem` хранит последний товар, который был добавлен или удален. Для `clear` значение равно `null`.

## Методы

```tsx
const addToCart = useCartStore((state) => state.addToCart);
const removeFromCart = useCartStore((state) => state.removeFromCart);
const increaseQuantity = useCartStore((state) => state.increaseQuantity);
const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
const clearCart = useCartStore((state) => state.clearCart);
const clearLastAction = useCartStore((state) => state.clearLastAction);
```

Назначение методов:

- `addToCart(product)` добавляет товар или увеличивает `quantity`, если товар уже есть.
- `removeFromCart(id)` удаляет товар из корзины.
- `increaseQuantity(id)` увеличивает количество товара на 1.
- `decreaseQuantity(id)` уменьшает количество товара на 1, но не ниже 1.
- `clearCart()` полностью очищает корзину.
- `clearLastAction()` сбрасывает `lastAction` после показа уведомления.

## Добавить товар

```tsx
"use client";

import useCartStore from "@/app/store/cartStore";
import type { Product } from "@/app/types/types";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button type="button" onClick={() => addToCart(product)}>
      В корзину
    </button>
  );
}
```

## Показать товары корзины

```tsx
"use client";

import useCartStore from "@/app/store/cartStore";

export default function CartList() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <ul>
      {cartItems.map((item) => (
        <li key={item.id}>
          <span>{item.title}</span>
          <span>{item.quantity}</span>

          <button type="button" onClick={() => decreaseQuantity(item.id)}>
            -
          </button>
          <button type="button" onClick={() => increaseQuantity(item.id)}>
            +
          </button>
          <button type="button" onClick={() => removeFromCart(item.id)}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}
```

## Посчитать количество товаров

```tsx
const totalItems = useCartStore((state) =>
  state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
);
```

`cartItems.length` считает количество разных позиций, а не сумму всех единиц товара.
