import React from "react";

const ConnectWalletModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold">Connect Wallet</h3>
          <button
            className="w-8 h-8 flex justify-center items-center hover:bg-gray-200 rounded"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="pt-4">
          <p className="text-gray-600 mb-4">
            Connect with one of our available wallet providers.
          </p>

          <ul className="space-y-3">

            {/* Metamask */}
            <li>
              <button className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-100">
                <svg
                  aria-hidden="true"
                  className="h-5"
                  viewBox="0 0 40 38"
                  fill="none"
                >
                  {/* Metamask icon (placeholder) */}
                  <rect width="40" height="38" fill="#f6851b" />
                </svg>

                <span className="ml-3 font-medium">MetaMask</span>

                <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">
                  Popular
                </span>
              </button>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
