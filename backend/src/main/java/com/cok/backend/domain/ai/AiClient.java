package com.cok.backend.domain.ai;

import com.cok.backend.domain.ai.dto.EmbeddingRequest;
import com.cok.backend.domain.ai.dto.EmbeddingResponse;
import com.cok.backend.domain.ai.dto.PostRecommendRequest;
import com.cok.backend.domain.ai.dto.PostRecommendResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "aiClient", url = "${ai.client.url}")
public interface AiClient {
    @PostMapping(value = "/embedding")
    EmbeddingResponse getEmbedding(@RequestBody EmbeddingRequest request);

    @PostMapping(value = "/posting")
    PostRecommendResponse getRecommend(@RequestBody PostRecommendRequest request);
}
