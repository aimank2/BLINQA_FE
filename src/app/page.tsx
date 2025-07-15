import CTA from "@/components/landing/chat-box";
import Footer from "@/components/landing/footer";
import NavBar from "@/components/landing/nav-bar";

const page = () => {
  return (
    <main
      className="relative w-full h-screen flex flex-center"
      style={{
        backgroundImage: `url(${"/bg-green.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <CTA />
      <Footer />
    </main>
  );
};

export default page;
