package org.pdr.cbaas.sbank.ui.endpoint;

import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.security.RolesAllowed;
import org.pdr.cbaas.sbank.ui.dto.TransferReceipt;
import org.pdr.cbaas.sbank.ui.dto.TransferRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@BrowserCallable
@RolesAllowed("USER")
@Service
public class TransferEndpoint {

    public TransferReceipt submitTransfer(TransferRequest request) {
        return new TransferReceipt(UUID.randomUUID().toString(), Instant.now(), "SUBMITTED");
    }
}