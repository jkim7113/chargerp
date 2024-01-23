import Feed from "@components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Find a Peer Tutor around You
        <br />
        <span className="blue_gradient text-5xl text-center">Learn together, Earn together & Rise together!</span>
      </h1>
      <p className="desc text-center">
        Sign in with your school account and start exploring!
      </p>
      <Feed /> 
      <div className="flex flex-center flex-wrap mt-5">
        <Image className='mx-3 max-sm:mt-4' src='/images/flyer0.webp' width={540} height={720} alt='flyer' />
        <Image className='mx-3 max-sm:mt-4' src='/images/flyer1.webp' width={540} height={720} alt='flyer' />
      </div>
    </section>
  );
}
