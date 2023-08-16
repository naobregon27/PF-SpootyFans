## Guía de rutas (spotyfans-api)
Antes de empezar con las rutas, deben tener en cuenta que las rutas deniegan el acceso a cualquier petición a no ser que se mande el token por header ("x-access-token"). Este token es enviado por la api cuando un usuario inicia sesión.
El token es básicamente información encriptada que al desencriptarse (mediante la SECRET_KEY), brinda información relevante sobre el usuario que está en la sesión.
El token, al desencriptarse toma forma de un objeto similar a este:
```js
    {
      userId: 1, // id del usuario 
      username: 'Usuario1', // nombre del usuario
      email: 'usuario1@example.com', // email del usuario 
      profileImageUrl: 'url/ejemplo/...' // imagen de perfil del usuario
      isActive: true, // indica si el usuario está activo 
      isPremium: true, // indica si el usuario es premium
      isAdmin: false, // indica si el usuario tiene permisos de administrador
      iat: 1691087664, // fecha de creación del token (en ms)
      exp: 1691174064 // fecha de expiración del token (en ms)
    }
```

> Recuerden que este token, debe ser almacenado del lado del cliente ya que será el mismo durante 24hs.

Ya quedando el tema del token claro, pasaremos a detallar todas las rutas de la api y cómo deben realizarse las peticiones.

## Usuarios:
**- [POST] - Register:**
Esta ruta recibe los datos necesarios para crear un usuario.  
**Ruta:** /user/register  
**Body:**  
```json
{
  "username": "usuario1", // nombre de usuario
  "password": "password1", // contraseña 
  "email": "usuario1@example.com", // email 
}
```
**Devuelve:**  
```json
{
  "id": 11, // id del usuario creado
  "username": "usuario1", // nombre de usuario
  "email": "usuario1@example.com", // email 
  "profileImageUrl": "url/ejemplo/...", // imagen de perfil del usuario
  "isActive": true, // indica si está activo
  "isPremium": false, // indica si es premium
  "isAdmin": false, // indica si el usuario tiene permisos de administrador 
  "updatedAt": "2023-08-03T20:21:49.401Z", // fecha de actualización del usuario
  "createdAt": "2023-08-03T20:21:49.401Z" // fecha de creación del usuario
}
```
***
**- [POST] - Login:**
Esta ruta recibe los datos necesarios para iniciar sesión con un usuario existente y devuelve un token con datos encriptados.  
**Ruta:** /user/login  
**Body:**  
```json
{
  "username": "usuario1", // nombre de usuario (existente)
  "password": "password1" // contraseña del usuario (correcta)
}
```
**Devuelve:**  
```json
{
  "message": "Usuario autenticado exitosamente.", // mensaje de que todo salió bien
  "token": "eyJhbGciOiJIUzI1..." // token de la sesión (24hs)
}
```
***
**- [PUT] - Set Premium:**
Esta ruta cambia el valor de "isPremium" a su valor opuesto.  
**Ruta:** /user/setPremium  
**Devuelve:**  
```json
{
  "message": "Usuario modificado correctamente." // mensaje
}
```
***
**- [PUT] - Set Active:**
Esta ruta cambia el valor de "isActive" a su valor opuesto.  
**Ruta:** /user/setActive/:userId  
**Devuelve:**  
```json
{
  "message": "El usuario se ha modificado satisfactoriamente." // mensaje
}
```
***
**- [GET] - Get User By Id:**
Esta ruta devuelve toda la información de un usuario. Aunque esta ruta es un poco diferente a las otras. Si en vez pasar una id por params, se envía la palabra "this", devuelve la información del usuario que tiene la sesión iniciada (la ruta sería "/user/info/this").  
**Ruta:** /user/info/:userId  
**Devuelve:**  
```json
{
  "id": 10, // id del usuario
  "username": "juan_gonzalez", // nombre de usuario
  "email": "juanPremium1@example.com", // email
  "profileImageUrl": "url/ejemplo/...", // imagen de perfil del usuario
  "isPremium": true, // indica si es premium
  "isActive": true, // indica si está activo
  "isAdmin": false, // indica si es admin
  "createdAt": "2023-08-10T13:03:35.000Z", // fecha de creación del usuario
  "updatedAt": "2023-08-10T13:03:35.000Z" // fecha de actualización del usuario
}
```
***
**- [PUT] - Update Username:**
Esta ruta cambia el nombre de usuario del usuario que tiene la sesión iniciada.  
**Ruta:** /user/newUsername  
**Body:**  
```json
{
  "newUsername": "nuevoNombre" // nuevo nombre de usuario 
}
```
**Devuelve:**  
```json
{
  "message": "Usuario modificado correctamente." // mensaje
}
```
***
**- [GET] - Get All Users:**
Esta ruta devuelve un array de objetos con todos los usuarios almacenados en la base de datos.  
**Ruta:** /user  
**Devuelve:**  Arreglo de objetos (los objetos tienen la misma forma de los que devuelve la ruta get user by id).
## Canciones:

 **- [GET] - Music Detail (id):**
  Esta ruta devuelve toda la información detallada sobre una canción.  
  **Ruta:** /music/:id  
  Como puede verse en la ruta, la id se envía por params.  
