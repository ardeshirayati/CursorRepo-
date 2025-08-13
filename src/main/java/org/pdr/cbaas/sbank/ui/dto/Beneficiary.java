package org.pdr.cbaas.sbank.ui.dto;

public record Beneficiary(
        String id,
        String name,
        String iban,
        String bankName
) {}