import CTA from "@/components/landing/chat-box";
import NavBar from "@/components/landing/nav-bar";

const page = () => {
  return (
    <main
      className="relative flex-center w-full h-screen"
      style={{
        backgroundImage: `url(${"/bg-green.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <CTA />
    </main>
  );
};

export default page;
