package org.pdr.cbaas.sbank.ui.dto;

import java.time.LocalDate;

public record Transaction(
        String id,
        String accountId,
        LocalDate bookingDate,
        LocalDate valueDate,
        String description,
        MoneyAmount amount,
        String direction,
        MoneyAmount balanceAfter
) {}