package com.saniya.complaint.controller;

import com.saniya.complaint.dto.LoginRequest;
import com.saniya.complaint.dto.LoginResponse;
import com.saniya.complaint.entity.User;
import com.saniya.complaint.security.JwtService;
import com.saniya.complaint.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService,
                          JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {

            User registeredUser = userService.registerUser(user);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new LoginResponse(
                            null,
                            registeredUser.getId(),
                            registeredUser.getFullName(),
                            registeredUser.getEmail(),
                            registeredUser.getRole().name()
                    ));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userService
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        boolean passwordMatches =
                userService.checkPassword(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        LoginResponse response = new LoginResponse(
                token,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok(response);
    }
}