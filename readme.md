## CHALLENGE RED SOCIAL

# Red social

Crea una red social con Angular. La aplicación sólo se puede usar estando logueado (en abierto únicamente se puede ver login y registro), y una vez iniciada la sesión, el usuario puede ver un listado de todos los usuarios de la red.

El usuario podrá editar su perfil.

De cada usuario podrá ver su perfil, y podrá añadirlo como amigo o como enemigo (o cambiar entre ambos). Es decir, yo como usuario veo todos los demás usuarios, y además puedo tener una relación con algunos de ellos. Esa relación puede ser de amigo o de enemigo (recuerda: puede no haber relación).

En el listado de usuarios debe poder haber un filtro para enseñar:

todos los usuarios
sólo los amigos
sólo los enemigos
El listado debe mostrar el total de usuarios (o amigos/enemigos si se ha usado el filtro).

La red social consumirá los datos de una API desarrollada con Express, conectada a una base de datos en PostgreSql via Prisma. La validación de usuario se implementará mediante JWT.

Extra
La API mantendrá un log de todas las relaciones, almacenado en un archivo de texto en el servidor. Cada vez que se cree o destruya una relación (de cualquiera de los dos tipos), se debe añadir una línea al log, con uno de estos tres formatos:

New relationship: Luis & Marta (friends)

New relationship: Luis & Marta (enemies)

Removed relationship: Luis & Marta
