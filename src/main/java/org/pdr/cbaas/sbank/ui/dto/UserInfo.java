package org.pdr.cbaas.sbank.ui.dto;

import java.util.List;

public record UserInfo(String userId, String displayName, List<String> roles) {}