package org.pdr.cbaas.sbank.ui.api;

import org.pdr.cbaas.sbank.ui.dto.UserInfo;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mock-api/auth")
public class MockAuthController {

    @PostMapping("/login")
    public ResponseEntity<UserInfo> login(@RequestBody Map<String, String> body) {
        String username = body.getOrDefault("username", "");
        String displayName = "کاربر " + (username.isBlank() ? "ناشناس" : username);
        UserInfo user = new UserInfo("u-" + username, displayName, List.of("USER"));
        String mockJwt = "mock-jwt-token-for-" + username;
        return ResponseEntity.ok()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + mockJwt)
            .body(user);
    }
}