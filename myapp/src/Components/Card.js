import React from "react";

const Card = ({ title, image, price, onCheckout }) => {
  return (
    <>
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={image}
            alt="blog"
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              CATEGORY
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {title}
            </h1>
            <p className="leading-relaxed mb-3">Rs : {price}</p>
            <div className="flex items-center flex-wrap">
              <button
                className="bg-slate-950 rounded-sm text-white px-5 py-2"
                onClick={() => onCheckout({ name: title, amount: price })}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
