#!/usr/bin/env bash
set -euo pipefail

BUCKET="${BUCKET:?버킷 이름 지정 필요}"
PROFILE="${PROFILE:-cok}"
REGION="ap-northeast-2"
USER="cok-s3"

# 정책 JSON은 BUCKET_NAME 자리표시자로 저장돼 있다.
# 실제 버킷 이름으로 치환한 사본을 임시 폴더에 만들어 쓴다. (원본은 그대로 유지)
# 실행 시 치환하는 방식으로, 이름 별도 명시 필요 x (버킷 이름 수정시, 인자만 바꿔 재실행하면 끝)
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
sed "s/BUCKET_NAME/$BUCKET/g" infra/bucket-policy.json > "$TMP/bucket-policy.json"
sed "s/BUCKET_NAME/$BUCKET/g" infra/iam-policy.json    > "$TMP/iam-policy.json"

# 1. 버킷 — 없을 때만 생성
if aws s3api head-bucket --bucket "$BUCKET" --profile "$PROFILE" 2>/dev/null; then
  echo "[skip] 버킷 있음: $BUCKET"
else
  aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
    --create-bucket-configuration "LocationConstraint=$REGION" --profile "$PROFILE"
  echo "[ok] 버킷 생성: $BUCKET"
fi

# 2. 퍼블릭 차단 — ACL 경로는 막고 정책 경로만 연다 (덮어쓰기라 재실행 안전)
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --profile "$PROFILE"
echo "[ok] 퍼블릭 액세스 설정"

# 3. 퍼블릭 읽기 정책 (덮어쓰기)
aws s3api put-bucket-policy --bucket "$BUCKET" \
  --policy "file://$TMP/bucket-policy.json" --profile "$PROFILE"
echo "[ok] 버킷 정책"

# 4. 애플리케이션용 IAM 사용자 — 없을 때만 생성 (s3 접근용)
if aws iam get-user --user-name "$USER" --profile "$PROFILE" >/dev/null 2>&1; then
  echo "[skip] 사용자 있음: $USER"
else
  aws iam create-user --user-name "$USER" --profile "$PROFILE"
  echo "[ok] 사용자 생성: $USER"
fi

# 5. 인라인 정책 (덮어쓰기)
aws iam put-user-policy --user-name "$USER" \
  --policy-name s3-object-access \
  --policy-document "file://$TMP/iam-policy.json" --profile "$PROFILE"
echo "[ok] 사용자 정책"

# IAM 사용자당 키 2개까지이기에, 다른 과정들은 여러 번 실행해도 문제 없지만, 해당 과정만 여러 번 실행시, 별도로 삭제 과정이 필요하기에 별도 분리
# 엑세스 키 생성까지 조건을 걸어, 자동화 해버리면, 시크릿키를 조회할 수 X
echo
echo "액세스 키는 아래 명령으로 따로 만드세요."
echo "  aws iam create-access-key --user-name $USER --profile $PROFILE"
