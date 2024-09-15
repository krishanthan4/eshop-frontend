import { Carousel } from "@material-tailwind/react";
 
export function CarouselComponent() {
  return (
 <div className="w-[70%] md:h-96 h-56">
      <Carousel loop={true} autoplayDelay={4000} autoplay={true} transition={{ duration: 0.8, type: "tween" }} className="rounded-lg">
    {[...Array(6)].map((_, index) => (
        <img
          src={`images/slider_images/carousel${index + 1}.jpg`}
          alt={`image ${index + 1}`}
          className="h-full w-full object-cover"
        />
    ))}

      </Carousel>
 </div>
  );
}