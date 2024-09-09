import React from 'react'

export default function ProductComponent() {
  return (
    <>
      <div className="group flex flex-col justify-between  relative p-2 border rounded-md border-[#1d1e20] bg-[#26282bee] sm:p-6">
          <div className="rounded-lg overflow-hidden aspect-w-1 aspect-h-1 group-hover:opacity-75">
          {/* <?php
          $productImage_rs = Database::search("SELECT * FROM `product_img` INNER JOIN `product` ON `product_img`.`product_id`=`product`.`id` WHERE `product`.`id`= ? ORDER BY `img_path` DESC", [$product["id"]]);
          if ($productImage_rs->num_rows > 0) {
            $productImage = $productImage_rs->fetch_assoc();

            ?> */}
            <img src="/images/product_images/product1.jpeg" alt="title"
              className="w-full min-h-40 min-w-40 max-w-50 max-h-50  h-full object-center object-cover"/>
          {/* <?php }
          ?> */}

        </div>
        <div className="pt-10 pb-4 aspect-w-1 aspect-h-1 max-h-40 min-h-20 text-center">
          <h3 className="text-sm font-medium text-gray-400">
            <a href="/singleProduct?product_id=id">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {/* <?php
              if (strlen($product["title"]) > 20) {

                echo substr($product["title"], 0, 20) . "...";
              } else {
                echo $product["title"];
              }
              ?> */}
              title
            </a>
          </h3>


          <div className="mt-3 flex flex-col items-center">
            {/* <?php

            $star_count = Database::search("SELECT AVG(`stars`) FROM `feedback` WHERE `product_id`= ? ", [$product['id']]);

            $feedback_rs = Database::search("SELECT * fROM `feedback` WHERE `product_id`=?", [$product['id']]);
            $feedback = $star_count->fetch_assoc();
            ?> */}
            <div className="flex items-center">
              {/* <?php for ($y = 0; $y < ceil($feedback["AVG(`stars`)"]); $y++) { ?> */}
                {/* // <!-- Heroicon name: solid/star --> */}
                <svg className="text-yellow-400 flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" aria-hidden="true">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                 {/* <?php } */}
              {/* if (ceil($feedback["AVG(`stars`)"]) == 0) {
                for ($i = 0; $i < 5; $i++) {
                  ?>
                  <!-- Heroicon name: solid/star --> */}
                  {/* <svg className="text-gray-300 flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg> */}
                  {/* <?php
                }
              } else if (ceil($feedback["AVG(`stars`)"]) == 1) {
                for ($i = 0; $i < 4; $i++) {
                  ?>
                    <!-- Heroicon name: solid/star --> */}
                    {/* <svg className="text-gray-300 flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg> */}
                  {/* <?php
                }
              } else if (ceil($feedback["AVG(`stars`)"]) == 2) {
                for ($i = 0; $i < 3; $i++) {
                  ?>
                      <!-- Heroicon name: solid/star --> */}
                      {/* <svg className="text-gray-300 flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor" aria-hidden="true">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg> */}
                  {/* <?php
                }
              } else if (ceil($feedback["AVG(`stars`)"]) == 3) {
                for ($i = 0; $i < 2; $i++) {
                  ?>
                        <!-- Heroicon name: solid/star --> */}
                        {/* <svg className="text-gray-300 flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor" aria-hidden="true">
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg> */}
                  {/* <?php
                }
              } else if (ceil($feedback["AVG(`stars`)"]) == 4) {
                for ($i = 0; $i < 1; $i++) {
                  ?>
                          <!-- Heroicon name: solid/star --> */}
                          {/* <svg className="text-gray-300 flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg> */}
                  {/* <?php
                }
              }
              ?>


            </div>
            <?php

            $feedback_count = Database::search("SELECT COUNT(`stars`) fROM `feedback` WHERE `product_id`= ? ", [$product['id']]);
            $feedback_number = $feedback_count->fetch_assoc();
            ?> */}
            <p className="mt-1 text-sm text-gray-500">
                {/* <?php */}
            {/* if ($feedback_number["COUNT(`stars`)"] >= 1000) {
              echo $feedback_number["COUNT(`stars`)"] / 1000; ?>k reviews</p>
              <?php
            } else {
              echo $feedback_number["COUNT(`stars`)"];

            } ?> */}
             reviews</p>
          </div>
          <p className="mt-4 text-base font-medium text-gray-400">Rs.
            price.00
          </p>

        </div>
      </div> 
</div>
    </>
  )
}
