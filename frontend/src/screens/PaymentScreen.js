import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const PaymentScreen = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        {/* Success Icon */}
        <AiOutlineCheckCircle className="text-green-600 w-12 h-12 mx-auto my-4" />

        {/* Content */}
        <div className="text-center">
          <h3 className="md:text-2xl text-xl text-gray-900 font-semibold">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-gray-600">Have a great day!</p>

          {/* Button */}
          <div className="mt-6">
            <a
              href="#"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
