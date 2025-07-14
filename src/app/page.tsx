import CTA from "@/components/landing/chat-box";
import NavBar from "@/components/landing/nav-bar";

const page = () => {
  return (
    <main
      className="relative w-full h-screen flex-center"
      style={{
        backgroundImage: `url(${"/bg-green.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <div className="mt-24 md:mt-0">
        <CTA />
      </div>
    </main>
  );
};

export default page;
