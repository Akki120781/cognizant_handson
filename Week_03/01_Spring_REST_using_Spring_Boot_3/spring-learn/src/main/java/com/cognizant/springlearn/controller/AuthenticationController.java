package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.security.JwtUtil;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private final JwtUtil jwtUtil;

    public AuthenticationController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authorization) {
        Credentials credentials = decodeAuthorizationHeader(authorization);
        if (!isValid(credentials)) {
            throw new InvalidCredentialsException();
        }
        return Map.of("token", jwtUtil.generateToken(credentials.username()));
    }

    private Credentials decodeAuthorizationHeader(String authorization) {
        if (authorization == null || !authorization.startsWith("Basic ")) {
            throw new InvalidCredentialsException();
        }
        String encoded = authorization.substring("Basic ".length());
        String decoded = new String(Base64.getDecoder().decode(encoded), StandardCharsets.UTF_8);
        int separator = decoded.indexOf(':');
        if (separator < 0) {
            throw new InvalidCredentialsException();
        }
        return new Credentials(decoded.substring(0, separator), decoded.substring(separator + 1));
    }

    private boolean isValid(Credentials credentials) {
        return ("admin".equals(credentials.username()) || "user".equals(credentials.username()))
                && "pwd".equals(credentials.password());
    }

    private record Credentials(String username, String password) {
    }

    @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Invalid credentials")
    private static class InvalidCredentialsException extends RuntimeException {
    }
}
