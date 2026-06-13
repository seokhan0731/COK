package com.cok.backend.domain.ai;

import com.cok.backend.domain.ai.dto.EmbeddingRequest;
import com.cok.backend.domain.ai.dto.EmbeddingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AiService {
    private final AiClient aiClient;

    public EmbeddingResponse getEmbeddingByFastapi(String essay) {
        EmbeddingRequest request = new EmbeddingRequest(essay);
        return aiClient.getEmbedding(request);
    }

}
