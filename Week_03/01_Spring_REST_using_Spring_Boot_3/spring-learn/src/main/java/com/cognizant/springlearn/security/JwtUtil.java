package com.cognizant.springlearn.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private static final long EXPIRY_MILLIS = 20 * 60 * 1000;
    private final SecretKey key = Keys.hmacShaKeyFor(
            "01234567890123456789012345678901".getBytes(StandardCharsets.UTF_8)
    );

    public String generateToken(String user) {
        Date now = new Date();
        return Jwts.builder()
                .subject(user)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + EXPIRY_MILLIS))
                .signWith(key)
                .compact();
    }

    public String validateAndGetSubject(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
