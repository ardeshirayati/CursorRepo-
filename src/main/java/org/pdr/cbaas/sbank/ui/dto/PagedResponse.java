package org.pdr.cbaas.sbank.ui.dto;

import java.util.List;

public record PagedResponse<T>(List<T> items, int page, int size, long totalElements, int totalPages) {}