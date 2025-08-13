package org.pdr.cbaas.sbank.ui.endpoint;

import com.vaadin.hilla.BrowserCallable;
import jakarta.annotation.security.RolesAllowed;
import org.pdr.cbaas.sbank.ui.dto.MoneyAmount;
import org.pdr.cbaas.sbank.ui.dto.PagedResponse;
import org.pdr.cbaas.sbank.ui.dto.Transaction;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@BrowserCallable
@RolesAllowed("USER")
@Service
public class TransactionEndpoint {

    public PagedResponse<Transaction> listTransactions(String accountId, int page, int size) {
        List<Transaction> all = new ArrayList<>();
        for (int i = 0; i < 57; i++) {
            all.add(new Transaction(
                "txn-" + (i + 1),
                accountId,
                LocalDate.now().minusDays(i),
                LocalDate.now().minusDays(i),
                (i % 2 == 0 ? "خرید" : "واریز") + " شماره " + (i + 1),
                new MoneyAmount("IRR", (i % 2 == 0) ? new BigDecimal("-250000") : new BigDecimal("500000")),
                (i % 2 == 0 ? "DEBIT" : "CREDIT"),
                new MoneyAmount("IRR", new BigDecimal("120000000").subtract(new BigDecimal(i).multiply(new BigDecimal("10000"))))
            ));
        }
        int from = Math.min(page * size, all.size());
        int to = Math.min(from + size, all.size());
        List<Transaction> items = all.subList(from, to);
        int totalPages = (int) Math.ceil(all.size() / (double) size);
        return new PagedResponse<>(items, page, size, all.size(), totalPages);
    }
}