package org.pdr.cbaas.sbank.ui.dto;

import java.time.Instant;

public record TransferReceipt(
        String transferId,
        Instant timestamp,
        String status
) {}