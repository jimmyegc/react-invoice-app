
### Migración

Base de datos

Clientes
  id
  nombre
  razon_social
  direccion
  colonia
  rfc
  tel_1
  tel_2
  tel_3
  fax

Configuracion
 id
 id_sucursal
 nombre_sucursal
 id_usuario
 nombre_usuario
 nombre_empresa
 matriz

empresas
  nombre
  giro
  direccion
  ciudad
  estado
  pais
  tel_1
  tel_2
  tel_3
  fax
  web
  e_mail
  logo

Estados
 id
 nombre
 capital
 habitantes

Factura
 id
 titulo
 top
 left

Facturacion
 id
factura
id_cliente
cliente
no_conceptos
fecha
subtotal
iva
total
activo

Facturas
 id
 id_movimiento
 concepto
 cantidad
 precio
 importe