<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. CLonar el repo
2. Ejecuar
```
yarn install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Renombrar el archivo __.env.example__ a ```.env```

7. Llenar las variables de entorno definidas en el __.env__

8. Ejecutar la aplicacion en dev con:
```
yarn start:dev
```

9. Cargas datos en DB
```
localhost:3000/api/v2/seed
```

#Stack usado
* MongoDb
* Nest.Js
