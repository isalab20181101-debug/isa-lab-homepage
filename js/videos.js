/* ============================================================
   유튜브 홍보영상 목록 · 아이에스에이연구원 (@ISALABB)
   ------------------------------------------------------------
   ■ 새 영상을 올렸을 때 하는 일 (이 파일만 고치면 됩니다)
     1) 유튜브에서 영상 주소를 복사합니다.
        예) https://www.youtube.com/watch?v=EAPOz7lSgA0
                                          └──── 이 11글자가 id ────┘
     2) 아래 목록 맨 위에 한 줄을 추가합니다.
        { id: '영상주소11글자', title: '제목', dur: '재생시간', cat: '검사정보' },
     3) cat(분류)은 검사정보 / 현장스케치 / 회사소개 중 하나를 씁니다.
   ※ 목록은 최신순입니다. 맨 위 3개가 메인 화면에 자동으로 표시됩니다.
   ※ 이 파일 하나만 고치면 메인 화면과 홍보영상 페이지가 함께 바뀝니다.
   ============================================================ */
window.ISA_VIDEOS = [
  { id: 'IagegxLwAaM', title: '소비기한 설정 시험이란? 영상 하나로 궁금증 해결!', dur: '10:09', cat: '검사정보' },
  { id: 'EAPOz7lSgA0', title: '식약처 지정 설탕류 식품 기준, 영상 하나로 끝내자!', dur: '1:47', cat: '검사정보' },
  { id: 'lxn2vjJPbgA', title: '2026 킨텍스 서울푸드 박람회에 다녀왔습니다', dur: '1:28', cat: '현장스케치' },
  { id: 'iRvUU24QbHg', title: '2026 서울푸드 박람회 준비 과정을 담았습니다', dur: '2:10', cat: '현장스케치' },
  { id: 'MT0dOtL8GsM', title: '자가품질검사 주기 총정리 — 식품·축산물·건강기능식품·식품첨가물', dur: '4:05', cat: '검사정보' },
  { id: 'jfzUDyEZEeo', title: '식약처 지정 떡류 식품 기준 간단 요약', dur: '2:34', cat: '검사정보' },
  { id: 'whV3vMgsULk', title: '김제시 위생관리팀과 함께한 식품 위생·품질관리 실무 교육', dur: '2:27', cat: '현장스케치' },
  { id: 'l9tDznvaTeg', title: '김제시 위생관리팀 실무교육 준비 과정', dur: '1:09', cat: '현장스케치' },
  { id: 'vXxtgkytUNU', title: '생식용 식육제품 안전관리 가이드라인 핵심 정리', dur: '4:31', cat: '검사정보' },
  { id: '53BuE3iokhI', title: '식약처 지정 떡류 식품 기준 요약 정리', dur: '1:38', cat: '검사정보' },
  { id: 'D5KTVF6jRXI', title: '식약처 지정 과자류 식품 기준 간단 정리', dur: '2:35', cat: '검사정보' },
  { id: 'XnIyNQXd5fc', title: '자가품질검사 한 번에 정리해드립니다 — 대상·주기·검체 준비 안내', dur: '3:13', cat: '검사정보' },
  { id: 'y4ASWoY3eCM', title: '[현장스케치] 2025 HACCP·표시기준·미생물 이론과정', dur: '2:57', cat: '현장스케치' },
  { id: 's5YQSTwrx-8', title: '2025 서울푸드에 참가한 아이에스에이연구원 2탄', dur: '3:23', cat: '현장스케치' },
  { id: 'JsAJ9F-Fh3E', title: '2025 식품박람회에 참가한 아이에스에이연구원 1탄', dur: '2:05', cat: '현장스케치' },
  { id: 'WM-1_4-KaeM', title: '아이에스에이연구원은 이런 일을 합니다', dur: '1:06', cat: '회사소개' },
  { id: 'kueLdWoC6ho', title: '아이에스에이연구원 뭐하는 곳인가요?', dur: '1:05', cat: '회사소개' },
  { id: '2CxzZxwwXl4', title: '24년 식품표시기준 및 HACCP 설명회 영상', dur: '2:53', cat: '현장스케치' }
];

window.ISA_YOUTUBE_CHANNEL = 'https://www.youtube.com/@ISALABB';

/* ------------------------------------------------------------
   영상 카드를 그립니다.
   페이지를 열 때는 유튜브 썸네일 그림만 불러오고(약 20KB),
   방문자가 재생 버튼을 눌렀을 때 비로소 영상을 불러옵니다.
   → 페이지가 느려지지 않고, 재생 전까지 추적 쿠키도 생기지 않습니다.
     (쿠키를 쓰지 않는 youtube-nocookie.com 주소를 사용합니다)
   ------------------------------------------------------------ */
(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function cardHTML(v) {
    const t = esc(v.title);
    return '<a class="vid-card" href="https://www.youtube.com/watch?v=' + esc(v.id) + '"' +
      ' target="_blank" rel="noopener" data-vid="' + esc(v.id) + '" data-cat="' + esc(v.cat) + '"' +
      ' aria-label="' + t + ' 영상 재생">' +
      '<div class="vid-thumb">' +
        '<img src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">' +
        '<span class="vid-play"></span>' +
        '<span class="vid-dur">' + esc(v.dur) + '</span>' +
      '</div>' +
      '<div class="vid-body">' +
        '<span class="vid-cat vc-' + (v.cat === '검사정보' ? 'info' : v.cat === '현장스케치' ? 'field' : 'about') + '">' + esc(v.cat) + '</span>' +
        '<div class="vid-title">' + t + '</div>' +
      '</div>' +
    '</a>';
  }

  // 썸네일을 실제 영상으로 바꿔 재생
  function play(card) {
    const id = card.getAttribute('data-vid');
    const thumb = card.querySelector('.vid-thumb');
    if (!id || !thumb || thumb.querySelector('iframe')) return;
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
    f.title = card.getAttribute('aria-label') || '홍보영상';
    f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    f.setAttribute('frameborder', '0');
    thumb.innerHTML = '';
    thumb.appendChild(f);
    card.classList.add('playing');
  }

  /**
   * @param {string} selector  카드를 넣을 영역 (예: '#videoGrid')
   * @param {number} [limit]   보여줄 개수. 비우면 전체
   * @param {string} [cat]     분류로 거르기. 비우면 전체
   */
  window.renderIsaVideos = function (selector, limit, cat) {
    const box = document.querySelector(selector);
    if (!box) return;
    let list = window.ISA_VIDEOS;
    if (cat) list = list.filter(function (v) { return v.cat === cat; });
    if (limit) list = list.slice(0, limit);

    box.innerHTML = list.map(cardHTML).join('');
    box.addEventListener('click', function (e) {
      const card = e.target.closest('.vid-card');
      if (!card || card.classList.contains('playing')) return;
      e.preventDefault();   // 유튜브로 이동하지 않고 이 자리에서 재생
      play(card);
    });
    return list.length;
  };
})();
