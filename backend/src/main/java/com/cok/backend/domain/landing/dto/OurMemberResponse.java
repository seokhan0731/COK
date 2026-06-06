package com.cok.backend.domain.landing.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record OurMemberResponse(@JsonProperty("memberInfoData") List<OurMemberInfo> members) {
}
