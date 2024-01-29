import Feed from "@components/Feed";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Find a Peer Tutor around You
        <br />
        <span className="blue_gradient text-5xl text-center">Learn together, Earn together & Rise together!</span>
      </h1>
      <p className="desc text-center">
        <Link className='text-blue-600' href='/auth/signin'>Sign in</Link> with your school account and start exploring
      </p>
      <Feed /> 
    </section>
  );
}
