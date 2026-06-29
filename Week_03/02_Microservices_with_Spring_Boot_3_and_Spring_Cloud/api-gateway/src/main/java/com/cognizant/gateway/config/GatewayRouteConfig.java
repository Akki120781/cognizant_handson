package com.cognizant.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRouteConfig {
    @Bean
    RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("greet-service", route -> route
                        .path("/greet-service/**")
                        .filters(filter -> filter.rewritePath("/greet-service/(?<segment>.*)", "/${segment}"))
                        .uri("lb://greet-service"))
                .route("account-service", route -> route
                        .path("/account-service/**")
                        .filters(filter -> filter.rewritePath("/account-service/(?<segment>.*)", "/${segment}"))
                        .uri("lb://account-service"))
                .route("loan-service", route -> route
                        .path("/loan-service/**")
                        .filters(filter -> filter.rewritePath("/loan-service/(?<segment>.*)", "/${segment}"))
                        .uri("lb://loan-service"))
                .build();
    }
}
