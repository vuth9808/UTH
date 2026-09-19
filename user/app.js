function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

function toggleChatbot(forceOpen){
  const panel = document.getElementById('chatbotPanel');
  if(!panel) return;
  if(forceOpen===true){ panel.classList.add('show'); }
  else{ panel.classList.toggle('show'); }
}

const chatAnswers = {
  'Theo chương trình khung': 'Theo chương trình khung, học kỳ này bạn nên đăng ký: <b>Cấu trúc dữ liệu &amp; Giải thuật</b> và <b>Cơ sở dữ liệu</b> để đúng tiến độ.',
  'Theo tiến độ học tập': 'Bạn đang chậm 1 học phần so với chương trình chuẩn. Gợi ý: ưu tiên đăng ký <b>Cấu trúc dữ liệu &amp; Giải thuật</b> trước khi lớp đầy.',
  'Theo yêu cầu riêng': 'Với lịch rảnh sáng thứ 2-4-6, bạn có thể chọn: <b>Mạng máy tính</b> (Thứ 5) và <b>Lập trình Web</b> (Thứ 2) — không trùng khung giờ bạn chọn.'
};
function chatReply(key){
  const body = document.getElementById('chatbotBody');
  if(!body) return;
  const userBubble = document.createElement('div');
  userBubble.className='chat-bubble';
  userBubble.style.marginLeft='auto';
  userBubble.textContent = key;
  body.appendChild(userBubble);

  const botBubble = document.createElement('div');
  botBubble.className='chat-bubble bot';
  botBubble.innerHTML = chatAnswers[key] || 'Mình sẽ ghi nhận yêu cầu này.';
  body.appendChild(botBubble);
  body.scrollTop = body.scrollHeight;
}

/* ---- Tab: Đăng ký / Học phần đã đăng ký (register.html) ---- */
function switchRegTab(tab){
  const isReg = tab === 'reg';
  document.getElementById('tabReg').style.display = isReg ? 'block' : 'none';
  document.getElementById('tabCancel').style.display = isReg ? 'none' : 'block';
  document.getElementById('tabBtnReg').classList.toggle('active', isReg);
  document.getElementById('tabBtnCancel').classList.toggle('active', !isReg);
}

/* ---- Đăng ký học phần (register.html) ---- */
function toggleRegister(btn, name){
  const credit = parseInt(btn.dataset.credit,10);
  const creditText = document.getElementById('creditText');
  const creditBar = document.getElementById('creditBar');
  let total = parseInt(creditText.textContent,10);
  if(btn.classList.contains('registered')){
    total -= credit;
    btn.classList.remove('registered');
    btn.textContent = 'Đăng ký';
    showToast('Đã bỏ chọn: ' + name);
  }else{
    total += credit;
    btn.classList.add('registered');
    btn.textContent = '✓ Đã đăng ký';
    showToast('Đăng ký thành công: ' + name);
  }
  creditText.textContent = total;
  creditBar.style.width = Math.min(100, total/24*100) + '%';
}

/* ---- Hủy đăng ký học phần (unregister.html) ---- */
function cancelCourse(btn, name){
  const card = btn.closest('.course-card');
  card.style.opacity = '0.4';
  btn.disabled = true;
  btn.textContent = 'Đã hủy';
  showToast('Đã hủy đăng ký: ' + name);
}

/* ---- Tab: Học phí ngành / Học phí khác (tuition.html) ---- */
function switchTuitionTab(tab){
  const isNganh = tab === 'nganh';
  document.getElementById('tabNganh').style.display = isNganh ? 'block' : 'none';
  document.getElementById('tabKhac').style.display = isNganh ? 'none' : 'block';
  document.getElementById('tabBtnNganh').classList.toggle('active', isNganh);
  document.getElementById('tabBtnKhac').classList.toggle('active', !isNganh);
}

/* ---- Xem học phí (tuition.html) ---- */
function markPaid(){
  const pill = document.getElementById('tuitionPill');
  pill.textContent = 'Đã thanh toán';
  pill.className = 'pill paid';
  showToast('Đã ghi nhận thanh toán học phí');
}

