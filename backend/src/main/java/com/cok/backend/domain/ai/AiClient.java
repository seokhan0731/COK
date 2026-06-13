package com.cok.backend.domain.ai;

import com.cok.backend.domain.ai.dto.EmbeddingRequest;
import com.cok.backend.domain.ai.dto.EmbeddingResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "aiClient", url = "http://127.0.0.1:8000")
public interface AiClient {
    @PostMapping(value = "/embedding")
    EmbeddingResponse getEmbedding(@RequestBody EmbeddingRequest request);
}
