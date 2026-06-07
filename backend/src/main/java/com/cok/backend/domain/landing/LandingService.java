package com.cok.backend.domain.landing;

import com.cok.backend.domain.landing.dto.OurMemberInfo;
import com.cok.backend.domain.landing.dto.OurMemberResponse;
import com.cok.backend.domain.landing.entity.Developers;
import com.cok.backend.domain.landing.entity.RoleMapping;
import com.cok.backend.domain.landing.repository.DevelopersRepository;
import com.cok.backend.domain.landing.repository.RoleMappingRepository;
import com.cok.backend.domain.landing.repository.RolesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LandingService {

    private final DevelopersRepository developersRepository;
    private final RoleMappingRepository mappingRepository;

    /**
     * 카드에 노출한 내용물 조회 및 dto 조립
     * map을 통한 다중 역할군 리스트꼴 반환
     * 최종 dto 포장시, key.getImage() 사용을 위해 key를 객체로 구현
     *
     * @return OurMemberResponse(이름, 역할, 이미지 url의 리스트)
     */
    public OurMemberResponse getMembersInfo() {
        List<OurMemberInfo> infos = new ArrayList<>();

        List<RoleMapping> allColumns = mappingRepository.findAllWithRole();
        Map<Developers, List<String>> developerRolesMap = new HashMap<>();
        fillMap(allColumns, developerRolesMap);

        convertToInfoList(infos, developerRolesMap);

        return new OurMemberResponse(infos);
    }

    private void fillMap(List<RoleMapping> columns, Map<Developers, List<String>> map) {
        for (RoleMapping column : columns) {
            Developers developer = column.getDeveloper();
            String roleName = column.getRole().getRoleAtThisProject();

            if (!map.containsKey(developer)) {
                map.put(developer, new ArrayList<>());
            }

            map.get(developer).add(roleName);
        }
    }

    private void convertToInfoList(List<OurMemberInfo> infos, Map<Developers, List<String>> map) {
        developersRepository.findAll().forEach(developer -> {
            //매핑되는 역할군이 없는 경우, 빈 리스트를 반환하기 위해, getOrDefault 사용
            List<String> roles = map.getOrDefault(developer, new ArrayList<>());
            infos.add(new OurMemberInfo(developer.getName(),
                    roles, developer.getImage()));
        });
    }

}