/* ---- Yêu cầu hỗ trợ ngoại lệ (support.html) ---- */
function submitSupport(){
  const title = document.getElementById('supTitle').value.trim();
  const content = document.getElementById('supContent').value.trim();
  const reason = document.getElementById('supReason').value.trim();
  if(!title || !content){ showToast('Vui lòng nhập tiêu đề và nội dung'); return; }
  document.getElementById('supportListEmpty').style.display='none';
  const item = document.createElement('div');
  item.className='support-list-item';
  item.innerHTML = '<div class="top"><span>'+title+'</span><span class="tag doing">Chờ xử lý</span></div><div class="desc">'+content+(reason? ' — Lý do: '+reason : '')+'</div>';
  document.getElementById('supportList').prepend(item);
  document.getElementById('supTitle').value='';
  document.getElementById('supContent').value='';
  document.getElementById('supReason').value='';
  showToast('Đã gửi yêu cầu hỗ trợ tới Phòng đào tạo');
}

/* ---- Đăng ký học phần: bảng chọn học phần → lớp → chi tiết (UTH-v3) ---- */
const COURSES = [
  { stt:1, ma:'0120004116', ten:'Bơi 1', tc:2, batbuoc:false, dieukien:'' },
  { stt:2, ma:'0120004117', ten:'Bơi 2', tc:2, batbuoc:false, dieukien:'' },
  { stt:3, ma:'0120004125', ten:'Thể dục thể hình căn bản - Fitness 1', tc:2, batbuoc:false, dieukien:'' },
  { stt:4, ma:'0120004126', ten:'Thể dục thể hình nâng cao - Fitness 2', tc:2, batbuoc:false, dieukien:'' },
  { stt:5, ma:'0120124003', ten:'Phân tích thiết kế giải thuật', tc:3, batbuoc:true, dieukien:'124002(a)' },
  { stt:6, ma:'0120124005', ten:'Lập trình Web', tc:3, batbuoc:true, dieukien:'' },
];
const CLASSES = {
  '0120004125': [
    { ma:'0120004125.1', gv:'GV. Trần Thị B', lich:'Thứ 2, 06:00-07:30', phong:'Nhà thi đấu A', siso:'30/40', dadk:false },
    { ma:'0120004125.2', gv:'GV. Nguyễn Văn C', lich:'Thứ 5, 15:00-16:30', phong:'Nhà thi đấu B', siso:'25/40', dadk:false },
  ],
  '0120124003': [
    { ma:'0120124003.1', gv:'GV. Phạm Văn E', lich:'Thứ 2, 07:30-09:30', phong:'P.A203', siso:'42/50', dadk:false },
    { ma:'0120124003.2', gv:'GV. Lê Thị D', lich:'Thứ 4, 13:30-15:30', phong:'P.B105', siso:'38/50', dadk:false },
  ],
  '0120124005': [
    { ma:'0120124005.1', gv:'GV. Trần Thị B', lich:'Thứ 2, 07:30-09:30', phong:'P.A203', siso:'42/50', dadk:false },
  ],
};
let selectedCourse = null, selectedClass = null;
const FEE_PER_TC = 450000;

const REGISTERED = [
  { ma:'012012400204', ten:'Cấu trúc dữ liệu và giải thuật', lop:'CNS_CS1', tc:4 },
  { ma:'012012500108', ten:'Hệ điều hành', lop:'CNS_CS1', tc:4 },
  { ma:'012011000305', ten:'Toán rời rạc', lop:'CNS_CS1', tc:3 },
  { ma:'012020010107', ten:'Tiếng Anh chuyên ngành', lop:'CNS_CS1', tc:2 },
  { ma:'012014060201', ten:'Mạng máy tính', lop:'CNS_CS1', tc:3 },
];

function renderCourseTable(){
  const body = document.getElementById('courseTableBody');
  if(!body) return;
  body.innerHTML = COURSES.map(c => `
    <tr id="crow-${c.ma}" onclick="selectCourse('${c.ma}')">
      <td><input type="radio" name="hocphan" onclick="selectCourse('${c.ma}')"></td>
      <td>${c.stt}</td>
      <td>${c.ma}</td>
      <td>${c.ten}</td>
      <td>${c.tc}</td>
      <td><span class="badge-icon ${c.batbuoc ? 'ok':'no'}">${c.batbuoc ? '✔' : '✘'}</span></td>
      <td>${c.dieukien ? `<span class="cond-link">${c.dieukien}</span>` : ''}</td>
    </tr>`).join('');
}

