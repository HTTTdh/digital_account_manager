const API_BASE_URL = "/api";

const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    update: (id) => `${API_BASE_URL}/auth/update/${id}`,
    getUserForC1: `${API_BASE_URL}/admin/tai-khoan/level1`,
    getUserForC2: `${API_BASE_URL}/admin/tai-khoan/level2`,
    me: `${API_BASE_URL}/admin/me`
  },
  PhongBan: {
    getAllPB: `${API_BASE_URL}/admin/phong_ban`,
    createPB: `${API_BASE_URL}/admin/phong_ban`,
    updatePB: (id) => `${API_BASE_URL}/admin/phong_ban/${id}`,
    deletePB: (id) => `${API_BASE_URL}/admin/phong_ban/${id}`
    },
  DanhMucTaiSan: {
    getAllDMTS: `${API_BASE_URL}/admin/danh_muc_tai_san`,
    createDMTS: `${API_BASE_URL}/admin/danh_muc_tai_san`,
    updateDMTS: (id) => `${API_BASE_URL}/admin/danh_muc_tai_san/${id}`,
    deleteDMTS: (id) => `${API_BASE_URL}/admin/danh_muc_tai_san/${id}`
    },
  TaiSan: {
    getAllTS: `${API_BASE_URL}/admin/tai_san`,
    getAllTSByDMTS: (idDM) => `${API_BASE_URL}/admin/tai_san?idDanhMucTaiSan=${idDM}`,
    createTS: `${API_BASE_URL}/admin/tai_san`,
    updateTS: (id) => `${API_BASE_URL}/admin/tai_san/${id}`,
    deleteTS: (id) => `${API_BASE_URL}/admin/tai_san/${id}`
    },
  ThongTinTaiSan: {
    getAllCaNhan: `${API_BASE_URL}/admin/thong_tin_tai_san`,
    getByFilter: `${API_BASE_URL}/admin/v1/thong_tin_tai_san`,
    createTTTS: `${API_BASE_URL}/admin/thong_tin_tai_san`,
    updateTTTS: (id) => `${API_BASE_URL}/admin/thong_tin_tai_san/${id}`,
    noticeHetHan: `${API_BASE_URL}/admin/thong_bao_het_han`
    },
  YeuCau: {
    getAllYC: `${API_BASE_URL}/admin/yeu_cau`,
    updateYC: (id)=>`${API_BASE_URL}/admin/yeu_cau/${id}`      
    },
  HanhDong: {
    getAllHD: `${API_BASE_URL}/admin/hanh_dong`,  
    getHDByUser: `${API_BASE_URL}/admin/user/hanh_dong`,
  }
};

export default API_ENDPOINTS;
