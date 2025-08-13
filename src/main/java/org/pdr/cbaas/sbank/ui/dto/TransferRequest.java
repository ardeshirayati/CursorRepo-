package org.pdr.cbaas.sbank.ui.dto;

public record TransferRequest(
        String fromAccountId,
        String toIban,
        MoneyAmount amount,
        String description
) {}