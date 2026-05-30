package com.cok.backend.global.security;

import com.cok.backend.domain.user.enums.UserRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.duration}")
    private Long duration;

    private SecretKey key;

    /**
     * 의존성 주입 후, 시크릿 키를 디코딩하여 JWT 라이브러리가 사용할 수 있게 변환
     */
    @PostConstruct
    protected void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(Long userId, UserRole currentRole) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + duration);

        return Jwts.builder()
                .subject(userId.toString())
                .claim("role", currentRole.name())
                .expiration(expirationDate)
                .signWith(key)
                .compact();
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("잘못된 토큰 구조 또는 서명값이 일치하지 않습니다.");
        } catch (ExpiredJwtException e) {
            log.error("토큰의 유효 기간이 만료되었습니다.");
        } catch (IllegalArgumentException e) {
            log.error("토큰이 비었습니다.(null/공백/빈 문자열)");
        } catch (UnsupportedJwtException e) {
            log.error("지원하지 않는 토큰입니다.");
        }
        return false;
    }

    public Authentication getAuthentication(String validToken) {
        Claims claims = getClaims(validToken);
        String userId = claims.getSubject();

        //스프링 시큐리티 내부 사용을 위해 ROLE_ 붙여 사용
        String role = claims.get("role").toString();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        Collection<? extends GrantedAuthority> authorities = List.of((new SimpleGrantedAuthority(role)));

        UserDetails principal = new User(userId, "", authorities);
        //스프링 시큐리티 인증 객체 반환
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public Long getUserId(String validToken) {
        String idString = getClaims(validToken).getSubject();
        return Long.valueOf(idString);
    }
}
