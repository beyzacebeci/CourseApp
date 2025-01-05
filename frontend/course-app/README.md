# CourseLab - Online Eğitim Platformu

CourseLab, kullanıcıların çevrimiçi kurslar satın alabileceği, eğitmenlerin kurs oluşturabileceği ve yönetebileceği modern bir eğitim platformudur.

## Teknolojiler

### Frontend

- **React 18** - UI geliştirme için modern JavaScript kütüphanesi
- **Vite** - Hızlı ve optimize edilmiş build tool ve development server
- **Material-UI (MUI)** - React component kütüphanesi ve tasarım sistemi
- **React Router** - Sayfa yönlendirme ve navigasyon yönetimi
- **i18next** - Çoklu dil desteği (Türkçe/İngilizce)
- **Axios** - HTTP istekleri için Promise tabanlı HTTP client

### State Management

- Context API - React'in built-in state management çözümü
- Custom hooks - State ve business logic yönetimi için özelleştirilmiş hooks

### Backend Integration

- RESTful API entegrasyonu
- JWT tabanlı kimlik doğrulama
- Axios interceptors ile token yönetimi

## Özellikler

- 🔐 Kullanıcı Kimlik Doğrulama (Login/Register)
- 🌐 Çoklu Dil Desteği (TR/EN)
- 📚 Kurs Listeleme ve Detay Görüntüleme
- 🛒 Sepet Yönetimi
- 💳 Ödeme İşlemleri
- 👤 Kullanıcı Profil Yönetimi
- 📝 Eğitmen Paneli
- 🔍 Kurs Arama ve Filtreleme
- 📱 Responsive Tasarım

## Proje Yapısı

src/  
├── assets/ # Resimler ve statik dosyalar  
├── components/ # Yeniden kullanılabilir UI bileşenleri  
├── context/ # Context API state yönetimi  
├── locales/ # Dil dosyaları (TR/EN)  
├── pages/ # Sayfa bileşenleri  
└── services/ # API servisleri

# CourseLab Kurulum Kılavuzu

## Gereksinimler

Projeyi çalıştırmak için aşağıdaki yazılımların yüklü olması gerekmektedir:

- Node.js (v14.0.0 veya üzeri)
- npm (v6.0.0 veya üzeri)
- Git

## Kurulum Adımları

# Projeyi Başlatma Adımları

Projeyi geliştirme ortamınızda çalıştırmak için aşağıdaki adımları takip edin.

### 1. Repository'yi Klonlayın

```bash
git clone [repo-url]
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Development sunucusunu başlatın

```bash
npm run dev
```

## Context Providers

Uygulama aşağıdaki context provider'ları kullanmaktadır:

- `AuthProvider` - Kimlik doğrulama yönetimi
- `BasketProvider` - Sepet işlemleri
- `CategoryProvider` - Kategori yönetimi
- `CourseProvider` - Kurs işlemleri
- `OrderProvider` - Sipariş yönetimi
- `PaymentProvider` - Ödeme işlemleri
- `TranslationProvider` - Dil yönetimi
- `UserProvider` - Kullanıcı işlemleri

  ## Stil ve Tasarım

- Material-UI (MUI) component library
- Responsive tasarım
- Custom theme ve styling
- CSS-in-JS yaklaşımı
