"use client";
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     price: '$32.00',
//     color: 'Sienna',
//     inStock: true,
//     size: 'Large',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in sienna.",
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     price: '$32.00',
//     color: 'Black',
//     inStock: false,
//     leadTime: '3–4 weeks',
//     size: 'Large',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//   },
//   {
//     id: 3,
//     name: 'Nomad Tumbler',
//     href: '#',
//     price: '$35.00',
//     color: 'White',
//     inStock: true,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
//     imageAlt: 'Insulated bottle with white base and black snap lid.',
//   },
// ]

export default function Example() {

  interface CartItem {
    quantity: string | number | readonly string[] | undefined;
    product: {
      productImgs: any;
      title: string;
      id: number;
      imageSrc?: string;
      color: {
        clrName: string;
      };
      price: string;
    };
    qty: number;
  }
  
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/GetCart', {
          method: "POST",
          headers: {
            "credentials": "include",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.success) {
            setCart(data.cartList);
          } else {
            toast.error("Something Went Wrong");
          }
        } else {
          console.error('HTTP error:', response.status);
        }
      } catch (e) {
        console.error('Fetch error:', e);
        toast.error("Something Went Wrong");
      }
    };

    getData();
  }, []);

async function removeCartProduct(productId: number){
  try {
    const response = await fetch('/api/RemoveCart', {
      method: "POST",
      headers: {
        "credentials": "include",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        setCart((prevItems) =>
          prevItems.filter((item) => item.product.id !== productId)
        );
      } else {
        toast.error("Something Went Wrong");
      }
    } else {
      console.error('HTTP error:', response.status);
    }
  } catch (e) {
    console.error('Fetch error:', e);
    toast.error("Something Went Wrong");
  }
  
}

  return (
    <div className="">
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Shopping Cart</h1>
      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          <ul role="list" className="divide-y divide-gray-700 border-b border-t border-gray-700">
            {cart.map((cartItem, index) => (
              <li key={index} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    alt={cartItem.product.title}
                    src={"images/"+cartItem.product.productImgs[0].imgPath || '/default-image.jpg'} // Placeholder for the product image
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <a href={`/search/${cartItem.product.id}`} className="font-medium text-gray-300 hover:text-gray-500">
                            {cartItem.product.title}
                          </a>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{cartItem.product.color.clrName}</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-200">${cartItem.product.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex gap-2 items-center mt-2">
                        <p className="mt-2 text-sm font-medium text-gray-300">Quantity<span className="text-gray-300"> : </span></p>
                        <input 
                          type="number"
                          className="w-[50px] mt-2 h-8 rounded-md p-2 font-medium bg-[#2b2c30] text-gray-400"
                          value={cartItem.quantity}
                          disabled
                        />
                      </div>

                      <div className="absolute right-0 top-0">
                        <button onClick={()=>removeCartProduct(cartItem.product.id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Remove</span>
                          <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section aria-labelledby="summary-heading" className="mt-16 bg-[#2b2c30] rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 id="summary-heading" className="text-lg font-medium text-gray-200">Order summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              {/* <dd className="text-sm font-medium text-gray-200">${cart.reduce((acc, item) => acc + item.product.price * item.qty, 0)}</dd> */}
            </div>
            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Delivery Cost</span>
              </dt>
              <dd className="text-sm font-medium text-gray-200">$5.00</dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <dt className="text-base font-medium text-gray-200">Order total</dt>
              <dd className="text-base font-medium text-gray-200">
                {/* ${(cart.reduce((acc, item) => acc + item.product.price * item.qty, 0) + 5).toFixed(2)} */}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>
    </div>
  </div>
  )
}
