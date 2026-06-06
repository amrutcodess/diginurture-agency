import React from "react";
import { Mail, Phone } from "lucide-react";

const teamList = [
  {
    id: 1,
    name: "Nimesh Ranjan",
    role: "Co-Founder & Lead App Engineer",
    description: "Specialized in building high-performance cross-platform applications for Android and iOS with gorgeous, fluid user interfaces.",
    image: "/assets/team/Nimo.jpg",
    email: "nimesh.rj17@gmail.com",
    phone: "+91 63556 03994",
    socials: [
      { id: 1, name: "GitHub", href: "https://github.com/nimeshrj17", icon: "/assets/socials/github.svg" },
      { id: 2, name: "LinkedIn", href: "https://www.linkedin.com/in/nimesh-ranjan-98a965220/", icon: "/assets/socials/linkedIn.svg" },
    ],
  },
  {
    id: 2,
    name: "Aditya Jaif",
    role: "Co-Founder & Systems Architect",
    description: "Specialized in backend architecture, building robust server infrastructures, REST/GraphQL APIs, and high-security database systems.",
    image: "/assets/team/Adi.jpg",
    email: "adityajaif2004@gmail.com",
    phone: "+91 80006 51579",
    socials: [
      { id: 1, name: "GitHub", href: "https://github.com/aditya0l", icon: "/assets/socials/github.svg" },
      { id: 2, name: "LinkedIn", href: "https://www.linkedin.com/in/aditya-jaif-29989b232/", icon: "/assets/socials/linkedIn.svg" },
    ],
  },
  {
    id: 3,
    name: "Ajay Singh",
    role: "Co-Founder & Marketing Lead",
    description: "Expert in product marketing, growth strategy, SEO execution, and strategic client relations to ensure maximum digital product reach.",
    image: "/assets/team/Aj.jpg",
    email: "ajaysingh16112002@gmail.com",
    phone: "+91 93156 47662",
    socials: [
      { id: 1, name: "GitHub", href: "https://github.com/ajsingh2002", icon: "/assets/socials/github.svg" },
      { id: 2, name: "LinkedIn", href: "https://www.linkedin.com/in/ajay-singh-uk/", icon: "/assets/socials/linkedIn.svg" },
    ],
  },
  {
    id: 4,
    name: "Abhinav Kumar Yadav",
    role: "Co-Founder & Full Stack Engineer",
    description: "Specialized in crafting scalable cloud web architectures, DevOps integrations, and highly interactive Single Page Applications.",
    image: "/assets/team/Abhi.jpg",
    email: "abhinavk1608@gmail.com",
    phone: "+91 88741 58739",
    socials: [
      { id: 1, name: "GitHub", href: "https://github.com/abhinavkumaryadav1", icon: "/assets/socials/github.svg" },
      { id: 2, name: "LinkedIn", href: "https://linkedin.com/in/abhinav-kumar-yadav", icon: "/assets/socials/linkedIn.svg" },
    ],
  },
];

const TeamMemberCard = ({ member }) => (
  <div className="group relative flex flex-col items-center p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:bg-white/10 hover:border-white/10 overflow-hidden">
    {/* Hover glow spheres */}
    <div className="absolute -top-20 -right-20 w-56 h-56 bg-aqua/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-fuchsia/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    {/* Profile image circle */}
    <div className="relative h-36 w-36 overflow-hidden rounded-full p-1 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-aqua group-hover:to-fuchsia mb-6 z-10 transition-all duration-500 shadow-2xl">
      <div className="h-full w-full rounded-full overflow-hidden bg-storm">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
    </div>

    {/* Bio & Details */}
    <div className="z-10 flex flex-col items-center text-center w-full flex-grow">
      <h3 className="text-xl md:text-2xl font-black text-white mb-1 tracking-tight">
        {member.name}
      </h3>
      <p className="text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua to-fuchsia mb-4 uppercase tracking-widest">
        {member.role}
      </p>
      <p className="text-xs md:text-sm text-neutral-400 mb-6 line-clamp-3 min-h-[3rem] leading-relaxed">
        {member.description}
      </p>

      {/* Separator line */}
      <div className="w-full h-[1px] bg-white/10 mb-6 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent transition-all duration-500" />

      {/* Direct contact info */}
      <div className="flex flex-col gap-2.5 w-full mb-6 text-left">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-3 text-xs text-neutral-400 hover:text-white transition-colors duration-300 truncate"
          >
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5 text-aqua" />
            </div>
            <span className="truncate">{member.email}</span>
          </a>
        )}
        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-3 text-xs text-neutral-400 hover:text-white transition-colors duration-300 truncate"
          >
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-aqua" />
            </div>
            <span className="truncate">{member.phone}</span>
          </a>
        )}
      </div>

      {/* Social links */}
      <div className="flex gap-3 justify-center mt-auto">
        {member.socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 bg-white/5 hover:bg-white hover:border-transparent group/social transition-all duration-300 hover:-translate-y-1 shadow-lg"
            title={social.name}
          >
            <img
              src={social.icon}
              alt={social.name}
              className="w-4 h-4 opacity-70 group-hover/social:opacity-100 group-hover/social:invert transition-all"
            />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default function Team() {
  return (
    <section className="c-space section-spacing" id="team">
      <h2 className="text-heading text-center mb-4 text-white">Meet Our Team</h2>
      <p className="text-center text-neutral-400 max-w-xl mx-auto text-sm md:text-base">
        A collective of co-founders, developers, and creators focused on engineering market-ready platforms.
      </p>
      
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamList.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
