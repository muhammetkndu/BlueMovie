export default function Footer() {
    return (
      <footer className="bg-white text-gray-400 py-10 mt-16 border-t border-gray-800 dark:bg-black dark:text-white">
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">

    {/* Logo ve Açıklama */}
    <div className="flex-1 mb-8 md:mb-0">
      <h2 className="text-2xl font-bold">BlueMovie</h2>
      <p className="mt-2 text-sm max-w-sm">
        En iyi filmleri ve dizileri keşfet. Kullanıcı dostu arayüz ve güçlü filtreleme özellikleri ile keyifli vakit geçir.
      </p>
    </div>

    {/* Bülten Aboneliği */}
    <div className="flex-1 mb-8 md:mb-0">
      <h3 className="font-semibold mb-4 dark:text-white">Bültene Abone Ol</h3>
      <form className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="E-posta adresinizi girin"
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition"
        >
          Abone Ol
        </button>
      </form>
    </div>

    {/* İletişim ve Sosyal Medya */}
    <div className="flex-1">
      <h3 className="font-semibold mb-4 dark:text-white">İletişim</h3>
      <p>Email: <a href="mailto:info@mamihub.com" className="hover:text-red-500">info@bluemovie.com</a></p>
      <p>Telefon: <a href="tel:+901234567890" className="hover:text-red-500">+90 123 456 7890</a></p>
      <p className="mt-4">Bizi sosyal medyada takip edin:</p>
      <div className="flex gap-4 text-xl mt-2">
        <a href="#" className="dark:hover:text-red-500 hover:text-black transition"><i className="bi bi-instagram"></i></a>
        <a href="#" className="dark:hover:text-red-500 hover:text-black transition"><i className="bi bi-twitter-x"></i></a>
        <a href="https://www.linkedin.com/in/muhammet-kondu-89a44a2a5/" className="dark:hover:text-red-500 hover:text-black transition"><i className="bi bi-linkedin"></i></a>
        <a href="https://github.com/muhammetkndu" className="dark:hover:text-red-500 hover:text-black transition"><i className="bi bi-github"></i></a>
      </div>
    </div>

  </div>

  {/* Alt Bilgi */}
  <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} BlueMovie. Tüm hakları saklıdır.
  </div>
</footer>


    );
  }
  