package org.pdr.cbaas.sbank.ui.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Configuration
public class SecurityConfig {

    public static final String SESSION_JWT_ATTRIBUTE = "SESSION_BACKEND_JWT";

    @Value("${csp.connect-src:self}")
    private String cspConnectSrc;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.ignoringRequestMatchers("/connect/**", "/logout", "/hilla/**"))
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp.policyDirectives(
                    "default-src 'self'; " +
                    "script-src 'self'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data:; " +
                    "font-src 'self' data:; " +
                    "connect-src " + (cspConnectSrc == null || cspConnectSrc.isBlank() ? "'self'" : cspConnectSrc) + "; " +
                    "frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
                ))
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/connect/login", "/VAADIN/**", "/icons/**", "/images/**", "/manifest.webmanifest", "/sw.js", "/offline.html", "/hilla/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .logout(Customizer.withDefaults());

        http.addFilterBefore(new SessionJwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    static class SessionJwtAuthorizationFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
                throws ServletException, IOException {
            Object token = req.getSession(false) != null ? req.getSession(false).getAttribute(SESSION_JWT_ATTRIBUTE) : null;
            if (token instanceof String jwt && SecurityContextHolder.getContext().getAuthentication() == null) {
                Authentication auth = new org.springframework.security.authentication.UsernamePasswordAuthenticationToken("session-user", jwt, List.of());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
            chain.doFilter(req, res);
        }
    }
}