**Devuelve:**  
```json
    {
      "id": 1, // id de la canción 
      "url": "cloudinary.com/...", // url de la canción
      "name": "Canción", // nombre de la canción
      "genre": "Género", // género de la canción
      "imageUrl": "cloudinary.com/...", // url de la imagen
      "isActive": true, // indica si la canción está activa
      "UserId": 1, // id del usuario que publicó la canción
    }
```

***
**- [GET] - Music by Name:**
Esta ruta devuelve toda la información de las canciones cuyo nombre coincide con el nombre pasado por query (viene en formato array de objetos). El nombre no necesita ser exacto. Si buscas "le", devolverá también la canción con el nombre "Levels".  
**Ruta:** /music?name=nombre  
La query debe ser exactamente "name" y no debe ingresarse la barra "/" antes del "?".  
**Devuelve (con query "le"):**  

```json
[
  {
    "id": 5, // id de la canción 
    "url": "cloudinary.com/...", // url de la canción
    "name": "Thriller", // nombre de la canción
    "genre": "Pop", // género de la canción
    "imageUrl": "cloudinary.com/...", // url de la imagen
    "isActive": true, // indica si la canción está activa
    "UserId": 4,  // id del usuario que publicó la canción
  },
  {
    "id": 6,
    "url": "cloudinary.com/...", // id de la canción 
    "name": "Levels", // nombre de la canción
    "genre": "Electronic", // género de la canción
    "imageUrl": "cloudinary.com/...",  // url de la imagen
    "isActive": true, // indica si la canción está activa
    "UserId": 1, // id del usuario que publicó la canción
  }
]
```
***
**- [GET] - All Musics:**
Esta ruta devuelve un array de objetos con todas las canciones almacenadas en la base de datos. Daré un ejemplo de uso, pero no mostrare lo que devuelve porque es igual a la ruta anterior, pero devuelve todo.  
**Ruta:** /music/all  


***
**- [POST] - Music**
Esta ruta sirve para subir una canción y requiere "pasos adicionales". Con esto me refiero a que deben subir tanto la canción como la imagen a Cloudinary y en esta ruta sólo enviar los links que les devuelve. Para saber más acerca de la subida de música e imágenes, leer el [Readme](../../Readme.MD).  
**Ruta:** /music/upload/url  
**Body:**  
```json
    {
      "url": "url/ejemplo", // url de la canción (Cloudinary)
      "name": "Canción 1", // nombre de la canción 
      "genre": "Género", // género de la canción 
      "imageUrl": "url/ejemplo", // url de la imagen (Cloudinary)
      "isActive": true // indica si está activa
    }
```
**Devuelve:** Devuelve los datos de la canción creada.  
## Categorías:
**- [GET] - Category Detail (id):**
Esta ruta devuelve la información detallada sobre una categoría (incluyendo las canciones relacionadas a la misma).  
**Ruta:** /category/:id  
Como puede verse en la ruta, la id se envía por params.  
**Devuelve:**  
```json
{
  "id": 7, // id de la categoría
  "name": "Rock", // nombre 
  "description": "New Category Description", // descripción 
  "Songs": [ // array de canciones en esa categoría
    {
      "id": 3, // id de la canción 
      "url": "cloudinary.com/...", // url de la canción 
      "name": "Bohemian Rhapsody", // nombre de la canción
      "genre": "Rock", // género de la canción
      "imageUrl": "cloudinary.com/...", // url de la imagen 
      "isActive": true, // indica si la canción está activa
      "UserId": 1 // id del usuario que publicó la canción
    }
  ]
}
```

***
**- [GET] - All Categories:**
Esta ruta devuelve un array de objetos con todas las categorías almacenadas en la base de datos.  
**Ruta:** /category  
**Devuelve:** Devuelve lo mismo que la ruta por id, pero con la información de todas las categorías.  

