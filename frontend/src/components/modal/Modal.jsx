import React, { useRef } from "react";

export default function Modal({ isOpen, modalClose, children }) {
  const outModal = useRef();
  const showHide = isOpen ? "visible relative z-10" : "invisible relative z-10";

  return (
    <div
      class={showHide}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div
        class="fixed z-10 inset-0 overflow-y-auto"
        onClick={(event) => {
          if (event.target === outModal.current) {
            modalClose();
          }
        }}
      >
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
          ref={outModal}
        >
          <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
