package org.pdr.cbaas.sbank.ui.endpoint;

import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.security.RolesAllowed;
import org.pdr.cbaas.sbank.ui.dto.Account;
import org.pdr.cbaas.sbank.ui.dto.MoneyAmount;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@BrowserCallable
@RolesAllowed("USER")
@Service
public class AccountEndpoint {

    public List<Account> listAccounts() {
        return List.of(
            new Account("acc-1001", "IR820540102680020817909002", "101-000-1", "CURRENT", "حساب جاری اصلی", new MoneyAmount("IRR", new BigDecimal("125000000")), "ACTIVE"),
            new Account("acc-1002", "IR650540102680020817909003", "101-000-2", "SAVINGS", "حساب پس‌انداز", new MoneyAmount("IRR", new BigDecimal("84500000")), "ACTIVE")
        );
    }
}