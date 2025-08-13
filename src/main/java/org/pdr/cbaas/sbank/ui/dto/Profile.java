package org.pdr.cbaas.sbank.ui.dto;

import java.util.List;

public record Profile(
        String userId,
        String displayName,
        String preferredLocale,
        List<String> roles
) {}