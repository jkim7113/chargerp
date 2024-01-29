import Image from "next/image"
import Link from "next/link"

const Footer = () => {

  return (
    <footer className="font-satoshi text-sm text-white w-full bg-centennial py-12 sm:py-24">
      <div className="max-w-7xl mx-auto sm:px-16 px-6 flex flex-wrap w-full">
        <Image src='/images/centennial.svg' width={96} height={96}></Image>
          <div className="mt-4 sm:mt-0 sm:ml-10">
            <h3 className="text-lg mb-1">CONTACT US</h3>
            <p>+1 678-488-3315</p>
            <p>kimjo2026@u4sd.org</p>
            <br/>
            <p className="text-gray-300">© 2024 Centennial Peer Tutoring Club. Website created by John Kim.</p>
          </div>
      </div>
    </footer>
  )
}

export default Footer