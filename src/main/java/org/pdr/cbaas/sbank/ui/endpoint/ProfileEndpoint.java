package org.pdr.cbaas.sbank.ui.endpoint;

import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.security.RolesAllowed;
import org.pdr.cbaas.sbank.ui.dto.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@BrowserCallable
@RolesAllowed("USER")
@Service
public class ProfileEndpoint {

    public Profile me() {
        return new Profile("u-demo", "کاربر دمو", "fa", List.of("USER"));
    }
}