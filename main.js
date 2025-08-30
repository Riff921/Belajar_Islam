 // Ultra-optimized JavaScript with performance monitoring
        let completedSections = new Set();
        let completedTopics = new Set();
        let isLearningStarted = false;
        
        // Performance monitoring
        const performanceMetrics = {
            startTime: performance.now(),
            interactions: 0,
            animations: 0
        };
        
        // Debounced functions for better performance
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
        
        // Throttled functions for scroll events
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        };
        
        // Optimized progress loading
        function loadProgress() {
            try {
                const savedSections = localStorage.getItem('islamLearning_completedSections');
                const savedTopics = localStorage.getItem('islamLearning_completedTopics');
                
                if (savedSections) completedSections = new Set(JSON.parse(savedSections));
                if (savedTopics) completedTopics = new Set(JSON.parse(savedTopics));
                
                // Always start fresh on page load/refresh - don't auto-show sections
                isLearningStarted = false;
                document.getElementById('navigation-tabs').classList.add('hidden');
                document.querySelectorAll('[id^="section-"]').forEach(section => {
                    section.classList.add('hidden');
                });
                
                updateProgress();
                updateTopicIndicators();
            } catch (e) {
                console.warn('Error loading progress:', e);
            }
        }
        
        function saveProgress() {
            try {
                localStorage.setItem('islamLearning_completedSections', JSON.stringify([...completedSections]));
                localStorage.setItem('islamLearning_completedTopics', JSON.stringify([...completedTopics]));
                // Don't save isLearningStarted state - always start fresh
            } catch (e) {
                console.warn('Error saving progress:', e);
            }
        }

        // Simple loading initialization
        const initializeApp = () => {
            const loadingScreen = document.getElementById('loading-screen');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        };
        
        // Enhanced loading with multiple event listeners
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }
        
        window.addEventListener('load', () => {
            // Additional optimizations after full load
            requestIdleCallback(() => {
                // Preload critical resources
                const criticalElements = document.querySelectorAll('.card-hover');
                criticalElements.forEach(el => {
                    el.style.willChange = 'transform, box-shadow';
                });
            });
        });

        function updateTopicIndicators() {
            completedTopics.forEach(topic => {
                const card = document.querySelector(`[data-topic="${topic}"]`);
                if (card) {
                    const badge = card.querySelector('.completion-badge');
                    if (badge) {
                        badge.classList.remove('hidden');
                        badge.classList.add('show');
                    }
                }
            });
        }
        
        function startLearning() {
            isLearningStarted = true;
            const navTabs = document.getElementById('navigation-tabs');
            navTabs.classList.remove('hidden');
            showSection('sejarah');
            saveProgress();
            
            navTabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        


        // Optimized detail content
        const detailContent = {
            kelahiran: {
                title: "Kelahiran Islam",
                content: `
                    <div class="space-y-4">
                        <p>Islam lahir di Semenanjung Arab pada abad ke-7 Masehi, tepatnya pada tahun 610 M ketika Nabi Muhammad SAW menerima wahyu pertama di Gua Hira.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Latar Belakang:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li>Masyarakat Arab saat itu menyembah berhala</li>
                            <li>Terjadi ketimpangan sosial yang besar</li>
                            <li>Perdagangan berkembang pesat di Makkah</li>
                            <li>Ka'bah sudah menjadi pusat ziarah</li>
                        </ul>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Wahyu Pertama:</h4>
                        <p>Malaikat Jibril AS datang kepada Nabi Muhammad SAW dengan membawa wahyu pertama yaitu Surah Al-Alaq ayat 1-5.</p>
                        
                        <div class="bg-emerald-50 p-4 rounded-lg">
                            <p class="text-xl text-center text-emerald-700 mb-2">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</p>
                            <p class="text-center text-gray-600 italic">"Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan"</p>
                        </div>
                    </div>
                `
            },
            nabi: {
                title: "Nabi Muhammad SAW",
                content: `
                    <div class="space-y-4">
                        <p>Muhammad bin Abdullah lahir di Makkah pada tahun 570 M. Beliau dikenal sebagai Al-Amin (yang terpercaya) bahkan sebelum menjadi nabi.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Kehidupan Sebelum Kenabian:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li>Yatim piatu sejak kecil, diasuh oleh kakek dan paman</li>
                            <li>Bekerja sebagai pedagang yang jujur</li>
                            <li>Menikah dengan Khadijah RA pada usia 25 tahun</li>
                            <li>Sering menyendiri di Gua Hira untuk beribadah</li>
                        </ul>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Sifat-sifat Mulia:</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-blue-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-blue-800">Shiddiq</h5>
                                <p class="text-sm text-blue-600">Jujur dan benar</p>
                            </div>
                            <div class="bg-green-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-green-800">Amanah</h5>
                                <p class="text-sm text-green-600">Dapat dipercaya</p>
                            </div>
                            <div class="bg-purple-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-purple-800">Tabligh</h5>
                                <p class="text-sm text-purple-600">Menyampaikan risalah</p>
                            </div>
                            <div class="bg-orange-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-orange-800">Fathonah</h5>
                                <p class="text-sm text-orange-600">Cerdas dan bijaksana</p>
                            </div>
                        </div>
                    </div>
                `
            },
            hijrah: {
                title: "Hijrah ke Madinah",
                content: `
                    <div class="space-y-4">
                        <p>Hijrah adalah peristiwa perpindahan Nabi Muhammad SAW dan para sahabat dari Makkah ke Madinah pada tahun 622 M.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Latar Belakang Hijrah:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li>Tekanan dan penganiayaan dari kaum Quraisy semakin keras</li>
                            <li>Boikot ekonomi terhadap Bani Hasyim</li>
                            <li>Wafatnya Abu Thalib dan Khadijah RA</li>
                            <li>Undangan dari penduduk Yatsrib (Madinah)</li>
                        </ul>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Hikmah Hijrah:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li>Dimulainya masyarakat Islam yang terorganisir</li>
                            <li>Persaudaraan antara Muhajirin dan Anshar</li>
                            <li>Pembangunan Masjid Nabawi</li>
                            <li>Piagam Madinah sebagai konstitusi pertama</li>
                        </ul>
                    </div>
                `
            },
            perang: {
                title: "Perang-perang Islam",
                content: `
                    <div class="space-y-4">
                        <p>Selama periode Madinah, umat Islam menghadapi berbagai peperangan untuk mempertahankan agama dan masyarakat Islam.</p>
                        
                        <div class="space-y-4">
                            <div class="bg-red-50 p-4 rounded-lg">
                                <h5 class="font-bold text-red-800">Perang Badr (2 H / 624 M)</h5>
                                <p class="text-red-700">Perang pertama dan kemenangan besar umat Islam. 313 Muslim melawan 1000 tentara Quraisy.</p>
                            </div>
                            
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <h5 class="font-bold text-orange-800">Perang Uhud (3 H / 625 M)</h5>
                                <p class="text-orange-700">Balas dendam Quraisy atas kekalahan di Badr. Pelajaran tentang ketaatan dan disiplin.</p>
                            </div>
                            
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h5 class="font-bold text-blue-800">Perang Khandaq (5 H / 627 M)</h5>
                                <p class="text-blue-700">Strategi menggali parit di sekitar Madinah. Kemenangan tanpa pertempuran besar.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            fathu: {
                title: "Fathu Makkah",
                content: `
                    <div class="space-y-4">
                        <p>Fathu Makkah adalah penaklukan Makkah oleh umat Islam pada tahun 8 H (630 M) yang berlangsung damai dan penuh hikmah.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Hikmah dan Dampak:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li>Masuk Islamnya banyak pemimpin Quraisy</li>
                            <li>Makkah menjadi pusat spiritual Islam</li>
                            <li>Penyebaran Islam semakin cepat di Arab</li>
                            <li>Contoh penaklukan yang penuh kasih sayang</li>
                        </ul>
                        
                        <div class="bg-emerald-50 p-4 rounded-lg">
                            <h5 class="font-semibold text-emerald-800">Sabda Nabi SAW:</h5>
                            <p class="text-emerald-700 italic">"Pergilah kalian, kalian adalah orang-orang yang dibebaskan"</p>
                        </div>
                    </div>
                `
            },
            khalifah: {
                title: "Khulafaur Rasyidin",
                content: `
                    <div class="space-y-4">
                        <p>Khulafaur Rasyidin adalah empat khalifah pertama setelah wafatnya Nabi Muhammad SAW.</p>
                        
                        <div class="space-y-4">
                            <div class="bg-emerald-50 p-4 rounded-lg">
                                <h5 class="font-bold text-emerald-800">1. Abu Bakar As-Shiddiq RA (632-634 M)</h5>
                                <p class="text-emerald-700">Sahabat terdekat Nabi SAW. Memerangi orang-orang murtad dan mengumpulkan Al-Quran.</p>
                            </div>
                            
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h5 class="font-bold text-blue-800">2. Umar bin Khattab RA (634-644 M)</h5>
                                <p class="text-blue-700">Al-Faruq. Menaklukkan Persia, Mesir, dan Syam. Membuat sistem administrasi.</p>
                            </div>
                            
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <h5 class="font-bold text-purple-800">3. Utsman bin Affan RA (644-656 M)</h5>
                                <p class="text-purple-700">Dzun Nurain. Menyatukan Al-Quran dalam satu mushaf standar.</p>
                            </div>
                            
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <h5 class="font-bold text-orange-800">4. Ali bin Abi Thalib RA (656-661 M)</h5>
                                <p class="text-orange-700">Sepupu dan menantu Nabi SAW. Dikenal sangat berani dan bijaksana.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            umayyah: {
                title: "Dinasti Umayyah",
                content: `
                    <div class="space-y-4">
                        <p>Dinasti Umayyah adalah dinasti Islam pertama yang didirikan oleh Muawiyah bin Abu Sufyan dengan ibu kota Damaskus.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Pencapaian:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li>Ekspansi wilayah dari Spanyol hingga Asia Tengah</li>
                            <li>Pembangunan infrastruktur dan arsitektur megah</li>
                            <li>Pengembangan sistem administrasi modern</li>
                            <li>Penyebaran Islam ke berbagai benua</li>
                        </ul>
                    </div>
                `
            },
            abbasiyah: {
                title: "Dinasti Abbasiyah",
                content: `
                    <div class="space-y-4">
                        <p>Dinasti Abbasiyah menggantikan Umayyah dengan ibu kota Baghdad. Periode ini dikenal sebagai masa keemasan peradaban Islam.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Pencapaian Peradaban:</h4>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-green-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-green-800">Ilmu Pengetahuan</h5>
                                <ul class="list-disc list-inside text-green-700 text-sm space-y-1">
                                    <li>Matematika: Aljabar (Al-Khawarizmi)</li>
                                    <li>Kedokteran: Ar-Razi, Ibnu Sina</li>
                                    <li>Astronomi: Al-Battani, Al-Biruni</li>
                                </ul>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-blue-800">Teknologi & Seni</h5>
                                <ul class="list-disc list-inside text-blue-700 text-sm space-y-1">
                                    <li>Kertas dari Tiongkok ke Eropa</li>
                                    <li>Arsitektur masjid dan istana</li>
                                    <li>Kaligrafi dan seni hias</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            penyebaran: {
                title: "Penyebaran Islam",
                content: `
                    <div class="space-y-4">
                        <p>Islam menyebar dengan cepat dari Semenanjung Arab ke berbagai penjuru dunia melalui perdagangan, dakwah, dan penaklukan yang damai.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Cara Penyebaran:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li><strong>Perdagangan:</strong> Pedagang Muslim menyebarkan Islam melalui jalur perdagangan</li>
                            <li><strong>Dakwah:</strong> Penyebaran melalui ceramah dan teladan hidup</li>
                            <li><strong>Pernikahan:</strong> Perkawinan antar suku dan bangsa</li>
                            <li><strong>Toleransi:</strong> Sikap toleran terhadap agama lain</li>
                        </ul>
                    </div>
                `
            },
            nusantara: {
                title: "Islam di Nusantara",
                content: `
                    <div class="space-y-4">
                        <p>Islam masuk ke Nusantara melalui proses yang damai dan bertahap, dimulai dari abad ke-7 M hingga menjadi agama mayoritas pada abad ke-16 M.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Kerajaan-kerajaan Islam:</h4>
                        <div class="space-y-3">
                            <div class="bg-emerald-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-emerald-800">Kerajaan Samudera Pasai (1267-1521 M)</h5>
                                <p class="text-emerald-700 text-sm">Kerajaan Islam pertama di Nusantara, terletak di Aceh</p>
                            </div>
                            <div class="bg-orange-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-orange-800">Kesultanan Malaka (1400-1511 M)</h5>
                                <p class="text-orange-700 text-sm">Pusat perdagangan dan penyebaran Islam di Asia Tenggara</p>
                            </div>
                            <div class="bg-red-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-red-800">Kesultanan Demak (1475-1554 M)</h5>
                                <p class="text-red-700 text-sm">Kerajaan Islam pertama di Jawa, didirikan oleh Raden Patah</p>
                            </div>
                        </div>
                    </div>
                `
            },
            quran: {
                title: "Al-Quran",
                content: `
                    <div class="space-y-4">
                        <p>Al-Quran adalah kitab suci umat Islam yang diturunkan kepada Nabi Muhammad SAW melalui malaikat Jibril AS selama 23 tahun.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Karakteristik Al-Quran:</h4>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-emerald-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-emerald-800">Jumlah Surah</h5>
                                <p class="text-emerald-700">114 surah</p>
                            </div>
                            <div class="bg-blue-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-blue-800">Jumlah Ayat</h5>
                                <p class="text-blue-700">6.236 ayat</p>
                            </div>
                        </div>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Keistimewaan Al-Quran:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li><strong>Terjaga kemurniannya:</strong> Tidak ada perubahan sejak diturunkan</li>
                            <li><strong>Bahasa yang indah:</strong> Memiliki keindahan bahasa yang tak tertandingi</li>
                            <li><strong>Petunjuk hidup:</strong> Mengandung pedoman lengkap untuk kehidupan</li>
                        </ul>
                    </div>
                `
            },
            masjid: {
                title: "Masjidil Haram dan Ka'bah",
                content: `
                    <div class="space-y-4">
                        <p>Masjidil Haram adalah masjid suci di Makkah yang mengelilingi Ka'bah, kiblat umat Islam di seluruh dunia.</p>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Sejarah Ka'bah:</h4>
                        <div class="space-y-3">
                            <div class="bg-emerald-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-emerald-800">Pembangunan Pertama</h5>
                                <p class="text-emerald-700 text-sm">Dibangun pertama kali oleh Nabi Adam AS sebagai tempat ibadah pertama di bumi.</p>
                            </div>
                            
                            <div class="bg-blue-50 p-3 rounded-lg">
                                <h5 class="font-semibold text-blue-800">Nabi Ibrahim dan Ismail AS</h5>
                                <p class="text-blue-700 text-sm">Dibangun kembali oleh Nabi Ibrahim AS bersama putranya Ismail AS atas perintah Allah.</p>
                            </div>
                        </div>
                        
                        <h4 class="text-lg font-semibold text-gray-800">Ibadah di Masjidil Haram:</h4>
                        <ul class="list-disc list-inside space-y-2">
                            <li><strong>Tawaf:</strong> Mengelilingi Ka'bah sebanyak 7 kali</li>
                            <li><strong>Sa'i:</strong> Berlari-lari kecil antara bukit Shafa dan Marwah</li>
                            <li><strong>Shalat:</strong> Satu shalat di Masjidil Haram bernilai 100.000 shalat</li>
                        </ul>
                    </div>
                `
            }
        };

        function showSection(section) {
            if (!isLearningStarted) return;
            
            const sections = ['sejarah', 'hukum'];
            sections.forEach(s => {
                const sectionEl = document.getElementById('section-' + s);
                if (sectionEl && !sectionEl.classList.contains('hidden')) {
                    sectionEl.style.opacity = '0';
                    setTimeout(() => sectionEl.classList.add('hidden'), 150);
                }
            });
            
            setTimeout(() => {
                const targetSection = document.getElementById('section-' + section);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                    targetSection.style.opacity = '0';
                    setTimeout(() => targetSection.style.opacity = '1', 50);
                }
            }, 150);
            
            // Update tabs
            document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                tab.classList.remove('bg-gradient-to-r', 'from-emerald-500', 'to-emerald-600', 'text-white', 'shadow-md');
                tab.classList.add('text-gray-600');
            });
            
            const activeTab = document.getElementById('tab-' + section);
            if (activeTab) {
                activeTab.classList.remove('text-gray-600');
                activeTab.classList.add('bg-gradient-to-r', 'from-emerald-500', 'to-emerald-600', 'text-white', 'shadow-md');
            }
            
            completedSections.add(section);
            updateProgress();
        }

        function showDetail(topic) {
            const modal = document.getElementById('detail-modal');
            const modalInner = document.getElementById('modal-inner');
            const title = document.getElementById('modal-title');
            const content = document.getElementById('modal-content');
            
            if (detailContent[topic]) {
                title.textContent = detailContent[topic].title;
                content.innerHTML = detailContent[topic].content;
                
                if (!completedTopics.has(topic)) {
                    completedTopics.add(topic);
                    
                    const card = document.querySelector(`[data-topic="${topic}"]`);
                    if (card) {
                        const badge = card.querySelector('.completion-badge');
                        if (badge) {
                            badge.classList.remove('hidden');
                            badge.classList.add('show');
                        }
                    }
                    
                    updateProgress();
                    saveProgress();
                }
                
                modal.classList.remove('hidden');
                modal.style.opacity = '0';
                modalInner.classList.remove('show');
                
                requestAnimationFrame(() => {
                    modal.style.opacity = '1';
                    setTimeout(() => modalInner.classList.add('show'), 50);
                });
                
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal() {
            const modal = document.getElementById('detail-modal');
            const modalInner = document.getElementById('modal-inner');
            
            modalInner.classList.remove('show');
            setTimeout(() => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }, 150);
            }, 100);
        }

        function updateProgress() {
            const totalTopics = 12;
            const completedCount = completedTopics.size;
            const progress = (completedCount / totalTopics) * 100;
            
            const progressEl = document.getElementById('overall-progress');
            const countEl = document.getElementById('completed-count');
            
            if (progressEl) progressEl.textContent = Math.round(progress) + '%';
            if (countEl) countEl.textContent = completedCount;
            
            if (completedCount > 0) {
                completedSections.add('sejarah');
            }
            
            if (completedCount >= totalTopics && !localStorage.getItem('islamLearning_congratulated')) {
                setTimeout(() => {
                    alert('🎉 Selamat! Anda telah menyelesaikan semua materi Sejarah Islam!');
                    localStorage.setItem('islamLearning_congratulated', 'true');
                }, 1000);
            }
        }


        
        // Keyboard navigation support
        function handleKeyboardNavigation(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                if (target.hasAttribute('data-topic')) {
                    e.preventDefault();
                    const topic = target.getAttribute('data-topic');
                    showDetail(topic);
                }
            }
        }
        
        // Touch gesture support
        let touchStartY = 0;
        let touchEndY = 0;
        
        function handleTouchStart(e) {
            touchStartY = e.changedTouches[0].screenY;
        }
        
        function handleTouchEnd(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipeGesture();
        }
        
        function handleSwipeGesture() {
            const swipeThreshold = 50;
            const swipeDistance = touchStartY - touchEndY;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe up - could trigger some action
                } else {
                    // Swipe down - could trigger some action
                }
            }
        }

        // Removed scroll animations for better performance
        
        // Simple section switching
        function showSection(section) {
            if (!isLearningStarted) return;
            
            const sections = ['sejarah', 'hukum'];
            const tabs = document.querySelectorAll('.tab-button');
            
            // Hide all sections
            sections.forEach(s => {
                const sectionEl = document.getElementById('section-' + s);
                if (sectionEl) {
                    sectionEl.classList.add('hidden');
                }
            });
            
            // Show target section
            const targetSection = document.getElementById('section-' + section);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
            
            // Update tabs
            tabs.forEach(tab => {
                tab.classList.remove('bg-gradient-to-r', 'from-emerald-500', 'to-emerald-600', 'text-white', 'shadow-md');
                tab.classList.add('text-gray-600');
            });
            
            const activeTab = document.getElementById('tab-' + section);
            if (activeTab) {
                activeTab.classList.remove('text-gray-600');
                activeTab.classList.add('bg-gradient-to-r', 'from-emerald-500', 'to-emerald-600', 'text-white', 'shadow-md');
            }
            
            completedSections.add(section);
            updateProgress();
            saveProgress();
        }
        
        // Simple progress updates
        function updateProgress() {
            const totalTopics = 12;
            const completedCount = completedTopics.size;
            const progress = (completedCount / totalTopics) * 100;
            
            const progressEl = document.getElementById('overall-progress');
            const countEl = document.getElementById('completed-count');
            
            if (progressEl) {
                progressEl.textContent = Math.round(progress) + '%';
            }
            
            if (countEl) {
                countEl.textContent = completedCount;
            }
            
            if (completedCount > 0) {
                completedSections.add('sejarah');
            }
            
            if (completedCount >= totalTopics && !localStorage.getItem('islamLearning_congratulated')) {
                setTimeout(() => {
                    alert('🎉 Selamat! Anda telah menyelesaikan semua materi Sejarah Islam!');
                    localStorage.setItem('islamLearning_congratulated', 'true');
                }, 500);
            }
        }
        
        // Removed complex congratulations modal
        
        // Enhanced modal with better animations
        function showDetail(topic) {
            const modal = document.getElementById('detail-modal');
            const modalInner = document.getElementById('modal-inner');
            const title = document.getElementById('modal-title');
            const content = document.getElementById('modal-content');
            
            if (detailContent[topic]) {
                title.textContent = detailContent[topic].title;
                content.innerHTML = detailContent[topic].content;
                
                if (!completedTopics.has(topic)) {
                    completedTopics.add(topic);
                    
                    const card = document.querySelector(`[data-topic="${topic}"]`);
                    if (card) {
                        const badge = card.querySelector('.completion-badge');
                        if (badge) {
                            badge.classList.remove('hidden');
                            badge.classList.add('show');
                        }
                    }
                    
                    updateProgress();
                    saveProgress();
                }
                
                modal.classList.remove('hidden');
                modal.style.opacity = '0';
                modalInner.classList.remove('show');
                
                requestAnimationFrame(() => {
                    modal.style.opacity = '1';
                    setTimeout(() => modalInner.classList.add('show'), 100);
                });
                
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Enhanced event listeners
        document.addEventListener('DOMContentLoaded', function() {
            loadProgress();
            initScrollAnimations();
            
            const modal = document.getElementById('detail-modal');
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) closeModal();
                });
            }
            
            // Enhanced keyboard support
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeModal();
            });
            
            // Add keyboard navigation to cards
            document.querySelectorAll('[data-topic]').forEach(card => {
                card.addEventListener('keydown', handleKeyboardNavigation);
            });
            
            // Touch gesture support
            document.addEventListener('touchstart', handleTouchStart, { passive: true });
            document.addEventListener('touchend', handleTouchEnd, { passive: true });
            
            // Performance optimization: Preload critical animations
            document.querySelectorAll('.card-hover').forEach((card, index) => {
                setTimeout(() => {
                    card.style.willChange = 'transform, box-shadow';
                }, index * 50);
            });
        });
        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9776e3fee75fcdd2',t:'MTc1NjU4NDE5Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();