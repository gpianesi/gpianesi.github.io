export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl mb-4">Trabbrella</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Reinventing beach shade for the adventurous traveler.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-gray-400">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Specifications
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-gray-400">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-gray-400">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Trabbrella. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
