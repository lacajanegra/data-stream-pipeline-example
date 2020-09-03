# Sistemas Reactivos
Pequeños projectos que ejemplifican como funciona una arquitectura reactiva usando colas de eventos.

Pueden encontrar la presentación de la charla aca: https://slides.com/am4ru/arquitectura-reactiva

## Requisitos para probar
1. Ejecutar un sistema de colas NATS en el SO `docker run --rm -p 4222:4222 -p 8223:8223 nats-streaming -m 8223 -cid nats-cluster`
2. Entrar a cada carpeta mediante una consola de comandos y ejecutar `npm install`. Tener en cuenta que el primer proyecto a ejecutar debe ser el order-pub.
 - Luego ejecutar `make run`
3. Probar el sistema enviando peticiones con la siguiente forma:
 - `curl -X POST http://localhost:8082/user -H 'Content-Type: application/json' -H 'cache-control: no-cache' -d '{
    "user_dni": 11111111,
    "user_name": "Amaru",
    "products": ["arroz", "bebida", "leche"]
}'`