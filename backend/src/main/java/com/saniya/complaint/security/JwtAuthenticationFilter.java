package com.saniya.complaint.security;

import com.saniya.complaint.entity.User;
import com.saniya.complaint.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        System.out.println("====================================");
        System.out.println("JWT FILTER REQUEST: " + request.getRequestURI());
        System.out.println("Authorization header present: "
                + (authHeader != null));

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("No valid Bearer token found.");

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {

            String email = jwtService.extractEmail(token);

            System.out.println("JWT EMAIL: " + email);

            User user = userService
                    .findByEmail(email)
                    .orElse(null);

            if (user == null) {

                System.out.println("USER NOT FOUND: " + email);

            } else {

                System.out.println("USER FOUND: " + user.getEmail());
                System.out.println("USER ROLE: " + user.getRole());

                if (SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority(
                                    "ROLE_" + user.getRole().name()
                            );

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user,
                                    null,
                                    List.of(authority)
                            );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    System.out.println(
                            "AUTHENTICATION SET SUCCESSFULLY"
                    );

                } else {

                    System.out.println(
                            "AUTHENTICATION ALREADY EXISTS"
                    );
                }
            }

        } catch (Exception e) {

            System.out.println("JWT ERROR: " + e.getClass().getName());
            System.out.println("JWT ERROR MESSAGE: " + e.getMessage());

            SecurityContextHolder.clearContext();
        }

        System.out.println(
                "FINAL AUTHENTICATION: "
                        + SecurityContextHolder
                        .getContext()
                        .getAuthentication()
        );

        System.out.println("====================================");

        filterChain.doFilter(request, response);
    }
}