function selectCourse(ma){
  selectedCourse = ma; selectedClass = null;
  updateDangKyButton();
  document.querySelectorAll('#courseTableBody tr').forEach(r => r.classList.remove('selected'));
  document.getElementById('crow-'+ma)?.classList.add('selected');
  const radio = document.querySelector(`#crow-${ma} input[type=radio]`);
  if(radio) radio.checked = true;

  const classBody = document.getElementById('classTableBody');
  document.getElementById('classDetailBody').innerHTML = '<tr><td class="sub" style="text-align:center; padding:20px;">Chọn lớp học phần để xem chi tiết</td></tr>';
  const classes = CLASSES[ma];
  if(!classes){
    classBody.innerHTML = '<tr><td colspan="3" class="sub" style="text-align:center; padding:20px;">Học phần này hiện chưa mở lớp</td></tr>';
    return;
  }
  classBody.innerHTML = classes.map((cl,i) => `
    <tr id="clrow-${cl.ma}" onclick="selectClass('${ma}','${cl.ma}')">
      <td>${i+1}</td>
      <td>${cl.ma} — ${cl.gv}</td>
      <td>${cl.dadk ? '✔' : ''}</td>
    </tr>`).join('');
}

function selectClass(courseMa, classMa){
  selectedClass = classMa;
  updateDangKyButton();
  document.querySelectorAll('#classTableBody tr').forEach(r => r.classList.remove('row-selected'));
  document.getElementById('clrow-'+classMa)?.classList.add('row-selected');
  const course = COURSES.find(c => c.ma === courseMa);
  const cl = CLASSES[courseMa].find(c => c.ma === classMa);
  document.getElementById('classDetailBody').innerHTML = `
    <tr><td><b>${cl.lich}</b><br><span class="sub">${course.ten} · ${cl.gv} · ${cl.phong} · Sĩ số ${cl.siso}</span></td></tr>`;
}

function updateDangKyButton(){
  const btn = document.getElementById('btnDangKy');
  if(!btn) return;
  const ready = selectedCourse && selectedClass;
  btn.disabled = !ready;
  btn.classList.toggle('enabled', !!ready);
}

function confirmDangKy(){
  if(!selectedCourse || !selectedClass) return;
  const course = COURSES.find(c => c.ma === selectedCourse);
  const cl = CLASSES[selectedCourse].find(c => c.ma === selectedClass);
  REGISTERED.push({ ma:cl.ma, ten:course.ten, lop:'CNS_CS1', tc:course.tc });
  renderRegisteredTable();
  showToast(`Đăng ký thành công lớp ${cl.ma} — ${course.ten}`);
  selectedCourse = null; selectedClass = null;
  updateDangKyButton();
}

function renderRegisteredTable(){
  const body = document.getElementById('registeredTableBody');
  if(!body) return;
  body.innerHTML = REGISTERED.map((r,i) => `
    <tr id="reg-row-${i}">
      <td>
        <button class="btn-mini view" onclick="showToast('Lịch học của ${r.ten}: xem tại mục Lịch học đã đăng ký')">XEM LỊCH</button>
        <button class="btn-mini cancel" onclick="cancelRegistered(${i})">HỦY ĐĂNG KÝ</button>
      </td>
      <td>${i+1}</td>
      <td>${r.ma}</td>
      <td>${r.ten}</td>
      <td>${r.lop}</td>
      <td>${r.tc}</td>
      <td>${(r.tc*FEE_PER_TC).toLocaleString('vi-VN')}</td>
      <td>—</td>
      <td><span class="thu-icon no">✘</span></td>
      <td>Đã đăng ký</td>
    </tr>`).join('');
  const totalTC = REGISTERED.reduce((s,r) => s+r.tc, 0);
  const totalFee = totalTC * FEE_PER_TC;
  document.getElementById('totalTC').textContent = totalTC;
  document.getElementById('totalFee').textContent = totalFee.toLocaleString('vi-VN') + ' đ';
}

function cancelRegistered(i){
  const row = document.getElementById('reg-row-'+i);
  const name = REGISTERED[i].ten;
  REGISTERED.splice(i,1);
  renderRegisteredTable();
  showToast(`Đã hủy đăng ký: ${name}`);
}

function startCountdown(){
  const els = { d:document.getElementById('cdDays'), h:document.getElementById('cdHours'), m:document.getElementById('cdMins'), s:document.getElementById('cdSecs') };
  if(!els.d) return;
  const target = new Date(Date.now() + (1*86400 + 11*3600 + 49*60 + 23)*1000);
  function tick(){
    const diff = Math.max(0, target - new Date());
    const d = Math.floor(diff/86400000);
    const h = Math.floor(diff%86400000/3600000);
    const m = Math.floor(diff%3600000/60000);
    const s = Math.floor(diff%60000/1000);
    els.d.textContent = String(d).padStart(2,'0');
    els.h.textContent = String(h).padStart(2,'0');
    els.m.textContent = String(m).padStart(2,'0');
    els.s.textContent = String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}
document.addEventListener('DOMContentLoaded', () => { renderCourseTable(); startCountdown(); renderRegisteredTable(); });
