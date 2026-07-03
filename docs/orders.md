# Заказы

Заказ создается из клиентского компонента `CheckoutForm`.

Frontend отправляет данные формы в Strapi:

```ts
const url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/zakazies`;

await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ data: orderData }),
});
```

## Номер заказа

Номер заказа генерируется на backend в Strapi

Поле номера заказа в Strapi называется:

```ts
orderUnicNumber
```

Логика находится в сервисе:

```text
back/src/api/zakazy/services/zakazy.ts
```

При создании заказа service сначала формирует человекочитаемый номер по шаблону:

```text
RIF-000123
```

Формат:

```text
RIF-{порядковый номер, дополненный нулями до 6 символов}
```

Примеры:

```text
первый заказ      -> RIF-000001
двадцать пятый    -> RIF-000025
сто двадцать третий -> RIF-000123
```

Номер добавляется в `data` до вызова `super.create`, поэтому заказ создается в Strapi уже с заполненным полем `orderUnicNumber`. Второй `update` после создания не используется.

## Товары заказа

Состав корзины сохраняется в заказе как JSON-снимок в поле Strapi:

```ts
orderItems
```

Это не relation к товарам, а копия важных данных на момент оформления заказа. Такой подход сохраняет количество, цену и название даже если карточка товара позже изменится.

`CheckoutForm` берет товары из `cartStore` и перед отправкой добавляет их к данным формы:

```ts
const orderItems = cartItems.map((item) => ({
  productId: item.id,
  documentId: item.documentId,
  title: item.title,
  sku: item.sku,
  id1c: item.id1c,
  quantity: item.quantity,
  price: item.price ?? 0,
  priceSales: item.priceSales ?? null,
  total: (item.price ?? 0) * item.quantity,
}));
```

После успешного создания заказа корзина очищается через `clearCart()`.

