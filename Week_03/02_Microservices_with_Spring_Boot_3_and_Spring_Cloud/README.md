# Microservices with Spring Boot 3 and Spring Cloud

Implemented services:

- `account`: account REST microservice
- `loan`: loan REST microservice
- `greet-service`: simple service used through the API gateway
- `eureka-discovery-server`: Eureka registry
- `api-gateway`: Spring Cloud Gateway with request logging filter

Run order:

1. `eureka-discovery-server`
2. `account`
3. `loan`
4. `greet-service`
5. `api-gateway`

Useful endpoints:

- `GET http://localhost:8080/accounts/{number}`
- `GET http://localhost:8081/loans/{number}`
- `GET http://localhost:8082/greet`
- `GET http://localhost:8761`
- `GET http://localhost:9090/greet-service/greet`
- `GET http://localhost:9090/account-service/accounts/{number}`
- `GET http://localhost:9090/loan-service/loans/{number}`
