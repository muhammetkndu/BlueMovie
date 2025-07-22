export default function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-10 mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between  gap-8">
          
          {/* Logo ve Açıklama */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">MamiHub</h2>
            <p className="mt-2 text-sm">
              En iyi filmleri ve dizileri keşfet. Kullanıcı dostu arayüz ve güçlü filtreleme özellikleri ile keyifli vakit geçir.
            </p>
          </div>
  
          {/* Navigasyon Linkleri */}
          <div className="flex-1 flex flex-col space-y-2">
            <h3 className="text-white font-semibold mb-2">Menü</h3>
            <a href="#" className="hover:text-white transition">Anasayfa</a>
            <a href="#" className="hover:text-white transition">Kategoriler</a>
            <a href="#" className="hover:text-white transition">Popüler</a>
            <a href="#" className="hover:text-white transition">İletişim</a>
          </div>
  
          {/* Sosyal Medya */}
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2">Bizi Takip Et</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-white transition"><i className="bi bi-instagram"></i></a>
              <a href="#" className="hover:text-white transition"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="hover:text-white transition"><i className="bi bi-youtube"></i></a>
              <a href="#" className="hover:text-white transition"><i className="bi bi-github"></i></a>
            </div>
          </div>
        </div>
  
        {/* Alt Bilgi */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MovieZone. Tüm hakları saklıdır.
        </div>
      </footer>
    );
  }
  