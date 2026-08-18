/* =========================================================================
   네이버 검색광고 전환추적 (전체 페이지 공통)
   -------------------------------------------------------------------------
   계정ID(네이버 공통키)는 네이버 광고주센터 > 도구 > 전환 추적 관리 에서
   'https://www.isa-lab.co.kr' 행의 값을 가져온 것입니다.

   [전환유형 코드 선택 이유]
   네이버 전환유형 중 일부는 '광고 보고서'에 집계되지 않고 프리미엄 로그분석
   에서만 보입니다. 어떤 검색어가 견적·전화를 만들어내는지 광고 보고서에서
   확인하는 것이 목적이므로, 보고서에 집계되는 코드를 사용합니다.
     - lead      = 신청완료   → 광고 보고서 집계 O  (견적 요청 완료에 사용)
     - custom001 = 사용자정의 → 광고 보고서 집계 O  (전화 클릭에 사용)
   참고: 의미상 더 가까운 inquiry(문의/상담), call(전화하기) 코드도 있으나
        둘 다 광고 보고서에 집계되지 않아 채택하지 않았습니다.
   문서: https://naver.github.io/conversion-tracking/
   ========================================================================= */
(function () {
  'use strict';

  var WCS_ACCOUNT_ID     = 's_471a615559e2'; // 네이버 공통키 (www.isa-lab.co.kr)
  var WCS_DOMAIN         = 'isa-lab.co.kr';  // 루트 도메인 (www 유무 모두 포함)
  var TRANS_TYPE_CALL    = 'custom001';      // 전화 클릭
  var TRANS_TYPE_INQUIRY = 'lead';           // 견적 신청 완료

  /* ── 공통 로그 수집 (유입·페이지뷰) ─────────────────────── */
  if (window.wcs) {
    window.wcs_add = window.wcs_add || {};
    window.wcs_add['wa'] = WCS_ACCOUNT_ID;
    try {
      wcs.inflow(WCS_DOMAIN);
      if (window.wcs_do) wcs_do();
    } catch (e) {}
  }

  /* ── 전환 전송 공통 함수 ────────────────────────────────── */
  function trans(type) {
    if (!window.wcs || !window.wcs.trans) return;
    try { wcs.trans({ type: type }); } catch (e) {}
  }

  /* ── 1) 전화 클릭 전환 (tel: 링크) ──────────────────────── */
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.nodeType === 1) {
      if (el.tagName === 'A') {
        var href = el.getAttribute('href') || '';
        if (href.toLowerCase().indexOf('tel:') === 0) trans(TRANS_TYPE_CALL);
        return;
      }
      el = el.parentNode;
    }
  }, true);

  /* ── 2) 견적·상담 신청 완료 전환 ────────────────────────── */
  /*    별도 완료 페이지가 없으므로 폼 전송 성공 콜백에서 호출합니다.
        (quote.html 의 submitForm 성공 분기 → isaTrackInquiry() 호출)      */
  window.isaTrackInquiry = function () { trans(TRANS_TYPE_INQUIRY); };
})();
