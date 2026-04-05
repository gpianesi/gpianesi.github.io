import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type ModalType = "about" | "contact" | "faq" | "shipping" | null;

const MODAL_TITLES: Record<NonNullable<ModalType>, string> = {
  about: "About Us",
  contact: "Contact",
  faq: "Frequently Asked Questions",
  shipping: "Shipping Information",
};

function AboutContent() {
  return (
    <p className="text-gray-600 text-sm leading-relaxed">
      Trabbrella is a website prototype for a travel beach umbrella product. I decided to create
      this website since the product is an actual idea that came to my mind during a beach day.
      I wouldn't mind in the future to really try to develop this product, so I thought it would
      be worthy to try setting up a website. The website simulates an ecommerce experience, the
      browsing of the product, the choice of the color, and the management of the cart. The project
      currently still hasn't a backend for the payment processing, given this is a prototype and
      it doesn't exist a real product to sell.
    </p>
  );
}

function ContactContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-6">
        <p className="text-lg font-medium mb-1">Message received!</p>
        <p className="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 uppercase tracking-wide">Name</label>
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 uppercase tracking-wide">Email</label>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 uppercase tracking-wide">Message</label>
        <textarea
          required
          rows={4}
          placeholder="How can we help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded-md py-2 text-sm hover:bg-gray-800 transition-colors"
      >
        Send message
      </button>
    </form>
  );
}

function FAQContent() {
  const items = [
    {
      q: "When will my order ship?",
      a: "All orders are processed within 1–2 business days. Standard delivery takes 5–7 business days; express delivery takes 2–3 business days.",
    },
    {
      q: "What colors are available?",
      a: "Trabbrella is currently available in three colors: Ocean Blue, Coral Reef, and Sandy Beige.",
    },
    {
      q: "Can I change or cancel my order?",
      a: "You can modify or cancel your order within 24 hours of placing it by reaching out through the Contact form.",
    },
    {
      q: "Is my payment information secure?",
      a: "Yes. All transactions are encrypted using industry-standard SSL technology. We never store your card details.",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {items.map(({ q, a }) => (
        <div key={q}>
          <p className="text-sm font-medium mb-1">{q}</p>
          <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
        </div>
      ))}
    </div>
  );
}

function ShippingContent() {
  return (
    <div className="flex flex-col gap-4 text-sm text-gray-600 leading-relaxed">
      <p>We ship worldwide. All orders include free standard shipping — no minimum order required.</p>
      <ul className="list-disc list-inside space-y-2">
        <li><span className="font-medium text-black">Standard shipping</span> — 5–7 business days</li>
        <li><span className="font-medium text-black">Express shipping</span> — 2–3 business days (additional fee at checkout)</li>
      </ul>
      <p>Orders are dispatched Monday through Friday, excluding public holidays. Once your order ships you will receive a tracking number by email.</p>
    </div>
  );
}


export function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const open = (modal: NonNullable<ModalType>) => setActiveModal(modal);
  const close = () => setActiveModal(null);

  const modalContent: Record<NonNullable<ModalType>, React.ReactNode> = {
    about: <AboutContent />,
    contact: <ContactContent />,
    faq: <FAQContent />,
    shipping: <ShippingContent />,
  };

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
            <h4 className="text-sm uppercase tracking-wider mb-4 text-gray-400">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-gray-300 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#product" className="text-gray-300 hover:text-white">
                  Specifications
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-gray-400">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => open("about")}
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => open("contact")}
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-gray-400">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => open("faq")}
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => open("shipping")}
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  Shipping
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Trabbrella. All rights reserved.</p>
        </div>
      </div>

      <Dialog.Root open={activeModal !== null} onOpenChange={(isOpen) => !isOpen && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white text-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md max-h-[80vh] overflow-y-auto">
            {activeModal && (
              <>
                <Dialog.Title className="text-xl mb-5">
                  {MODAL_TITLES[activeModal]}
                </Dialog.Title>
                {modalContent[activeModal]}
              </>
            )}
            <Dialog.Close
              onClick={close}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ✕
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </footer>
  );
}
