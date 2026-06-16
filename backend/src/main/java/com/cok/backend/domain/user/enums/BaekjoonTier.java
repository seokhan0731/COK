package com.cok.backend.domain.user.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

//user.getBaekjoonTier.getScore처럼 사용하기 위함
@Getter
@RequiredArgsConstructor
public enum BaekjoonTier {
    UNRATED(0),
    BRONZE_5(20), BRONZE_4(22), BRONZE_3(24), BRONZE_2(26), BRONZE_1(28),
    SILVER_5(35), SILVER_4(38), SILVER_3(41), SILVER_2(44), SILVER_1(47),
    GOLD_5(55), GOLD_4(60), GOLD_3(65), GOLD_2(70), GOLD_1(75),
    PLATINUM_5(80), PLATINUM_4(84), PLATINUM_3(88), PLATINUM_2(92), PLATINUM_1(96),
    DIAMOND_OR_HIGHER(100);

    private final int score;
}
