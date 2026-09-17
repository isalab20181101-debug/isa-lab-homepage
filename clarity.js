/* =========================================================================
   Microsoft Clarity 방문자 분석 (전체 페이지 공통)
   -------------------------------------------------------------------------
   방문자 수·유입 기기·페이지별 조회수와, 어느 메뉴/버튼을 많이 클릭하는지
   히트맵으로 보여주는 무료 도구입니다.  https://clarity.microsoft.com

   [설정 방법]
   1) clarity.microsoft.com 로그인 → 새 프로젝트 → 사이트 URL 입력
   2) 프로젝트 설정 > 개요 > '프로젝트 ID' (영문·숫자 10자 내외) 복사
   3) 아래 CLARITY_PROJECT_ID 값에 붙여넣기
   ID가 비어 있으면 아무 것도 실행되지 않습니다.

   [메뉴 클릭 집계]
   상단 메뉴(.nav-link / .dropdown a)와 퀵메뉴(.quick-btn) 클릭 시
   메뉴 이름을 태그(menu)와 사용자 이벤트(menu_click)로 전송합니다.
   Clarity 대시보드 > 필터 > '사용자 지정 태그: menu' 로 메뉴별 클릭 수 확인.
   ========================================================================= */
(function () {
  'use strict';

  var CLARITY_PROJECT_ID = 'yjl3l00i9l'; // ← Clarity 프로젝트 ID 입력

  if (!CLARITY_PROJECT_ID) return;

  /* ── Clarity 공식 스니펫 ───────────────────────────────── */
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);

  /* ── 메뉴·퀵메뉴 클릭 → 메뉴 이름 태그 전송 ─────────────── */
  function menuLabel(a) {
    var text = (a.textContent || '').replace(/\s+/g, ' ').trim();
    if (a.classList.contains('quick-btn')) return '퀵메뉴 > ' + text;
    var item = a.closest ? a.closest('.nav-item') : null;
    var top = item ? item.querySelector('.nav-link') : null;
    if (top && top !== a) return (top.textContent || '').trim() + ' > ' + text;
    return text;
  }

  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.nodeType === 1) {
      if (el.tagName === 'A') {
        var isMenu = el.classList.contains('nav-link') ||
                     el.classList.contains('quick-btn') ||
                     (el.parentNode && el.parentNode.classList &&
                      el.parentNode.classList.contains('dropdown'));
        if (isMenu && window.clarity) {
          try {
            window.clarity('set', 'menu', menuLabel(el));
            window.clarity('event', 'menu_click');
          } catch (err) {}
        }
        return;
      }
      el = el.parentNode;
    }
  }, true);
})();
