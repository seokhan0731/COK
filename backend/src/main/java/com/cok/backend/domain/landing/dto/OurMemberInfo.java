package com.cok.backend.domain.landing.dto;

import java.util.List;

public record OurMemberInfo(String name,
                            List<String> role,
                            String imageUrl) {
}