## Listas de reproducción
En estas rutas, no es necesario enviar la id del usuario ya que en el back obtenemos la información del usuario decodificando el token. En el back también validamos que sólo el usuario creador de las listas de reproducción pueda modificarlas, eliminarlas, agregar y remover canciones, etc. Por eso es muy importante (necesario) que envíen el token por header en cada petición que hagan a la apli.  
 
**- [GET] - All PlayLists by userId:**
Esta ruta devuelve un array de objetos con todas las listas de reproducción creadas por el usuario.  
**Ruta:** /playlist  
**Devuelve:**  
```json
[
  {
    "id": 11, // id de la PlayList
    "name": "PlayList de prueba", // nombre de la PlayList
    "likes": 0, // likes de la PlayList
    "UserId": 11 // id del usuario que creó la PlayList
  },
  {
    "id": 12, // id de la PlayList
    "name": "Segunda PlayList de prueba", // nombre de la PlayList
    "likes": 0, // likes de la PlayList
    "UserId": 11 // id del usuario que creó la PlayList
  }
]
```
***
**- [POST] - PlayList:**
Esta ruta crea una PlayList para el usuario.  
**Ruta:** /playlist  
**Body:**  
```json
{
  "name": "PlayList de prueba" // nombre de la PlayList
}
```
**Devuelve:**  
```json
{
  "likes": 0, // likes de la PlayList
  "id": 11, // id de la PlayList
  "name": "PlayList de prueba", // nombre de la PlayList
  "UserId": 11 // id del usuario que creó la PlayList
}
```
****
**- [GET] - PlayList Detail (id):**
Esta ruta devuelve la información detallada sobre una lista de reproducción (incluyendo las canciones relacionadas a la misma).   
**Ruta:** /playlist/:playListId  
Como puede verse en la ruta, la id se envía por params.  
**Devuelve:**  
```json
{
  "id": 11, // id de la PlayList
  "name": "PlayList de prueba", // nombre de la PlayList
  "likes": 0, // likes de la PlayList
  "UserId": 11, // id del usuario que creó la PlayList
  "Songs": [ // array de canciones en esa PlayList
    {
      "id": 1, // id de la canción 
      "url": "cloudinary.com/...", // url de la canción
      "name": "Despacito", // nombre de la canción
      "genre": "Reggaeton", // género de la canción
      "imageUrl": "cloudinary.com/...", // imagen de la canción
      "isActive": true, // indica si la canción está activa
      "UserId": 7 // id del usuario que publicó la canción
    }
  ]
}
```
***
**- [POST] - Add Song to PlayList:**
Esta ruta agrega una canción a una lista de reproducción.  
**Ruta:** /playlist/addSong  
**Body:**  
```json
{
  "songId": 1, // id de la canción
  "playListId": 11 // id de la PlayList
}
```
**Devuelve:**  
```json
{
  "message": "Canción añadida satisfactoriamente." // mensaje
}
```
***
**- [DELETE] - Delete PlayList:**
Esta ruta elimina una lista de reproducción.  
**Ruta:** /playlist/:playListId  
Como puede verse en la ruta, la id se envía por params.  
**Devuelve:**  
```json
{
  "message": "PlayList eliminada satisfactoriamente." // mensaje
}
```
***
**- [PUT] - Remove Song from PlayList:**
Esta ruta remueve una canción de la lista de reproducción.  
**Ruta:** /playlist/removeSong  
**Body:**  
```json
{
  "songId": 1, // id de la canción
  "playListId": 12 // id de la PlayList
}
```
**Devuelve:**  
```json
{
  "message": "Canción removida satisfactoriamente." // mensaje
}
```
***
**- [PUT] - Put PlayList:**
Esta ruta modifica una lista de reproducción existente.  
**Ruta:** /playlist/:playListId  
Como puede verse en la ruta, la id se envía por params.  
**Body:**  
```json
{
  "newName": "Nombre modificado", // nuevo nombre para la PlayList  
  "playListId": 11 // id de la PlayList a modificar
}
```
**Devuelve:**  `"PlayList modificada correctamente."`  
***
## Aclaraciones:
En esta guía, se pusieron de ejemplo sólo peticiones con una respuesta de status 200, más que nada para no extender demasiado la guía. En caso de que salga algo mal, verán un mensaje detallando la razón del error.  
> Nota: Agradecería que no modificaran este archivo.