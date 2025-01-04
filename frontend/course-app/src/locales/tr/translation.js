export default {
  common: {
    welcome: "Hoş geldiniz",
    hello: "Merhaba",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    logout: "Çıkış Yap"
  },
  nav: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    contact: "İletişim",
    educator: "Eğitmen",
    courses: "Kurslar",
    profile: "Profilim"
  },
  orders: {
    title: "Siparişlerim",
    orderId: "Sipariş ID",
    purchasedCourses: "Satın Alınan Kurslar",
    totalPrice: "Toplam Fiyat"
  },
  password: {
    title: "Şifre Değiştir",
    currentPassword: "Mevcut Şifre",
    newPassword: "Yeni Şifre",
    confirmPassword: "Yeni Şifre (Tekrar)",
    updateButton: "Şifreyi Güncelle",
    cancelButton: "İptal",
    changeButton: "Şifre Değiştir",
    mismatchError: "Yeni şifreler eşleşmiyor"
  },
  course: {
    details: "Detaya Git",
    price: "{{price}} TL"
  },
  courseForm: {
    addNew: "Yeni Kurs Ekle",
    update: "Kurs Güncelle",
    name: "Kurs Adı",
    description: "Açıklama",
    price: "Fiyat",
    category: "Kategori",
    selectImage: "Resim Seç",
    add: "Ekle",
    updateButton: "Güncelle",
    success: {
      add: "Kurs başarıyla eklendi",
      update: "Kurs başarıyla güncellendi"
    },
    error: {
      add: "Kurs eklenirken bir hata oluştu",
      update: "Kurs güncellenirken bir hata oluştu",
      general: "Bir hata oluştu"
    }
  },
  courseList: {
    categories: "Kategoriler",
    searchPlaceholder: "Kurs ara...",
    clearFilters: "Filtreleri Temizle"
  },
  educator: {
    allCourses: "Tüm Kurslar",
    addNewCourse: "Yeni Kurs Ekle",
    deleteDialog: {
      title: "Kursu Sil",
      confirmMessage: '"{{courseName}}" kursunu silmek istediğinizden emin misiniz?',
      cancelButton: "İptal",
      deleteButton: "Sil"
    },
    notifications: {
      deleteSuccess: "Kurs başarıyla silindi",
      deleteError: "Kurs silinirken bir hata oluştu"
    }
  },
  home: {
    welcome: "Hoş Geldiniz, {{username}}!"
  },
  payment: {
    title: "Ödeme Bilgileri",
    cardName: "Kart Üzerindeki İsim",
    cardNumber: "Kart Numarası",
    expirationDate: "Son Kullanma Tarihi",
    cvv: "CVV",
    address: "Teslimat Adresi",
    completePayment: "Ödemeyi Tamamla",
    success: "Ödeme işleminiz başarıyla tamamlandı!",
    error: "Ödeme işlemi sırasında bir hata oluştu.",
  },
  courseDetail: {
    loginRequired: "Lütfen sepete ürün eklemek için giriş yapınız",
    addToBasket: "Sepete Ekle",
    price: "{{price}} TL",
    category: "Kategori: {{categoryName}}"
  },
  signIn: {
    title: "Giriş Yap",
    username: "Kullanıcı Adı",
    password: "Şifre",
    submit: "Giriş Yap",
    noAccount: "Hesabınız yok mu? Kayıt Olun",
    error: "Giriş sırasında bir hata oluştu"
  },
  signUp: {
    title: "Kayıt Ol",
    firstName: "Ad",
    lastName: "Soyad",
    email: "E-posta",
    username: "Kullanıcı Adı",
    password: "Şifre",
    submit: "Kayıt Ol",
    haveAccount: "Zaten hesabınız var mı? Giriş Yapın",
    error: {
      requiredFields: "Tüm alanların doldurulması zorunludur."
    }
  }
}
