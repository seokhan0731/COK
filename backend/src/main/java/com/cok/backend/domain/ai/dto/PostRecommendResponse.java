package com.cok.backend.domain.ai.dto;

import java.util.List;

public record PostRecommendResponse(List<PostRecommendItem> recommendations) {
}
