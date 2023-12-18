import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LayoutDashboard({
    children,
  }: {
    children: React.ReactNode
  }) {

  return (
    <>
    <Navbar />
      <div className='px-10 md:container  md:px-32'>
          {children}
      </div>
    <Footer />
    </>
  )
}