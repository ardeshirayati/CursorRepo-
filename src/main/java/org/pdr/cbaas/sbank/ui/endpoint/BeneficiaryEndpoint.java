package org.pdr.cbaas.sbank.ui.endpoint;

import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.security.RolesAllowed;
import org.pdr.cbaas.sbank.ui.dto.Beneficiary;
import org.springframework.stereotype.Service;

import java.util.List;

@BrowserCallable
@RolesAllowed("USER")
@Service
public class BeneficiaryEndpoint {

    public List<Beneficiary> listBeneficiaries() {
        return List.of(
            new Beneficiary("bnf-1", "پرداخت‌یار ۱", "IR820540102680020817909002", "بانک الف"),
            new Beneficiary("bnf-2", "پرداخت‌یار ۲", "IR650540102680020817909003", "بانک ب")
        );
    }
}