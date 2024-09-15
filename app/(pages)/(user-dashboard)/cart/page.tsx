"use client";
// Declare the global payhere object
declare const payhere: {
  startPayment: (payment: any) => void;
  onCompleted?: (orderId: string) => void;
  onDismissed?: () => void;
  onError?: (error: string) => void;
};
import RelatedProducts from '@/app/components/RelatedProducts';
import useAuthStore from '@/store/useAuthStore';
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';



export default function Example() {
  const [success, setSuccess] = useState(false)
const router = useRouter();
const { isLoggedIn } = useAuthStore(); 
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
      condition: {
        conditionName: string;
        id: number;
      };
      deliveryFee: string;
    };
    qty: number;
  }
  
  const [cart, setCart] = useState<CartItem[]>([]);
  let [noCart, setNoCart] = useState<boolean>(true);

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
      body: JSON.stringify({cartProductId:productId}),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      if (data.success) {
      
        if(data.content=="Cart item not found."){
          setNoCart(false);
        }else{
          setCart((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.product.id !== productId);
            setNoCart(updatedItems.length === 0);
            return updatedItems;
          });
        }
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

function startPayment({ payhereList }: any) {
  // Payment lifecycle callbacks
  payhere.onCompleted = function onCompleted(orderId: string) {
    console.log("Payment completed. OrderID:" + orderId);

   let setData = async () => {
    try {
      const response = await fetch('/api/Checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   // Added content-type for proper request handling
          'credentials': 'include',             // Pass cookies for session management
        },
        body: JSON.stringify({order_id:orderId}),
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
  
        if (data.success) {
          // Start the payment process if checkout is successful
          setCart([]);
          toast.success(data.content);
        } else {
          toast.error(data.content);
        }
      } else {
        console.error('HTTP error:', response.status);
        toast.error('Failed to fetch checkout data.');
      }
    } catch (e) {
      console.error('Fetch error:', e);
      toast.error('Something Went Wrong');
    }
   }
   setData();

  };

  payhere.onDismissed = function onDismissed() {
    // console.log("Payment dismissed");
    toast.error("Payment dismissed");
  };

  payhere.onError = function onError(error: string) {
    // console.log("Error: " + error);
    toast.error("Error: " + error);
  };

  // Payment object
  const payment = {
    sandbox: payhereList.sandbox,
    merchant_id: payhereList.merchant_id,    // Replace with your Merchant ID
    return_url: payhereList.return_url,      // Important
    cancel_url: payhereList.cancel_url,      // Important
    notify_url: payhereList.notify_url,
    order_id: payhereList.order_id,
    items: payhereList.items,
    amount: payhereList.amount,
    currency: payhereList.currency,
    hash: payhereList.hash,
    first_name: payhereList.first_name,
    last_name: payhereList.last_name,
    email: payhereList.email,
    phone: payhereList.phone,
    address: payhereList.address,
    city: payhereList.city,
    country: payhereList.country,
    delivery_address: '',     // Add dynamic value if required
    delivery_city: '',        // Add dynamic value if required
    delivery_country: ''      // Add dynamic value if required
  };

  // Initiating payment
  payhere.startPayment(payment);
}

