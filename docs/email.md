# Email уведомления

Почтовые уведомления отправляются из backend-части Strapi через Nodemailer provider.

## Установка provider

```bash
npm install @strapi/provider-email-nodemailer
```

SMTP-настройки хранятся в `back/.env`.

## Конфиг Strapi

Nodemailer provider подключается в:

```text
back/config/plugins.ts
```

Конфиг берет SMTP-параметры из env и задает:

```text
provider: nodemailer
defaultFrom: SMTP_FROM
defaultReplyTo: SMTP_REPLY_TO
```

В dev docker compose для Strapi подключен `env_file`:

```yaml
strapi:
  env_file:
    - ./back/.env
```
## Уведомления о новом заказе

Письма администратору и клиенту отправляются после успешного создания заказа.

Логика находится в сервисе:

```text
back/src/api/zakazy/services/zakazy.ts
```

Порядок работы:

1. Frontend отправляет заказ в Strapi на `/api/zakazies`.
2. Service генерирует `orderUnicNumber`.
3. Service вызывает `super.create` и сохраняет заказ.
4. После успешного сохранения вызывается отправка письма администратору.
5. Затем вызывается отправка письма клиенту на email из заказа.

Админское письмо отправляется на:

```text
inside-dev360@yandex.ru
```

Клиентское письмо отправляется на:

```text
order.email
```

## Форма обратной связи

Форма `front/app/components/Form/Form.tsx` не сохраняет заявку в Strapi.

Frontend отправляет данные на кастомный endpoint:

```text
POST /api/contact-form/send
```

Backend-логика находится в:

```text
back/src/api/contact-form/controllers/contact-form.ts
back/src/api/contact-form/routes/contact-form.ts
```

Payload:

```json
{
  "data": {
    "contact": "телефон или email",
    "consent": true
  }
}
```

Endpoint валидирует `contact` и `consent`, затем отправляет письмо администратору через Strapi email provider.

Заявка в базе не создается.

