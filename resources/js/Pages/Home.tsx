import React, { useEffect } from "react";

export default function Landing(): JSX.Element {
    useEffect(() => {
        const cartSidebar = document.getElementById('cart-sidebar') as HTMLElement | null;
        const closeCartBtn = document.getElementById('close-cart') as HTMLButtonElement | null;
        const mobileSearchToggle = document.getElementById('mobile-search-toggle') as HTMLElement | null;
        const mobileSearch = document.getElementById('mobile-search') as HTMLElement | null;
        const continueBtn = document.getElementById('continue-shopping') as HTMLButtonElement | null;
        const checkoutBtn = document.getElementById('checkout-btn') as HTMLButtonElement | null;

        function createOverlay() {
            if (document.getElementById('cart-overlay')) return;
            const overlay = document.createElement('div');
            overlay.id = 'cart-overlay';
            overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';
            overlay.addEventListener('click', closeCart);
            document.body.appendChild(overlay);
        }

        function removeOverlay() {
            const overlay = document.getElementById('cart-overlay');
            if (overlay) overlay.remove();
        }

        function openCart() {
            if (!cartSidebar) return;
            cartSidebar.classList.remove('translate-x-full');
            createOverlay();
            document.body.style.overflow = 'hidden';
        }

        function closeCart() {
            if (!cartSidebar) return;
            cartSidebar.classList.add('translate-x-full');
            removeOverlay();
            document.body.style.overflow = '';
        }

        const onCloseClick = (e: Event) => {
            e.preventDefault();
            closeCart();
        };

        const onContinueClick = (e: Event) => {
            e.preventDefault();
            closeCart();
        };

        const onCheckoutClick = (e: Event) => {
            e.preventDefault();
            // Replace with proper navigation in real app
            alert('Lanjut ke halaman pembayaran (demo).');
        };

        closeCartBtn?.addEventListener('click', onCloseClick);
        continueBtn?.addEventListener('click', onContinueClick);
        checkoutBtn?.addEventListener('click', onCheckoutClick);

        const onMobileSearchToggle = () => {
            if (!mobileSearch) return;
            mobileSearch.classList.toggle('hidden');
        };
        mobileSearchToggle?.addEventListener('click', onMobileSearchToggle);

        // Attach openCart to header cart button and product cart buttons
        const headerCartIcon = document.querySelector('header .fa-shopping-cart');
        if (headerCartIcon) {
            const btn = headerCartIcon.closest('button') as HTMLButtonElement | null;
            btn?.addEventListener('click', (e) => {
                e.preventDefault();
                openCart();
            });
        }

        // Also attach to any product/cart buttons (exclude those inside sidebar)
        document.querySelectorAll('button').forEach(function(btn) {
            if ((btn as HTMLElement).closest && (btn as HTMLElement).closest('#cart-sidebar')) return;
            if (btn.querySelector('.fa-shopping-cart')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openCart();
                });
            }
        });

        // Simple quantity handler inside cart
        function updateCartQuantities() {
            const cartItems = document.querySelectorAll('#cart-sidebar .flex.items-center.border-b');
            cartItems.forEach(item => {
                const minus = item.querySelector('button:first-of-type') as HTMLButtonElement | null;
                const plus = item.querySelector('button:last-of-type') as HTMLButtonElement | null;
                const qtySpan = item.querySelector('.px-2.py-1') as HTMLElement | null;
                if (!minus || !plus || !qtySpan) return;

                const onMinus = (ev: Event) => {
                    ev.preventDefault();
                    let q = parseInt(qtySpan.textContent || '1', 10) || 1;
                    q = Math.max(1, q - 1);
                    qtySpan.textContent = String(q);
                    // TODO: recalculate totals
                };
                const onPlus = (ev: Event) => {
                    ev.preventDefault();
                    let q = parseInt(qtySpan.textContent || '1', 10) || 1;
                    q = q + 1;
                    qtySpan.textContent = String(q);
                    // TODO: recalculate totals
                };

                minus.addEventListener('click', onMinus);
                plus.addEventListener('click', onPlus);
            });
        }

        updateCartQuantities();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeCart();
            }
        };
        document.addEventListener('keydown', onKeyDown);

        return () => {
            // cleanup
            closeCartBtn?.removeEventListener('click', onCloseClick);
            continueBtn?.removeEventListener('click', onContinueClick);
            checkoutBtn?.removeEventListener('click', onCheckoutClick);
            mobileSearchToggle?.removeEventListener('click', onMobileSearchToggle);
            document.removeEventListener('keydown', onKeyDown);
            removeOverlay();
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <i className="fas fa-shoe-prints text-2xl text-primary mr-2"></i>
                            <span className="text-xl font-bold text-gray-800">SepatuKu</span>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Cari sepatu, merek, atau kategori..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <button className="absolute right-0 top-0 h-full px-4 text-white bg-primary rounded-r-lg hover:bg-secondary transition-colors">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Mobile Search Toggle */}
                            <button id="mobile-search-toggle" className="md:hidden text-gray-600 hover:text-primary">
                                <i className="fas fa-search text-xl"></i>
                            </button>

                            {/* Wishlist */}
                            <button className="relative text-gray-600 hover:text-primary transition-colors">
                                <i className="fas fa-heart text-xl"></i>
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                            </button>

                            {/* Cart */}
                            <button className="relative text-gray-600 hover:text-primary transition-colors">
                                <i className="fas fa-shopping-cart text-xl"></i>
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                            </button>

                            {/* User Account */}
                            <div className="relative group">
                                <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
                                    <i className="fas fa-user text-xl"></i>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profil Saya</a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pesanan Saya</a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pengaturan</a>
                                    <div className="border-t my-1"></div>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Keluar</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <div id="mobile-search" className="hidden md:hidden pb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari sepatu, merek, atau kategori..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button className="absolute right-0 top-0 h-full px-4 text-white bg-primary rounded-r-lg">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex justify-between items-center py-2 border-t border-gray-200">
                        <div className="flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Beranda</a>
                            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Pria</a>
                            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Wanita</a>
                            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Anak-anak</a>
                            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Olahraga</a>
                            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Brand</a>
                            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Diskon</a>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500">Customer Service: 0800-1234-5678</span>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Hero Banner */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden shadow-xl">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 p-8 md:p-12 text-white">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">Koleksi Sepatu Terbaru 2023</h1>
                                <p className="text-lg mb-6">Dapatkan sepatu berkualitas dengan desain terkini dan harga terbaik hanya di SepatuKu.</p>
                                <button className="bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors">
                                    Beli Sekarang <i className="fas fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Sepatu Sport" className="h-80 object-contain" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategori Populer</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fas fa-running text-2xl text-primary"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">Olahraga</h3>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fas fa-briefcase text-2xl text-green-600"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">Formal</h3>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fas fa-shoe-prints text-2xl text-purple-600"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">Kasual</h3>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fas fa-child text-2xl text-red-500"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800">Anak-anak</h3>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Produk Unggulan</h2>
                        <a href="#" className="text-primary hover:text-secondary font-medium flex items-center">
                            Lihat Semua <i className="fas fa-chevron-right ml-1"></i>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Product Card 1 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" alt="Nike Air Max" className="w-full h-48 object-cover" />
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">HOT</span>
                                <button className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:text-red-500">
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-1">Nike Air Max 270</h3>
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">Rp 1.499.000</span>
                                    <button className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors">
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 2 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80" alt="Adidas Ultraboost" className="w-full h-48 object-cover" />
                                <button className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:text-red-500">
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-1">Adidas Ultraboost 22</h3>
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">Rp 1.799.000</span>
                                    <button className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors">
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 3 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80" alt="Converse Chuck Taylor" className="w-full h-48 object-cover" />
                                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">NEW</span>
                                <button className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:text-red-500">
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-1">Converse Chuck Taylor</h3>
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">(5.0)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">Rp 699.000</span>
                                    <button className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors">
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 4 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt="Puma RS-X" className="w-full h-48 object-cover" />
                                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">-20%</span>
                                <button className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:text-red-500">
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-1">Puma RS-X Toys</h3>
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">(3.5)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-lg font-bold text-primary">Rp 899.000</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">Rp 1.099.000</span>
                                    </div>
                                    <button className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors">
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Special Offers */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Penawaran Spesial</h2>
                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 mb-6 md:mb-0">
                                <h3 className="text-3xl font-bold mb-4">Diskon Hingga 50%</h3>
                                <p className="text-lg mb-4">Dapatkan penawaran terbatas untuk koleksi sepatu musim panas. Berlaku hingga 30 September 2023.</p>
                                <div className="flex space-x-2 mb-4">
                                    <div className="bg-white text-gray-800 rounded-lg p-2 text-center w-16">
                                        <span className="block text-xl font-bold">05</span>
                                        <span className="text-xs">Hari</span>
                                    </div>
                                    <div className="bg-white text-gray-800 rounded-lg p-2 text-center w-16">
                                        <span className="block text-xl font-bold">12</span>
                                        <span className="text-xs">Jam</span>
                                    </div>
                                    <div className="bg-white text-gray-800 rounded-lg p-2 text-center w-16">
                                        <span className="block text-xl font-bold">45</span>
                                        <span className="text-xs">Menit</span>
                                    </div>
                                    <div className="bg-white text-gray-800 rounded-lg p-2 text-center w-16">
                                        <span className="block text-xl font-bold">30</span>
                                        <span className="text-xs">Detik</span>
                                    </div>
                                </div>
                                <button className="bg-white text-orange-500 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                                    Beli Sekarang
                                </button>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <img src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Sepatu Diskon" className="h-64 object-contain" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Brands Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Brand Terkenal</h2>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <div className="flex justify-center items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <span className="text-xl font-bold text-gray-700">NIKE</span>
                            </div>
                            <div className="flex justify-center items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <span className="text-xl font-bold text-gray-700">ADIDAS</span>
                            </div>
                            <div className="flex justify-center items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <span className="text-xl font-bold text-gray-700">PUMA</span>
                            </div>
                            <div className="flex justify-center items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <span className="text-xl font-bold text-gray-700">CONVERSE</span>
                            </div>
                            <div className="flex justify-center items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <span className="text-xl font-bold text-gray-700">VANS</span>
                            </div>
                            <div className="flex justify-center items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <span className="text-xl font-bold text-gray-700">NEW BALANCE</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Apa Kata Pelanggan Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Customer" className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">"Pengalaman belanja yang luar biasa! Sepatu yang saya pesan sesuai dengan gambar, nyaman dipakai, dan pengiriman sangat cepat."</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Customer" className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Michael Chen</h4>
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">"Kualitas sepatu sangat bagus, harga kompetitif, dan pelayanan customer service yang ramah. Pasti akan belanja lagi di sini."</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Customer" className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Lisa Rodriguez</h4>
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">"Pilihan sepatu sangat lengkap, dari yang casual sampai sport. Saya sudah belanja beberapa kali dan selalu puas dengan produknya."</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white pt-12 pb-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {/* Company Info */}
                        <div>
                            <div className="flex items-center mb-4">
                                <i className="fas fa-shoe-prints text-2xl text-primary mr-2"></i>
                                <span className="text-xl font-bold">SepatuKu</span>
                            </div>
                            <p className="text-gray-400 mb-4">Toko sepatu online terpercaya dengan koleksi terlengkap dan harga terbaik.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <i className="fab fa-facebook-f text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <i className="fab fa-twitter text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <i className="fab fa-youtube text-xl"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Layanan Pelanggan</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bantuan</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cara Pembelian</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pengembalian</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status Pesanan</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hubungi Kami</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Berlangganan Newsletter</h3>
                            <p className="text-gray-400 mb-4">Dapatkan informasi promo dan produk terbaru langsung ke email Anda.</p>
                            <div className="flex">
                                <input type="email" placeholder="Alamat email" className="px-4 py-2 rounded-l-lg w-full text-gray-800 focus:outline-none" />
                                <button className="bg-primary text-white px-4 rounded-r-lg hover:bg-secondary transition-colors">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 SepatuKu. All rights reserved.</p>
                        <div className="flex space-x-6">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-8" />
                        </div>
                    </div>
                </div>
            </footer>

            {/* Shopping Cart Sidebar */}
            <div id="cart-sidebar" className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 z-50 overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Keranjang Belanja</h2>
                        <button id="close-cart" className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <div className="space-y-4 mb-6">
                        {/* Cart Item 1 */}
                        <div className="flex items-center border-b border-gray-200 pb-4">
                            <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" alt="Nike Air Max" className="w-16 h-16 object-cover rounded" />
                            <div className="ml-4 flex-1">
                                <h3 className="font-semibold text-gray-800">Nike Air Max 270</h3>
                                <p className="text-gray-600 text-sm">Size: 42</p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="font-bold text-primary">Rp 1.499.000</span>
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button className="px-2 py-1 text-gray-600 hover:text-primary">-</button>
                                        <span className="px-2 py-1">1</span>
                                        <button className="px-2 py-1 text-gray-600 hover:text-primary">+</button>
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 ml-2">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>

                        {/* Cart Item 2 */}
                        <div className="flex items-center border-b border-gray-200 pb-4">
                            <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80" alt="Converse Chuck Taylor" className="w-16 h-16 object-cover rounded" />
                            <div className="ml-4 flex-1">
                                <h3 className="font-semibold text-gray-800">Converse Chuck Taylor</h3>
                                <p className="text-gray-600 text-sm">Size: 41</p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="font-bold text-primary">Rp 699.000</span>
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button className="px-2 py-1 text-gray-600 hover:text-primary">-</button>
                                        <span className="px-2 py-1">1</span>
                                        <button className="px-2 py-1 text-gray-600 hover:text-primary">+</button>
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 ml-2">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold text-gray-800">Rp 2.198.000</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Ongkos Kirim</span>
                            <span className="text-gray-800">Rp 25.000</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-xl font-bold text-primary">Rp 2.223.000</span>
                        </div>

                        <div className="flex space-x-2">
                            <button id="checkout-btn" className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors">
                                Checkout
                            </button>
                            <button id="continue-shopping" className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                                Lanjutkan Belanja
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}