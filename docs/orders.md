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

Номер заказа генерируется на backend в Strapi, а не на frontend.

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

## Как получить номер на frontend

После успешной отправки формы номер заказа находится в JSON-ответе Strapi:

```ts
const { response, data } = await sendOrderService(formData);

if (response.ok) {
  const orderNumber = data?.data?.orderUnicNumber;
}
```

Этот номер можно использовать для сообщения пользователю:

```tsx
{orderNumber && (
  <p>Ваш заказ №{orderNumber} успешно создан.</p>
)}
```

## Почему номер генерируется на backend

Backend является единственным надежным источником номера заказа.

Такой подход защищает от:

- дублей при одновременной отправке заказов;
- подделки номера заказа со стороны клиента;
- расхождения между Strapi и frontend;
- зависимости номера заказа от времени на устройстве пользователя.

Frontend только отправляет данные заказа и отображает номер, который вернул Strapi.
