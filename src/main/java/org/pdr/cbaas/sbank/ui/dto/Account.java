package org.pdr.cbaas.sbank.ui.dto;

public record Account(
        String id,
        String iban,
        String accountNo,
        String type,
        String title,
        MoneyAmount balance,
        String status
) {}