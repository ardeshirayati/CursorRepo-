package org.pdr.cbaas.sbank.ui.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import jakarta.servlet.http.HttpSession;
import org.pdr.cbaas.sbank.ui.dto.UserInfo;
import org.pdr.cbaas.sbank.ui.security.SecurityConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;

@BrowserCallable
@AnonymousAllowed
@Service
public class AuthEndpoint {

    private final RestClient restClient;
    private final String authUrl;

    public AuthEndpoint(RestClient.Builder restClientBuilder,
                        @Value("${backend.api.base-url}") String baseUrl,
                        @Value("${backend.api.auth-path:/auth/login}") String authPath) {
        this.restClient = restClientBuilder.baseUrl(baseUrl).build();
        this.authUrl = authPath.startsWith("/") ? authPath : "/" + authPath;
    }

    public UserInfo login(String username, String password) throws IOException {
        ResponseEntity<UserInfo> response = restClient.post()
            .uri(authUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new LoginRequest(username, password))
            .retrieve()
            .toEntity(UserInfo.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            String authHeader = response.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            String jwt = authHeader != null ? authHeader.replace("Bearer ", "") : null;
            UserInfo user = response.getBody();

            ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
            HttpSession session = attrs.getRequest().getSession(true);
            session.setAttribute(SecurityConfig.SESSION_JWT_ATTRIBUTE, jwt);
            return user;
        }
        throw new IOException("Invalid credentials");
    }

    public void logout() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs != null) {
            HttpSession session = attrs.getRequest().getSession(false);
            if (session != null) {
                session.invalidate();
            }
        }
    }

    public record LoginRequest(String username, String password) {}
}