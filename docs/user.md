# User

Описание объекта пользователя.

Поля:

- `username` - обязательное поле, тип `Text`.
- `email` - обязательное поле, тип `Email`.
- `role` - связь `manyToOne` с `Role` из `users-permissions`.
- `full_name` - тип `Text`.
