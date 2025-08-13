package org.pdr.cbaas.sbank.ui.dto;

import java.math.BigDecimal;

public record MoneyAmount(String currency, BigDecimal amount) {}