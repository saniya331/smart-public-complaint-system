package com.saniya.complaint.controller;

import com.saniya.complaint.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/citizen")
    public String citizen(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return "Citizen access granted: "
                + user.getEmail()
                + " | Role: "
                + user.getRole().name();
    }

    @GetMapping("/officer")
    public String officer(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return "Officer access granted: "
                + user.getEmail()
                + " | Role: "
                + user.getRole().name();
    }

    @GetMapping("/admin")
    public String admin(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return "Admin access granted: "
                + user.getEmail()
                + " | Role: "
                + user.getRole().name();
    }
}