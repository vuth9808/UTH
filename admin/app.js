// --- CHỨC NĂNG QUẢN LÝ HỌC PHẦN (ADMIN) ---

function toggleCourseForm() {
  const form = document.getElementById('addCourseForm');
  if(form) form.style.display = form.style.display === 'block' ? 'none' : 'block';
}

function saveCourse() {
  const id = document.getElementById('courseId').value;
  const name = document.getElementById('courseName').value;
  const credits = document.getElementById('courseCredits').value || '3';
  
  if(!id || !name) {
    showToast('Vui lòng nhập Mã và Tên học phần!');
    return;
  }

  const tbody = document.getElementById('courseTableBody');
  const newRow = `
    <tr>
      <td style="font-weight:600;">${id}</td>
      <td style="font-weight:600;">${name}</td>
      <td>${credits}</td>
      <td>Chưa phân công</td>
      <td>0/50</td>
      <td><span class="pill" style="background:#E0F2F1; color:#00897B;">Mở đăng ký</span></td>
      <td><button class="action-btn btn-edit">Sửa</button><button class="action-btn btn-delete">Xóa</button></td>
    </tr>
  `;
  tbody.insertAdjacentHTML('afterbegin', newRow);
  
  toggleCourseForm();
  showToast('Đã thêm học phần ' + name);
  
  // Xóa trắng dữ liệu sau khi lưu
  document.getElementById('courseId').value = '';
  document.getElementById('courseName').value = '';
  document.getElementById('courseCredits').value = '';
}

// Lắng nghe sự kiện click nút Xóa động
document.addEventListener('click', function(e) {
  if(e.target && e.target.classList.contains('btn-delete')) {
    if(confirm('Bạn có chắc muốn xóa học phần này?')) {
      e.target.closest('tr').remove();
      showToast('Đã xóa học phần');
    }
  }
});