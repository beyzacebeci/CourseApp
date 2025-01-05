export default {
  common: {
    welcome: "Hoş geldiniz",
    hello: "Merhaba",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    logout: "Çıkış Yap",
    back: "Geri Dön"
  },
  nav: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    contact: "İletişim",
    educator: "Eğitmen",
    courses: "Kurslarım",
    profile: "Profilim"
  },
  orders: {
    title: "Siparişlerim",
    orderId: "Sipariş Numarası",
    purchasedCourses: "Satın Alınan Kurslar",
    totalPrice: "Toplam Fiyat",
    createdTime: "Sipariş Tarihi"
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
      general: "Bir hata oluştu",
      duplicateName: "Bu kurs adı zaten veritabanında mevcut."
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
      deleteError: "Kurs silinirken bir hata oluştu",
      categoryAddSuccess: "Kategori başarıyla eklendi",
      categoryAddError: "Kategori eklenirken bir hata oluştu",
      categoryUpdateSuccess: "Kategori başarıyla güncellendi",
      categoryUpdateError: "Kategori güncellenirken bir hata oluştu",
      categoryDeleteSuccess: "Kategori başarıyla silindi",
      categoryDeleteError: "Kategori silinirken bir hata oluştu"
    },
    addNewCategory: "Yeni Kategori Ekle",
    addCategory: {
      title: "Kategori Yönetimi",
      name: "Kategori Adı",
      add: "Ekle",
      cancel: "İptal"
    }
  },
  home: {
    welcome: "Hoş Geldiniz, {{username}}!",
    carousel: {
      slide1: {
        title: "2025'i kariyer yılınız yapın",
        description: "İhtiyacınız olan yetkinlikleri CourseLab ile alın!"
      },
      slide2: {
        title: "Sertifikalar: İdeal kariyer adımı,",
        description: "COMPTIA, AWS Cloud ve daha pek çok sertifika sınavına hazırlanın."
      }
    },
    viewCourses: "Kurslara Göz At",
    infoSection: {
      title: "Geleceğinizi Şekillendiren Bilgi Merkezi",
      description: "Yapay zekadan dijital pazarlamaya, yazılımdan kişisel gelişime  CourseLab ile sınırsız öğrenme yolculuğunuza başlayın. Her seviyeye uygun, uzman eğitmenler eşliğinde kariyer hedeflerinize ulaşın."
    }
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
    error: "Giriş sırasında bir hata oluştu",
    success: "Giriş başarılı",
    error: "Kullanıcı adı veya şifre hatalı"
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
  },
  profile: {
    title: "Profil Bilgileri",
    name: "Ad",
    surname: "Soyad",
    email: "E-posta",
    username: "Kullanıcı Adı",
    cancel: "İptal",
    save: "Kaydet",
    fullName: "Ad Soyad"
  },
  validation: {
    required: "Bu alan zorunludur",
    email: "Geçerli bir e-posta adresi giriniz",
    minLength: "En az {{length}} karakter olmalıdır",
    maxLength: "En fazla {{length}} karakter olmalıdır",
    passwordMatch: "Şifreler eşleşmelidir",
    fillAllFields: "Lütfen tüm alanları doldurunuz"
  },
  basket: {
    title: "Alışveriş Sepeti",
    itemCount: "Sepette {{count}} Kurs Var",
    empty: "Sepetiniz boş",
    total: "Toplam",
    proceedToPayment: "Ödeme Bilgileri",
    deleteDialog: {
      title: "Ürünü Sil",
      message: "Bu ürünü sepetten silmek istediğinize emin misiniz?",
      confirm: "Evet, Sil"
    }
  },
  auth: {
    userCreatedSuccessfully: "Kullanıcı başarıyla oluşturuldu",
    errorOccurred: "Bir hata oluştu",
    profileUpdateSuccess: "Profil başarıyla güncellendi",
    profileUpdateError: "Profil güncellenirken bir hata oluştu",
    passwordUpdateSuccess: "Şifre başarıyla güncellendi",
    passwordUpdateError: "Şifre güncellenirken bir hata oluştu"
  }
}
