package com.cognizant.springlearn.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecureController {
    @GetMapping("/secure/ping")
    public Map<String, String> ping() {
        return Map.of("message", "JWT authentication successful");
    }
}