const checkoutFunction = async () => {
  try {
    const response = await fetch('/api/LoadCheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',   // Added content-type for proper request handling
        'credentials': 'include',             // Pass cookies for session management
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Start the payment process if checkout is successful
        startPayment(data);
        toast.success(data.content);
      } else {
        toast.error(data.content);
      }
    } else {
      console.error('HTTP error:', response.status);
      toast.error('Failed to fetch checkout data.');
    }
  } catch (e) {
    console.error('Fetch error:', e);
    toast.error('Something Went Wrong');
  }
};

  return (
    <div className="">
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Shopping Cart</h1>
   

      {noCart && cart ? (
   <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
    <section aria-labelledby="cart-heading" className="lg:col-span-7  ">
  <div className="overflow-x-auto ">
  <ul role="list" className="border-t border-b border-[#313336] divide-y divide-[#313336]">
       {cart.map((cartItem, index) => (
      <li key={index} className="flex flex-row sm:flex-row py-6 sm:py-6 px-2 ">
     
           <div className="bg-[#252629]/90 rounded-md p-4 ml-2 w-24 h-24 sm:w-48 sm:h-48">
                    <img    alt={cartItem.product.title}
               src={"images/"+cartItem.product.productImgs[0].imgPath || '/default-image.jpg'} className="w-full h-full rounded-md object-center object-cover  "/>
                  </div>
           <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6  relative">
                    {/* <!-- qty problem start --> */}
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
               <div className="flex justify-between w-full sm:w-auto">
                          <h3 className="text-xl">
                            <span className="font-medium text-gray-200">
                              {cartItem.product.title}
                            </span>
                          </h3>
                        </div>
                 <div className="mt-2 flex text-sm items-center ">
                 <div
                            className={`h-8 w-8 overflow-hidden flex justify-center items-center border bg-${cartItem.product.color.clrName}-500 border-${cartItem.product.color.clrName}-500 rounded-full cursor-pointer`}>
                          </div>
                          <div className="w-[1px] h-[32px] border-l-[1px] border-[#393a3f] ml-4 mt-[5px] mr-4"></div>
                     <span
                        className="px-1 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg bg-green-600/70 text-[#2b2c30] mt-2">
                     {cartItem.product.condition.id === 1 ? 'New' : cartItem.product.condition.id === 2 ? 'Used' : 'Unknown'}
                     </span>

                 </div>
                 <div className="flex gap-2 mt-2">
                          <p className="mt-2 text-sm font-medium text-gray-300 ">Unit Price <span className="text-gray-300">:</span>
                          </p>
                          <p id="" className=" mt-1 font-medium text-gray-200">Rs.{cartItem.product.price}.00
                          </p>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                          <p className="mt-2 text-sm font-medium text-gray-300 ">Quanity<span className="text-gray-300"> : </span></p>
                          <input min="1" max=" $product_dataqty " type="number"
                            className="product_qty w-[50px] mt-2 h-8 rounded-md p-2 font-medium bg-[#2b2c30] text-gray-400"
                            value={cartItem.qty} 
                           disabled
                            id=" $cart_datacart_id qtyNum"/>
                        </div>

                        <div className="flex  gap-2 mt-2">
                          <p className="mt-2 text-sm font-medium text-gray-300 ">Delivery Fee<span className="text-gray-300"> :
                            </span></p>
                          <p className="mt-2 text-sm font-medium text-gray-200">Rs.{cartItem.product.deliveryFee}.00 
                          </p>
                        </div>
               </div>

            
                 <div className="absolute right-0 top-0">
                   <button onClick={()=>removeCartProduct(cartItem.product.id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                     <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                   </button>
                 </div>
                 <div className="flex  items-center gap-2  absolute bottom-0 right-0">
                      <p className="mt-2 text-sm font-medium text-gray-300 ">Requested Total<span className="text-gray-300"> : </span>
                      </p>
                      <p  className="mt-2  text-sm font-medium text-gray-200">
                        Rs.{cartItem.product.price + cartItem.product.deliveryFee}.00
                      </p>
                    </div>
             </div>
           </div>
         </li>
       ))}
     </ul>
   </div>
   </section>
   {/* Order summary */}
   <section aria-labelledby="summary-heading" className="mt-16 bg-[#2b2c30] rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
     <h2 id="summary-heading" className="text-lg font-medium text-gray-200">Order summary</h2>

     <dl className="mt-6 space-y-4">
       <div className="flex items-center justify-between">
         <dt className="text-sm text-gray-600">Subtotal</dt>
   
            <dd className="text-sm font-medium text-gray-200">
              Rs.{cart.reduce((acc, item) => acc + parseFloat(item.product.price), 0)}.00
            </dd>
                </div>
       <div className="flex items-center justify-between border-t border-gray-700 pt-4">
         <dt className="flex items-center text-sm text-gray-600">
           <span>Delivery Cost</span>
         </dt>
            <dd className="text-sm font-medium text-gray-200">
              Rs.{cart.reduce((acc, item) => acc + parseFloat(item.product.deliveryFee), 0)}.00
            </dd>
       </div>

       <div className="flex items-center justify-between border-t border-gray-700 pt-4">
         <dt className="text-base font-medium text-gray-200">Order total</dt>
         <dd className="text-sm font-medium text-gray-200">
           Rs.{cart.reduce((acc, item) => acc + parseFloat(item.product.price) + parseFloat(item.product.deliveryFee), 0)}.00
         </dd>
       </div>
     </dl>

     <div className="mt-6">
       <button onClick={isLoggedIn ? ()=>{checkoutFunction()} : ()=>{router.push("/signin")}}
         
         className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
       >
         Checkout
       </button>
     </div>
   </section>
 </div>
      ) : 
        <div className="col-span-12 lg:col-span-9  flex justify-center items-center my-2 w-full h-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="col-span-12 lg:col-span-6 flex justify-center">
            <img src="images/cart.png" alt="" className="h-[290px] bg-center bg-contain bg-no-repeat my-2"/>
          </div>
          <div className="col-span-12 lg:col-span-6 text-center my-2 flex justify-center flex-col">
            <label className="text-xl font-semibold mt-2">You have no items in your Cart yet.</label>
            <div className="lg:flex lg:justify-center mt-7">
              <Link href={"/home"} className="lg:mr-3">
                <button
                  className="bg-blue-500/90 text-[#26282b] px-3 py-2 text-[16px] font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" className="w-6 h-6 inline-block">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Start Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
    <RelatedProducts/>
  </div>
  )
}
