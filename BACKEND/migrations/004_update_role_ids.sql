-- Actualizar los IDs de roles existentes
UPDATE roles SET id = 'ADMIN' WHERE id = 'role_admin';
UPDATE roles SET id = 'USER' WHERE id = 'role_user';
UPDATE roles SET id = 'MERCHANT' WHERE id = 'role_merchant';

-- Actualizar los role_id en la tabla users
UPDATE users SET role_id = 'ADMIN' WHERE role_id = 'role_admin';
UPDATE users SET role_id = 'USER' WHERE role_id = 'role_user';
UPDATE users SET role_id = 'MERCHANT' WHERE role_id = 'role_merchant';

